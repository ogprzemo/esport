"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Ticket, User, Mail, ChevronLeft, Loader2 } from "lucide-react";

import { ticketSchema, TicketFormData } from "@/schemas/ticket.schema";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
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

const events = [
    { id: 1, title: "CS2 Major Finals", game: "Counter-Strike 2" },
    { id: 2, title: "LoL Worlds", game: "League of Legends" },
    { id: 3, title: "Valorant Champions", game: "Valorant" },
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
        console.log("Reservation Data:", values);
        setIsSubmitted(true);
    }

    if (!event) return (
        <div className="h-screen flex flex-col items-center justify-center text-zinc-500 font-mono">
            <p className="text-2xl mb-4 text-white uppercase italic font-black">Event Not Found</p>
            <Link href="/events" className="hover:text-purple-400 underline transition-colors">Return to Armory</Link>
        </div>
    );

    if (isSubmitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md mx-auto mt-20 p-8 rounded-3xl bg-zinc-900/50 border border-emerald-500/30 backdrop-blur-xl text-center shadow-[0_0_50px_rgba(16,185,129,0.1)]"
            >
                <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                </div>
                <h2 className="text-3xl font-black italic uppercase mb-4 tracking-tighter">Access Granted</h2>
                <p className="text-zinc-400 mb-8 leading-relaxed">
                    Deployment confirmed. Your seat for <span className="text-white font-bold">{event.title}</span> is secured.
                    Check your uplink (email) for instructions.
                </p>
                <Link href="/">
                    <Button className="w-full h-14 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase italic tracking-widest transition-all">
                        Return to Command Center
                    </Button>
                </Link>
            </motion.div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto pt-20 pb-20 px-4">
            <Link href="/events" className="inline-flex items-center text-zinc-500 hover:text-purple-400 transition-colors mb-8 group font-mono text-xs uppercase tracking-widest">
                <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
                Back to Events
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative p-8 md:p-12 rounded-[40px] bg-zinc-900/40 border border-zinc-800 backdrop-blur-md"
            >
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 blur-[60px] rounded-full -z-10" />

                <div className="mb-10">
                    <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-2">
                        Secure <span className="text-purple-500">Access</span>
                    </h1>
                    <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                        Target: {event.title}
                    </p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="fullName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-zinc-400 uppercase text-[10px] font-black tracking-widest flex items-center gap-2">
                                            <User className="w-3 h-3" /> Identity
                                        </FormLabel>
                                        <FormControl>
                                            <Input className="h-12 bg-zinc-950/50 border-zinc-800 focus:border-purple-500 transition-all rounded-xl italic" placeholder="PLAYER NAME" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-xs text-rose-500" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-zinc-400 uppercase text-[10px] font-black tracking-widest flex items-center gap-2">
                                            <Mail className="w-3 h-3" /> Uplink (Email)
                                        </FormLabel>
                                        <FormControl>
                                            <Input type="email" className="h-12 bg-zinc-950/50 border-zinc-800 focus:border-purple-500 transition-all rounded-xl" placeholder="PLAYER@ARENA.GG" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-xs text-rose-500" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="ticketType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-zinc-400 uppercase text-[10px] font-black tracking-widest flex items-center gap-2">
                                        <Ticket className="w-3 h-3" /> Tier Selection
                                    </FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="h-12 bg-zinc-950/50 border-zinc-800 rounded-xl focus:ring-purple-500 italic font-bold">
                                                <SelectValue placeholder="Select Tier" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-100 uppercase italic font-bold">
                                            <SelectItem value="standard" className="focus:bg-purple-600 focus:text-white">Standard Deck - $99</SelectItem>
                                            <SelectItem value="vip" className="focus:bg-purple-600 focus:text-white">VIP Elite - $299</SelectItem>
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
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-2xl border border-zinc-800 p-4 bg-zinc-950/30">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            className="border-zinc-700 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel className="text-xs text-zinc-400 uppercase tracking-tight">
                                            Accept Rules of Engagement
                                        </FormLabel>
                                        <p className="text-[10px] text-zinc-600">
                                            I confirm that I have read the tournament participation protocol.
                                        </p>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            disabled={form.formState.isSubmitting}
                            className="w-full h-16 bg-purple-600 hover:bg-purple-500 text-white text-xl font-black uppercase italic tracking-tighter shadow-[0_0_30px_rgba(147,51,234,0.3)] transition-all active:scale-[0.98]"
                        >
                            {form.formState.isSubmitting ? (
                                <Loader2 className="w-6 h-6 animate-spin" />
                            ) : (
                                "Confirm Deployment"
                            )}
                        </Button>
                    </form>
                </Form>
            </motion.div>
        </div>
    );
}

export default function ReservePage() {
    return (
        <main className="relative min-h-screen bg-[#05010d] text-zinc-100 overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-fuchsia-600/5 blur-[120px] rounded-full" />
            </div>

            <div className="relative z-10">
                <Suspense fallback={
                    <div className="h-screen flex items-center justify-center font-mono text-purple-500 animate-pulse">
                        LOADING SYSTEM...
                    </div>
                }>
                    <ReserveContent />
                </Suspense>
            </div>
        </main>
    );
}