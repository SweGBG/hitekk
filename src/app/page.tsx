import Observers from "@/components/Observers";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import Products from "@/components/Products";
import Promo from "@/components/Promo";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

export default function Home() {
  return (
    <>
      <Observers />
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <Products />
        <Promo />
        <About />
        <Contact />
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
