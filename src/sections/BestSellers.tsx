import { useEffect, useMemo, useState } from 'react'
import { Button } from '../components/Button'
import { ProductCard } from '../components/ProductCard'
import { filterTabs, products, type FilterTab } from '../content/site'
import { SELECT_FILTER, SHOW_ALL_PRODUCTS } from './events'

export function BestSellers() {
  const [tab, setTab] = useState<FilterTab>('All')
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    const onShowAll = () => {
      setTab('All')
      setShowAll(true)
    }
    const onSelect = (e: Event) => {
      setTab((e as CustomEvent<FilterTab>).detail)
      setShowAll(false)
    }
    window.addEventListener(SHOW_ALL_PRODUCTS, onShowAll)
    window.addEventListener(SELECT_FILTER, onSelect)
    return () => {
      window.removeEventListener(SHOW_ALL_PRODUCTS, onShowAll)
      window.removeEventListener(SELECT_FILTER, onSelect)
    }
  }, [])

  const visible = useMemo(() => {
    if (tab === 'All') return showAll ? products : products.filter((p) => p.bestSeller)
    return products.filter((p) => p.category === tab)
  }, [tab, showAll])

  return (
    <section id="best-sellers" aria-labelledby="best-sellers-title" className="bg-white pt-4 pb-16 lg:pt-6 lg:pb-28">
      <div className="container-page flex flex-col gap-6 lg:items-center lg:gap-10">
        <h2 id="best-sellers-title" className="t-h2 lg:text-center">
          Best sellers
        </h2>

        <div className="rail -mx-5 scroll-px-5 gap-6 px-5 md:-mx-10 md:scroll-px-10 md:px-10 lg:mx-0 lg:gap-10 lg:overflow-visible lg:px-0" role="group" aria-label="Filter best sellers">
          {filterTabs.map((t) => {
            const active = t === tab
            return (
              <button
                key={t}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setTab(t)
                  setShowAll(false)
                }}
                className={`t-nav flex flex-col gap-2 pb-0 transition-colors ${active ? 'text-ink' : 'text-muted hover:text-ink'}`}
              >
                {t}
                <span aria-hidden="true" className={`h-px w-full ${active ? 'bg-ink' : 'bg-transparent'}`} />
              </button>
            )
          })}
        </div>

        <div aria-live="polite" className="w-full">
          {visible.length > 0 ? (
            <ul className="grid w-full grid-cols-2 gap-x-3 gap-y-7 md:grid-cols-4 md:gap-x-4 md:gap-y-10 lg:gap-x-6">
              {visible.map((p) => (
                <li key={p.id}>
                  <ProductCard product={p} size="compact" className="lg:hidden" />
                  <ProductCard product={p} size="large" className="hidden lg:flex" />
                </li>
              ))}
            </ul>
          ) : (
            <p className="t-body py-10 text-center text-muted">No pieces in this category yet.</p>
          )}
        </div>

        {tab === 'All' && (
          <Button variant="outline" onClick={() => setShowAll((v) => !v)} aria-expanded={showAll} className="w-full lg:w-auto">
            {showAll ? 'Show best sellers only' : 'View all best sellers'}
          </Button>
        )}
      </div>
    </section>
  )
}
