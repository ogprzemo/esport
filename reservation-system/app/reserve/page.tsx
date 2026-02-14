"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { ticketSchema, TicketFormData } from "@/schemas/ticket.schema";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const events = [
    { id: 1, title: "CS2 Major Finals", game: "Counter-Strike 2" },
    { id: 2, title: "League of Legends Worlds", game: "League of Legends" },
    { id: 3, title: "Valorant Champions Tour", game: "Valorant" },
];

function ReserveContent() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const searchParams = useSearchParams();
    const eventId = Number(searchParams.get("eventId"));
    const event = events.find((e) => e.id === eventId);

    const form = useForm<TicketFormData>({
        resolver: zodResolver(ticketSchema),
        defaultValues: {
            fullName: "",
            email: "",
            ticketType: "standard",
            acceptTerms: false,
        },
    });

    function onSubmit(values: TicketFormData) {
        console.log("Dane rezerwacji:", values);
        setIsSubmitted(true);
    }

    if (!event) return <div className="p-10 text-center">Nie znaleziono wydarzenia.</div>;

    if (isSubmitted) {
        return (
            <Card className="max-w-md mx-auto mt-20 animate-in fade-in zoom-in duration-300">
                <CardContent className="pt-10 pb-10 text-center">
                    <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Rezerwacja udana!</h2>
                    <p className="text-muted-foreground mb-6">
                        Twoje miejsce na <strong>{event.title}</strong> zostało zarezerwowane.
                        Potwierdzenie wysłaliśmy na e-mail.
                    </p>
                    <Button asChild className="w-full">
                        <Link href="/">Wróć do strony głównej</Link>
                    </Button>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="max-w-md mx-auto mt-10 shadow-xl border-t-4 border-t-primary">
            <CardHeader>
                <CardTitle className="text-2xl italic">Zarezerwuj bilet</CardTitle>
                <p className="text-sm text-muted-foreground">Wydarzenie: {event.title}</p>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                        <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Imię i nazwisko</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Jan Kowalski" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>E-mail</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="jan@kowalski.pl" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="ticketType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Typ biletu</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Wybierz typ biletu" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="standard">Standard - 99 PLN</SelectItem>
                                            <SelectItem value="vip">VIP - 299 PLN</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="acceptTerms"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>Akceptuję regulamin</FormLabel>
                                        <FormDescription>
                                            Oświadczam, że zapoznałem się z zasadami uczestnictwa.
                                        </FormDescription>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full text-lg font-bold">
                            Potwierdzam Rezerwację
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}

export default function ReservePage() {
    return (
        <main className="container mx-auto px-4">
            <Suspense fallback={<div>Ładowanie rezerwacji...</div>}>
                <ReserveContent />
            </Suspense>
        </main>
    );
}