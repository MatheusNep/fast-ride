import { z } from "zod";

export const formDirectionsSchema = z.object({
    id: z.string().refine((val) => val.trim() !== "", {
        message: "ID do usuário é obrigatório.",
    }),
    startAddress: z.string().refine((val) => val.trim() !== "", {
        message: "O endereço de origem é obrigatório.",
    }),
    destinationAddress: z.string().refine((val) => val.trim() !== "", {
        message: "O endereço de destino é obrigatório.",
    }),
});

export type FormDirectionsData = z.infer<typeof formDirectionsSchema>;