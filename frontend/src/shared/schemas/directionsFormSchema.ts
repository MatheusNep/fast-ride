import { z } from "zod";

export const formSchema = z.object({
    id: z.string().refine((val) => val.trim() !== "", {
        message: "ID é obrigatório.",
    }),
    startAddress: z.string().refine((val) => val.trim() !== "", {
        message: "O endereço de origem é obrigatório.",
    }),
    destinationAddress: z.string().refine((val) => val.trim() !== "", {
        message: "O endereço de destino é obrigatório.",
    }),
});

export type FormData = z.infer<typeof formSchema>;