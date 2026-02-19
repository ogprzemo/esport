"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Trophy, ArrowRight, Zap, Monitor, Users, ShieldCheck } from "lucide-react";

export default function Home() {
    return (
        <main className="relative min-h-screen bg-[#05010d] text-zinc-100 overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/20 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-fuchsia-600/10 blur-[120px] rounded-full" />
            </div>

            <div className="relative z-10 container mx-auto px-6 pt-32 pb-20">
                <div className="text-center space-y-8 mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs font-mono tracking-widest uppercase shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                    >
                        <Zap className="w-3.5 h-3.5 fill-purple-400" />
                        Next-Gen Esports Ticketing
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-6xl md:text-9xl font-black italic tracking-tighter uppercase leading-[0.85]"
                    >
                        UNLEASH THE <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-500 to-indigo-500 drop-shadow-sm">
              ARENA
            </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto font-light"
                    >
                        Experience the thrill of live competition. Secure your front-row seats for
                        the most prestigious tournaments of <span className="text-white font-semibold">2026</span>.
                    </motion.p>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <Link href="/events">
                            <Button size="lg" className="h-16 px-12 text-xl font-black uppercase italic bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_30px_rgba(147,51,234,0.4)] transition-all active:scale-95">
                                Get Your Tickets
                                <ArrowRight className="ml-2 w-6 h-6" />
                            </Button>
                        </Link>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    <FeatureCard
                        icon={<Trophy className="text-purple-400" />}
                        title="Premium Access"
                        desc="VIP lounges, backstage passes, and exclusive merch for Pro holders."
                    />
                    <FeatureCard
                        icon={<Monitor className="text-fuchsia-400" />}
                        title="Live Streaming"
                        desc="Every ticket includes 4K streaming access to the event from home."
                    />
                    <FeatureCard
                        icon={<Users className="text-indigo-400" />}
                        title="Global Community"
                        desc="Join 500k+ fans. Trade seats and tickets in our secure marketplace."
                    />
                </div>
            </div>
        </main>
    );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div className="p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800 backdrop-blur-sm hover:border-purple-500/50 transition-colors group">
            <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-2 uppercase italic tracking-tight">{title}</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">{desc}</p>
        </div>
    );
}