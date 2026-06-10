import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import Products from "@/components/Products";
import PromoBanner from "@/components/PromoBanner";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollFadeIn from "@/components/ScrollFadeIn";

export default function Home() {
  return (
    <>
      <ScrollFadeIn />
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <Products />
        <PromoBanner />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
