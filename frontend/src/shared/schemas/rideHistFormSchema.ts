import { z } from "zod";

export const rideHistFormSchema = z.object({
    customer_id: z.string().refine((val) => val.trim() !== "", {
        message: "ID do usuário é obrigatório.",
    }),
    driver_id: z.string().refine((val) => val.trim() !== '', {
        message: "ID do motorista é obrigatório.",
    }),
});

export type RideHistFormData = z.infer<typeof rideHistFormSchema>;