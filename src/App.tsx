import { Header } from './sections/Header'
import { Hero } from './sections/Hero'
import { Categories } from './sections/Categories'
import { BestSellers } from './sections/BestSellers'
import { NewArrivals } from './sections/NewArrivals'
import { BrandStory } from './sections/BrandStory'
import { Campaign } from './sections/Campaign'
import { AutumnEdit } from './sections/AutumnEdit'
import { Reviews } from './sections/Reviews'
import { Newsletter } from './sections/Newsletter'
import { Community } from './sections/Community'
import { Footer, ServiceStrip } from './sections/Footer'
import { ShopProvider } from './hooks/useShop'

export default function App() {
  return (
    <ShopProvider>
      <div id="top">
        <a
          href="#main"
          className="t-eyebrow sr-only z-50 bg-white px-4 py-3 text-ink focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">
          <Hero />
          <Categories />
          <BestSellers />
          <NewArrivals />
          <BrandStory />
          <Campaign />
          <AutumnEdit />
          <Reviews />
          <Newsletter />
          <Community />
          <ServiceStrip />
        </main>
        <Footer />
      </div>
    </ShopProvider>
  )
}
