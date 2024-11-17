import About from "@/components/about";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Winners from "@/components/winners";

const page = () => {
  return (
    <>
      <Header />
      <Hero />
      <About />

      <Winners />
      <Footer />
    </>
  );
};
export default page;
