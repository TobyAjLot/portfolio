import { ThemeProvider } from '@/contexts/ThemeContext'
import CustomCursor from '@/components/layout/CustomCursor'
import Navbar from '@/components/layout/Navbar'
import HeroSection from '@/components/sections/HeroSection'
import WorkSection from '@/components/sections/WorkSection'
import StackSection from '@/components/sections/StackSection'
import AboutSection from '@/components/sections/AboutSection'
import ContactSection from '@/components/sections/ContactSection'
import FloatingButtons from '@/components/ui/FloatingButtons'

export default function App() {
  return (
    <ThemeProvider>
      <CustomCursor />
      <Navbar />
      <main>
        <HeroSection />
        <WorkSection />
        <StackSection />
        <AboutSection />
        <ContactSection />
      </main>
      <FloatingButtons />
    </ThemeProvider>
  )
}
