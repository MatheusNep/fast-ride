import { Request, Response } from 'express';
import dotenv from 'dotenv';
import { Client, DirectionsResponse, TravelMode } from '@googlemaps/google-maps-services-js';
import Ride from '../schemas/ride';
import Driver, { DriverInterface } from '../schemas/driver';


dotenv.config({ path: './.env' });

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || '';
const client = new Client({});

export const estimateRide = async (req: Request, res: Response) => {
  const { origin, destination, costumer_id } = req.body;

  console.log(origin, destination, costumer_id);

  if (!origin || !destination || !costumer_id) {
    return res.status(400).json({ error: 'Os dados fornecidos no corpo da requisição são inválidos' });
  }
  
  try {
    const googleResponse = await client.directions({    
        params: {
          origin: origin,
          destination: destination,
          key: GOOGLE_API_KEY,
          mode: TravelMode.driving
        },
      }
    );

    const { data }: DirectionsResponse = googleResponse;
    
    if (!data.routes || data.routes.length === 0) {
      return res.status(400).json({ error: 'Os dados fornecidos no corpo da requisição são inválidos' });
    }

    const route = data.routes[0];
    const distance = route.legs[0].distance.value/1000; 
    const duration = route.legs[0].duration.text;

    const drivers = await Driver.aggregate([{
      $project: {
        name: 1,
        id: 1,
        description: 1,
        vehicle: 1,
        review: 1,
        value: { $multiply: ["$value", distance] },
        limit: 1
      }
    }]);

    const options: DriverInterface[] = []

    drivers.forEach((driver) => {
      if(distance >= driver.limit){
        options.push(driver)
      }
    })

    return res.status(200).json({
      origin:{
        latitude: route.legs[0].start_location.lat,
        longitude: route.legs[0].start_location.lng
      },
      destination:{
        latitude: route.legs[0].end_location.lat,
        longitude: route.legs[0].end_location.lng
      },
      distance: distance,
      duration,
      options,
      routeResponse: 
      {
        ...data,        
        geocoded_waypoints: data.geocoded_waypoints,
        request: {
          origin: {
            query: origin
          },
          destination: {
            query: destination
          },
          travelMode: TravelMode.driving
        }
      }
    });
  } catch (error) {
    console.error('Error fetching directions:', error);
    return res.status(500).json({ error: 'Failed to fetch directions' });
  }
};

export const saveRide = async (req: Request, res: Response) => {
  const { ride } = req.body;

  const checkRide =  new Ride(ride)

  console.log(checkRide);

  const checkError = checkRide.validateSync();

  if(checkError){
    console.log(checkError);
    return res.status(400).json({error_code: "INVALID_DATA", error: 'Os dados fornecidos no corpo da requisição são inválidos' });
  }else{    
    const driver = await Driver.findOne({id: checkRide.driver.id});
    if(driver){
      if(checkRide.distance >= driver.limit){
        await checkRide.save().then(() => {
          return res.status(200).json({
            success: true
          });
        }).catch(() => {
          return res.status(500).json({ error: 'Failed to fetch directions' });
        })
      }else{
        return res.status(406).json({error_code: "INVALID_DISTANCE", error: 'Quilometragem inválida para o motorista' });
      }
    }else{
      return res.status(404).json({error_code: "DRIVER_NOT_FOUND", error: 'Motorista não encontrado' });
    }
    
  }  
 
};

export const getRides = async (req: Request, res: Response) => {
  const { customer_id } = req.params;

  const { driver_id } = req.query;

  if(!customer_id && !driver_id){
    return res.status(401).json({error_code: "INVALID_DATA", error: 'Os dados fornecidos no corpo da requisição são inválidos' });
  }

  if(driver_id && parseInt(driver_id as string) != 0){
    const drivers = await Driver.findOne({id: driver_id})
    if(!drivers){
      return res.status(400).json({error_code: "INVALID_DRIVER", error: 'Motorista invalido' });
    }
  }

  const ridesFind = await Ride.find(
    {
      customer_id: customer_id,
      driver_id: driver_id as string
    }
  )

  if(ridesFind.length > 0){
    return {
      customer_id: customer_id,
      rides: ridesFind
    }
  }else{ 
    return res.status(404).json({error_code: "NO_RIDES_FOUND", error: 'Nenhum registro encontrado' });     
  }  
 
};
