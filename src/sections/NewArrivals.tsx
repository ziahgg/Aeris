import { useCallback, useEffect, useRef, useState } from 'react'
import { Button } from '../components/Button'
import { Icon } from '../components/Icon'
import { ProductCard } from '../components/ProductCard'
import { products } from '../content/site'
import { SHOW_ALL_PRODUCTS } from './events'

const arrivals = products.filter((p) => p.newArrival)

export function NewArrivals() {
  const railRef = useRef<HTMLUListElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  const update = useCallback(() => {
    const el = railRef.current
    if (!el) return
    setCanPrev(el.scrollLeft > 1)
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 1)
  }, [])

  useEffect(() => {
    const el = railRef.current
    if (!el) return
    update()
    el.addEventListener('scroll', update, { passive: true })
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', update)
      ro.disconnect()
    }
  }, [update])

  const scroll = (dir: 1 | -1) => {
    const el = railRef.current
    if (!el) return
    const card = el.firstElementChild as HTMLElement | null
    const step = card ? card.offsetWidth + 16 : el.clientWidth
    el.scrollBy({ left: dir * step * 2, behavior: 'smooth' })
  }

  const viewAll = () => window.dispatchEvent(new Event(SHOW_ALL_PRODUCTS))

  return (
    <section id="new-arrivals" aria-labelledby="new-arrivals-title" className="bg-ivory py-14 lg:py-24">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 pl-5 md:pl-10 lg:gap-10 lg:px-16">
        <div className="flex items-end justify-between gap-6 pr-5 md:pr-10 lg:pr-0">
          <div className="flex flex-col gap-3 lg:gap-4">
            <p className="t-eyebrow text-muted">Just landed</p>
            <h2 id="new-arrivals-title" className="t-h2">
              New arrivals
            </h2>
            <p className="t-body hidden text-muted lg:block">The latest pieces from the Autumn / Winter collection.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-3 md:flex">
              <button
                type="button"
                onClick={() => scroll(-1)}
                disabled={!canPrev}
                aria-label="Previous new arrivals"
                className="flex size-11 items-center justify-center rounded-full border border-ink transition-opacity hover:bg-ink hover:text-white disabled:pointer-events-none disabled:opacity-30"
              >
                <Icon name="chevron-left" size={18} />
              </button>
              <button
                type="button"
                onClick={() => scroll(1)}
                disabled={!canNext}
                aria-label="Next new arrivals"
                className="flex size-11 items-center justify-center rounded-full border border-ink transition-opacity hover:bg-ink hover:text-white disabled:pointer-events-none disabled:opacity-30"
              >
                <Icon name="chevron-right" size={18} />
              </button>
              <span className="w-4" aria-hidden="true" />
            </div>
            <Button variant="link" href="#best-sellers" onClick={viewAll}>
              <span className="lg:hidden">View all</span>
              <span className="hidden lg:inline">View all new arrivals</span>
            </Button>
          </div>
        </div>

        <ul ref={railRef} className="rail gap-3 pr-5 md:pr-10 lg:gap-4 lg:pr-0" aria-label="New arrivals">
          {arrivals.map((p) => (
            <li key={p.id} className="w-[169px] md:w-[205px]">
              <ProductCard product={p} size="compact" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
