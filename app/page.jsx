import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Esencia from "@/components/Esencia";
import MenuSection from "@/components/MenuSection";
import Historia from "@/components/Historia";
import BandaWok from "@/components/BandaWok";
import Sedes from "@/components/Sedes";
import ReservaCupon from "@/components/ReservaCupon";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <Esencia />
        <MenuSection />
        <Historia />
        <BandaWok />
        <Sedes />
        <ReservaCupon />
      </main>
      <Footer />
    </>
  );
}
