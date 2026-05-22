import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import Drop from "@/components/sections/Drop";
import Category from "@/components/sections/Category";
import Lifestyle from "@/components/sections/Lifestyle";
import Tribe from "@/components/sections/Tribe";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-bg-primary overflow-x-hidden">
      <Navbar />
      <Hero />
      <Drop />
      <Category />
      <Lifestyle />
      <Tribe />
      <CTA />
      <Footer />
    </main>
  );
}
