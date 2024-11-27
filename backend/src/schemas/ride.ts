import mongoose, { Schema, Document } from 'mongoose';

export interface RideInterface extends Document {
    customer_id: string,
    origin: string,
    destination: string,
    distance: number,
    duration: string,
    driver: {
        id: number,
        name: string
    },
    value: number,
    createdAt: Date,
    updatedAt: Date
}

const RideSchema: Schema = new Schema(
    {
      customer_id: { type: String, required: true },
      origin: { type: String, required: true },
      destination: { type: String, required: true },
      distance: { type: Number, required: true },
      duration: { type: String, required: true },
      driver: {
          id: { type: Number, required: true },
          name: { type: String, required: true }
      },
      value: { type: Number, required: true }
    },
    { timestamps: true }
)

export default mongoose.model<RideInterface>('Ride', RideSchema);

export const rideMock = [
    {
      "customer_id": "customer_1",
      "origin": "Fort Lauderdale Beach",
      "destination": "Las Olas Boulevard",
      "distance": 5.2,
      "duration": "15 mins",
      "driver": {
        "id": 1,
        "name": "John Doe"
      },
      "value": 12.5
    },
    {
      "customer_id": "customer_1",
      "origin": "Downtown Miami",
      "destination": "Miami International Airport",
      "distance": 10.8,
      "duration": "25 mins",
      "driver": {
        "id": 2,
        "name": "Alice Johnson"
      },
      "value": 20.0
    },
    {
      "customer_id": "customer_1",
      "origin": "Hollywood Beach",
      "destination": "Aventura Mall",
      "distance": 8.5,
      "duration": "18 mins",
      "driver": {
        "id": 3,
        "name": "Bob Smith"
      },
      "value": 18.0
    },
    {
      "customer_id": "customer_1",
      "origin": "Las Olas Boulevard",
      "destination": "Fort Lauderdale Airport",
      "distance": 4.0,
      "duration": "12 mins",
      "driver": {
        "id": 1,
        "name": "John Doe"
      },
      "value": 10.0
    },
    {
      "customer_id": "customer_1",
      "origin": "Port Everglades",
      "destination": "Sawgrass Mills Mall",
      "distance": 15.3,
      "duration": "30 mins",
      "driver": {
        "id": 2,
        "name": "Alice Johnson"
      },
      "value": 25.0
    },
    {
      "customer_id": "customer_2",
      "origin": "South Beach",
      "destination": "Wynwood Walls",
      "distance": 6.2,
      "duration": "20 mins",
      "driver": {
        "id": 3,
        "name": "Bob Smith"
      },
      "value": 14.0
    },
    {
      "customer_id": "customer_2",
      "origin": "Dania Beach",
      "destination": "Hard Rock Hotel",
      "distance": 7.0,
      "duration": "22 mins",
      "driver": {
        "id": 1,
        "name": "John Doe"
      },
      "value": 16.0
    },
    {
      "customer_id": "customer_3",
      "origin": "Miami Downtown",
      "destination": "Coral Gables",
      "distance": 12.0,
      "duration": "28 mins",
      "driver": {
        "id": 2,
        "name": "Alice Johnson"
      },
      "value": 22.0
    },
    {
      "customer_id": "customer_3",
      "origin": "Key Biscayne",
      "destination": "Miami International Airport",
      "distance": 14.5,
      "duration": "35 mins",
      "driver": {
        "id": 3,
        "name": "Bob Smith"
      },
      "value": 30.0
    },
    {
      "customer_id": "customer_3",
      "origin": "Brickell",
      "destination": "Doral",
      "distance": 9.0,
      "duration": "20 mins",
      "driver": {
        "id": 1,
        "name": "John Doe"
      },
      "value": 19.0
    }
  ]