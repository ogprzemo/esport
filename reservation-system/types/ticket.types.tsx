export type TicketType = "standard" | "vip";

export type BaseTicket = {
    fullName: string;
    email: string;
};

export type Ticket = BaseTicket & {
    ticketType: TicketType;
};