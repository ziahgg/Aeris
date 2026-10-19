import { useMemo, useState } from 'react'
import { Icon } from '../components/Icon'
import { Drawer } from '../components/Drawer'
import { formatPrice } from '../content/format'
import { announcements, primaryNav, products } from '../content/site'
import { useShop } from '../hooks/useShop'

type Panel = 'menu' | 'search' | 'wishlist' | 'bag' | null

const items = (n: number) => `${n} ${n === 1 ? 'item' : 'items'}`

function AnnouncementBar() {
  const [index, setIndex] = useState(0)
  const count = announcements.length
  const step = (dir: 1 | -1) => setIndex((i) => (i + dir + count) % count)
  const ordered = announcements.map((_, i) => announcements[(index + i) % count])

  return (
    <div className="on-dark bg-ink text-white">
      {/* Mobile: single combined line (Figma "Homepage — Mobile 390") */}
      <p className="t-micro flex h-9 items-center justify-center px-4 text-center lg:hidden">
        Free shipping over $150 · Free returns
      </p>
      {/* Desktop: chevrons rotate the messages */}
      <div className="hidden h-10 items-center justify-between px-16 lg:flex" aria-roledescription="carousel">
        <button type="button" onClick={() => step(-1)} aria-label="Previous message" className="-m-2 p-2">
          <Icon name="chevron-left" size={16} />
        </button>
        <ul className="flex items-center gap-6" aria-live="polite">
          {ordered.map((msg, i) => (
            <li key={msg} className="t-micro flex items-center gap-6">
              {i > 0 && <span aria-hidden="true" className="size-[3px] rounded-full bg-white" />}
              {msg}
            </li>
          ))}
        </ul>
        <button type="button" onClick={() => step(1)} aria-label="Next message" className="-m-2 p-2">
          <Icon name="chevron-right" size={16} />
        </button>
      </div>
    </div>
  )
}

function CountBadge({ value, alwaysShow }: { value: number; alwaysShow: boolean }) {
  if (!alwaysShow && value === 0) return null
  return (
    <span
      aria-hidden="true"
      className="absolute -top-1 left-3 flex size-4 items-center justify-center rounded-full bg-ink text-[10px] leading-none font-medium text-white"
    >
      {value}
    </span>
  )
}

function SearchPanel({ onNavigate }: { onNavigate: () => void }) {
  const [query, setQuery] = useState('')
  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return products.filter((p) => `${p.name} ${p.category}`.toLowerCase().includes(q))
  }, [query])

  return (
    <div className="flex flex-col gap-6">
      <label className="flex items-center gap-3 border-b border-ink pb-3">
        <Icon name="search" size={20} />
        <span className="sr-only">Search products</span>
        <input
          type="search"
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search dresses, knitwear, shirts…"
          className="t-body w-full bg-transparent outline-none placeholder:text-muted"
        />
      </label>
      {query.trim() && (
        <p className="t-body-s text-muted" aria-live="polite">
          {results.length} {results.length === 1 ? 'result' : 'results'}
        </p>
      )}
      <ul className="flex flex-col gap-4">
        {results.map((p) => (
          <li key={p.id}>
            <a
              href={p.bestSeller ? '#best-sellers' : '#new-arrivals'}
              onClick={onNavigate}
              className="flex items-center gap-4"
            >
              <img src={p.image} alt="" className="h-20 w-16 bg-stone object-cover" />
              <span className="flex flex-col">
                <span className="t-body-s">{p.name}</span>
                <span className="t-price">{formatPrice(p.price)}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

function WishlistPanel() {
  const { wishlist, toggleWishlist } = useShop()
  const items = products.filter((p) => wishlist.includes(p.id))
  if (items.length === 0) return <p className="t-body text-muted">Your wishlist is empty. Tap the heart on any piece to save it here.</p>
  return (
    <ul className="flex flex-col gap-4">
      {items.map((p) => (
        <li key={p.id} className="flex items-center gap-4">
          <img src={p.image} alt="" className="h-20 w-16 bg-stone object-cover" />
          <span className="flex flex-1 flex-col">
            <span className="t-body-s">{p.name}</span>
            <span className="t-price">{formatPrice(p.price)}</span>
          </span>
          <button type="button" onClick={() => toggleWishlist(p.id)} className="t-body-s text-muted underline hover:text-ink">
            Remove
          </button>
        </li>
      ))}
    </ul>
  )
}

function BagPanel() {
  const { bag, removeFromBag } = useShop()
  const lines = bag
    .map((item, index) => ({ ...item, index, product: products.find((p) => p.id === item.productId) }))
    .filter((l) => l.product)
  if (lines.length === 0) return <p className="t-body text-muted">Your bag is empty. Use Quick add on a best seller to add a size.</p>
  const total = lines.reduce((sum, l) => sum + (l.product?.price ?? 0), 0)
  return (
    <div className="flex flex-col gap-6">
      <ul className="flex flex-col gap-4">
        {lines.map((l) => (
          <li key={l.index} className="flex items-center gap-4">
            <img src={l.product!.image} alt="" className="h-20 w-16 bg-stone object-cover" />
            <span className="flex flex-1 flex-col">
              <span className="t-body-s">{l.product!.name}</span>
              <span className="t-body-s text-muted">Size {l.size}</span>
              <span className="t-price">{formatPrice(l.product!.price)}</span>
            </span>
            <button type="button" onClick={() => removeFromBag(l.index)} className="t-body-s text-muted underline hover:text-ink">
              Remove
            </button>
          </li>
        ))}
      </ul>
      <p className="t-price flex justify-between border-t border-line pt-4">
        <span>Subtotal</span>
        <span>{formatPrice(total)}</span>
      </p>
      <p className="t-body-s text-muted">Checkout isn't available in this preview.</p>
    </div>
  )
}

export function Header() {
  const [panel, setPanel] = useState<Panel>(null)
  const { wishlist, bag } = useShop()
  const close = () => setPanel(null)

  return (
    <>
      <AnnouncementBar />
      <header className="border-b border-line bg-white">
        {/* Desktop header */}
        <div className="hidden h-[86px] items-center justify-between px-16 lg:flex">
          <nav aria-label="Primary" className="flex flex-1 items-center gap-8">
            {primaryNav.map((item) => (
              <a key={item.label} href={item.href} className="t-nav text-ink hover:opacity-60">
                {item.label}
              </a>
            ))}
          </nav>
          <a href="#top" className="t-logo" aria-label="AERIS home">
            Aeris
          </a>
          <div className="flex flex-1 items-center justify-end gap-6">
            <button type="button" onClick={() => setPanel('search')} className="t-nav flex items-center gap-6 text-muted hover:text-ink">
              Search
              <Icon name="search" size={20} className="text-ink" />
            </button>
            <a href="#footer" aria-label="Account and customer service" className="text-ink">
              <Icon name="user" size={20} />
            </a>
            <button
              type="button"
              onClick={() => setPanel('wishlist')}
              aria-label={`Wishlist, ${items(wishlist.length)}`}
              className="relative h-[22px] w-[26px] pt-0.5 text-ink"
            >
              <Icon name="heart" size={20} />
              <CountBadge value={wishlist.length} alwaysShow />
            </button>
            <button
              type="button"
              onClick={() => setPanel('bag')}
              aria-label={`Bag, ${items(bag.length)}`}
              className="relative h-[22px] w-[26px] pt-0.5 text-ink"
            >
              <Icon name="bag" size={20} />
              <CountBadge value={bag.length} alwaysShow />
            </button>
          </div>
        </div>

        {/* Mobile / tablet header */}
        <div className="flex h-14 items-center justify-between px-5 md:px-10 lg:hidden">
          <div className="flex w-20 items-center gap-4">
            <button type="button" onClick={() => setPanel('menu')} aria-label="Open menu" aria-expanded={panel === 'menu'}>
              <Icon name="menu" size={22} />
            </button>
            <button type="button" onClick={() => setPanel('search')} aria-label="Search">
              <Icon name="search" size={22} />
            </button>
          </div>
          <a href="#top" className="t-logo" aria-label="AERIS home">
            Aeris
          </a>
          <div className="flex w-20 items-center justify-end gap-4">
            <button type="button" onClick={() => setPanel('wishlist')} aria-label={`Wishlist, ${items(wishlist.length)}`} className="relative">
              <Icon name="heart" size={22} />
              <CountBadge value={wishlist.length} alwaysShow={false} />
            </button>
            <button type="button" onClick={() => setPanel('bag')} aria-label={`Bag, ${items(bag.length)}`} className="relative">
              <Icon name="bag" size={22} />
              <CountBadge value={bag.length} alwaysShow={false} />
            </button>
          </div>
        </div>
      </header>

      <Drawer open={panel === 'menu'} onClose={close} title="Menu" side="left">
        <nav aria-label="Mobile">
          <ul className="flex flex-col">
            {primaryNav.map((item) => (
              <li key={item.label} className="border-b border-line">
                <a href={item.href} onClick={close} className="t-h4 flex items-center justify-between py-4">
                  {item.label}
                  <Icon name="chevron-right" size={18} />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Drawer>
      <Drawer open={panel === 'search'} onClose={close} title="Search">
        {panel === 'search' && <SearchPanel onNavigate={close} />}
      </Drawer>
      <Drawer open={panel === 'wishlist'} onClose={close} title={`Wishlist (${wishlist.length})`}>
        <WishlistPanel />
      </Drawer>
      <Drawer open={panel === 'bag'} onClose={close} title={`Bag (${bag.length})`}>
        <BagPanel />
      </Drawer>
    </>
  )
}
