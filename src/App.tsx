import Hero from './components/sections/Hero';
import Lookbook from './components/sections/Lookbook';
import About from './components/sections/About';
import Services from './components/sections/Services';
import Collections from './components/sections/Collections';
import Footer from './components/sections/Footer';

export default function App() {
  return (
    <>
      <main>
        <Hero />
        <Lookbook />
        <About />
        <Services />
        <Collections />
      </main>
      <Footer />
    </>
  );
}
