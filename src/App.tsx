import './App.css'
import './styles/theme.css'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Features from './components/Features'
import About from './components/About'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import ChatWidget from './components/ChatWidget'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Navigation />
      <Hero />
      <Features />
      <About />
      <Testimonials />
      <FAQ />
      <Footer />
      <ChatWidget />
    </>
  );
}

export default App
