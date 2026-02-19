"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Ticket, Trophy } from "lucide-react";

type Event = {
    id: number;
    title: string;
    game: string;
    date: string;
    location: string;
    category: string;
};

const events: Event[] = [
    {
        id: 1,
        title: "CS2 Major Finals",
        game: "Counter-Strike 2",
        date: "MARCH 12, 2026",
        location: "Katowice, Spodek",
        category: "Major"
    },
    {
        id: 2,
        title: "LoL Worlds",
        game: "League of Legends",
        date: "APRIL 02, 2026",
        location: "Berlin Arena",
        category: "Championship"
    },
    {
        id: 3,
        title: "Valorant Champions",
        game: "Valorant",
        date: "MAY 18, 2026",
        location: "Paris Expo",
        category: "Global Tour"
    },
];

export default function EventsPage() {
    return (
        <main className="relative min-h-screen bg-[#05010d] text-zinc-100 overflow-hidden pb-20">
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-5%] right-[-5%] w-[40%] h-[40%] bg-purple-600/10 blur-[100px] rounded-full" />
                <div className="absolute bottom-[-5%] left-[-5%] w-[40%] h-[40%] bg-fuchsia-600/5 blur-[100px] rounded-full" />
            </div>

            <div className="relative z-10 container mx-auto px-6 pt-32">
                <div className="mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 text-purple-400 font-mono text-xs uppercase tracking-[0.3em] mb-4"
                    >
                        <Trophy className="w-4 h-4" />
                        Live Tournaments
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter"
                    >
                        Available <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500">Battles</span>
                    </motion.h1>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {events.map((event, index) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="group relative p-px rounded-3xl bg-zinc-800/50 hover:bg-gradient-to-b hover:from-purple-500/50 hover:to-transparent transition-all duration-500">
                                <div className="bg-[#0a0514]/90 backdrop-blur-xl p-8 rounded-[calc(1.5rem-1px)] h-full flex flex-col">
                                    <div className="flex justify-between items-start mb-6">
                                        <span className="px-3 py-1 rounded-full border border-zinc-700 text-[10px] font-bold uppercase tracking-widest text-zinc-400 bg-zinc-900">
                                            {event.category}
                                        </span>
                                        <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                                    </div>

                                    <h3 className="text-2xl font-black italic uppercase mb-2 group-hover:text-purple-400 transition-colors leading-tight">
                                        {event.title}
                                    </h3>

                                    <p className="text-zinc-500 font-medium mb-8 uppercase text-sm tracking-wider">
                                        {event.game}
                                    </p>

                                    <div className="space-y-4 mb-8 flex-grow">
                                        <div className="flex items-center gap-3 text-zinc-400">
                                            <Calendar className="w-5 h-5 text-purple-500" />
                                            <span className="text-sm font-mono">{event.date}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-zinc-400">
                                            <MapPin className="w-5 h-5 text-fuchsia-500" />
                                            <span className="text-sm uppercase font-semibold">{event.location}</span>
                                        </div>
                                    </div>

                                    <Link href={`/reserve?eventId=${event.id}`}>
                                        <Button className="w-full h-12 bg-zinc-100 hover:bg-purple-600 text-black hover:text-white font-black uppercase italic transition-all group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                                            Claim Access
                                            <Ticket className="ml-2 w-4 h-4" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    );
}