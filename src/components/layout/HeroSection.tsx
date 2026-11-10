"use client";

import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section>
      <Button size="md" variant="primary" onClick={() => alert("Hii")}>
        Hello
      </Button>
    </section>
  );
}