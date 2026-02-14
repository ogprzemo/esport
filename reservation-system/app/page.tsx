import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center gap-6">
        <h1 className="text-4xl font-bold text-center">
          🎮 Rezerwacja biletów na eventy Esportowe
        </h1>

        <p className="text-muted-foreground text-center max-w-md">
          Rezerwuj bilety na największe wydarzenia esportowe
        </p>

        <Link href="/events">
          <Button size="lg">
            Zobacz eventy
          </Button>
        </Link>
      </main>
  );
}