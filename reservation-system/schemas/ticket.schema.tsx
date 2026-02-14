import { z } from "zod";

export const ticketSchema = z.object({
    fullName: z.string().min(3, "Imię i nazwisko jest za krótkie"),
    email: z.string().email("Niepoprawny adres email"),
    ticketType: z.enum(["standard", "vip"]),
    acceptTerms: z.boolean().refine((val) => val === true, {
        message: "Musisz zaakceptować regulamin",
    }),
});

export type TicketFormData = z.infer<typeof ticketSchema>;