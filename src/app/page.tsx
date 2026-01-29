import HeroSection from "@/components/hero/HeroSection";

export default function Home() {
  return (
    <main>
      <HeroSection />

      {/* Rupture visuelle (mobile luxury) */}
      <section className="min-h-screen bg-[#333333] text-white">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <p className="text-xs font-semibold tracking-[0.32em] text-[#8FD6CC]/80">
            LIANET / MANIFESTE
          </p>
          <h2 className="mt-6 text-4xl font-extrabold leading-tight md:text-6xl">
            Where ambition meets execution.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
            Une rupture volontaire pour laisser respirer le message, renforcer les
            contrastes, et installer un rythme visuel haut de gamme.
          </p>
        </div>
      </section>
    </main>
  );
}
