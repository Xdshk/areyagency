import Hero from "../components/Hero";
import WorksSection from "../components/WorksSection";
import About from "../components/About";
import ContactSection from "../components/ContactSection";

export const metadata = {
  title: "Arey Studio",
  description: "Креативное агентство",
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <WorksSection maxItems={4} />
      <About />
      <ContactSection />
    </main>
  );
}
