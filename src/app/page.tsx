import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Stats from "@/components/sections/Stats";
import Cases from "@/components/sections/Cases";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <Services />
        <Stats />
        <Cases />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
