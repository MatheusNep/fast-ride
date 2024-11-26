import { z } from "zod";

export const rideHistFormSchema = z.object({
    custumer_id: z.string().refine((val) => val.trim() !== "", {
        message: "ID do usuário é obrigatório.",
    }),
    driver_id: z.number().refine((val) => !val, {
        message: "ID do motorista é obrigatório.",
    }),
});

export type RideHistFormData = z.infer<typeof rideHistFormSchema>;