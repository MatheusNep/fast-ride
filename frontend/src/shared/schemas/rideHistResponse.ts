
export interface Ride {
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
    createdAt: Date
}

export interface RideHistResponse {
    customer_id: string,
    rides: Ride[]
}