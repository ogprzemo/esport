import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Event = {
    id: number;
    title: string;
    game: string;
    date: string;
    location: string;
};

const events: Event[] = [
    {
        id: 1,
        title: "CS2 Major Finals",
        game: "Counter-Strike 2",
        date: "2026-03-12",
        location: "Katowice, Spodek",
    },
    {
        id: 2,
        title: "League of Legends Worlds",
        game: "League of Legends",
        date: "2026-04-02",
        location: "Berlin Arena",
    },
    {
        id: 3,
        title: "Valorant Champions Tour",
        game: "Valorant",
        date: "2026-05-18",
        location: "Paris Expo",
    },
];

export default function EventsPage() {
    return (
        <main className="container mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-8 text-center sm:text-left">
                🎮 Wydarzenia E-sportowe
            </h1>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => (
                    <Card
                        key={event.id}
                        className="group transition hover:shadow-xl hover:-translate-y-1"
                    >
                        <CardHeader>
                            <CardTitle className="text-xl">
                                {event.title}
                            </CardTitle>
                            <p className="text-sm text-muted-foreground">
                                {event.game}
                            </p>
                        </CardHeader>

                        <CardContent className="space-y-3">
                            <div className="text-sm">
                                📅 <span className="font-medium">{event.date}</span>
                            </div>
                            <div className="text-sm">
                                📍 <span className="font-medium">{event.location}</span>
                            </div>

                            <Link href={`/reserve?eventId=${event.id}`} className="block w-full mt-4">
                                <Button
                                    className="w-full group-hover:bg-primary/90"
                                >
                                    Zarezerwuj bilet
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </main>
    );
}