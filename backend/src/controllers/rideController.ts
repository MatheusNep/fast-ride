import { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

interface Drivers {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  review: {
    rating: number;
    comment: string;
  };
  value: number;
  limit: number;
}

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || '';

export const estimateRide = async (req: Request, res: Response) => {
  const { origin, destination, userId } = req.body;

  console.log(origin, destination, userId);

  if (!origin || !destination || !userId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  try {
    const googleResponse = await axios.get(
      `https://maps.googleapis.com/maps/api/directions/json`, {
        params: {
          origin: origin,
          destination: destination,
          key: GOOGLE_API_KEY
        }
      }
    );

    const { routes } = googleResponse.data;
    console.log(googleResponse)
    if (!routes || routes.length === 0) {
      return res.status(400).json({ error: 'No routes found' });
    }

    const route = routes[0];
    const distance = route.legs[0].distance.value/1000; 
    const duration = route.legs[0].duration.text;
    const routeResponse = route;

    // todo: distance validation
    const options: Drivers[] = [
      {
        id: 1,
        name: 'Homer Simpson',
        description: 'Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).',
        vehicle: 'Plymouth Valiant 1973 rosa e enferrujado',
        review: {
          rating: 2,
          comment: 'Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.'
        },
        value: distance * 2.5,
        limit: 1
      },
      {
        id: 2,
        name: 'Dominic Toretto',
        description: 'Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.',
        vehicle: 'Dodge Charger R/T 1970 modificado',
        review: {
          rating: 4,
          comment: 'Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!'
        },
        value: distance * 5,
        limit: 5
      },
      {
        id: 3,
        name: 'James Bond',
        description: 'Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.',
        vehicle: 'Aston Martin DB5 clássico',
        review: {
          rating: 5,
          comment: 'Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.'
        },
        value: distance * 10,
        limit: 10
      },
    ];

    return res.status(200).json({
      origin,
      destination,
      distance,
      duration,
      options,
      routeResponse
    });
  } catch (error) {
    console.error('Error fetching directions:', error);
    return res.status(500).json({ error: 'Failed to fetch directions' });
  }
};
