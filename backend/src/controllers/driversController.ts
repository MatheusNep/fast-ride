import { Request, Response } from 'express';
import Driver from '../schemas/driver';

export const checkDrivers = async () =>{
    try{
        const existDrivers = await Driver.find({})
        if(existDrivers.length === 0){
            const createDrivers = await Driver.insertMany(drivers);
            return console.log(createDrivers);
        }else{
            return console.log({message: "Drivers já Criados"})
        }

    } catch (error) {
        return console.log({ error: 'Erro ao adicionar motoristas.', details: error });
    }
}

export const getDrivers = async (req: Request, res: Response) => {  
  try {
    const drivers = await Driver.find();
    return res.status(200).json(drivers);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar motoristas.', details: error });
  }
 
};

const drivers = [    
    {
      id: 2,
      name: 'Dominic Toretto',
      description: 'Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.',
      vehicle: 'Dodge Charger R/T 1970 modificado',
      review: {
        rating: 4,
        comment: 'Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!'
      },
      value: 5,
      limit: 5
    },
    {
      id: 1,
      name: 'Homer Simpson',
      description: 'Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).',
      vehicle: 'Plymouth Valiant 1973 rosa e enferrujado',
      review: {
        rating: 2,
        comment: 'Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.'
      },
      value: 2.5,
      limit: 1
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
      value: 10,
      limit: 10
    },
  ]