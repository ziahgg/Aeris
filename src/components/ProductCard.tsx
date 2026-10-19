import { useEffect, useState } from 'react'
import { Icon } from './Icon'
import { sizes, type Product } from '../content/site'
import { useShop } from '../hooks/useShop'
import { formatPrice } from '../content/format'

/*
 * Figma "ProductCard" — Size=Large (with swatches, wishlist on the image and a
 * hover "Quick add" bar) and Size=Compact/Small (wishlist heart beside the price).
 */
type Props = { product: Product; size: 'large' | 'compact'; className?: string }

function Badge({ label }: { label: string }) {
  return <span className="t-micro absolute top-3 left-3 bg-white px-2 py-[5px] text-ink">{label}</span>
}

function WishlistButton({ product, variant }: { product: Product; variant: 'overlay' | 'inline' }) {
  const { isWishlisted, toggleWishlist } = useShop()
  const active = isWishlisted(product.id)
  const label = active ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`
  if (variant === 'overlay') {
    return (
      <button
        type="button"
        aria-label={label}
        aria-pressed={active}
        onClick={() => toggleWishlist(product.id)}
        className="absolute top-3 right-3 flex size-9 items-center justify-center rounded-full bg-white text-ink transition-transform hover:scale-105"
      >
        <Icon name="heart" size={18} filled={active} />
      </button>
    )
  }
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      onClick={() => toggleWishlist(product.id)}
      className="-m-1.5 flex p-1.5 text-ink"
    >
      <Icon name="heart" size={16} filled={active} />
    </button>
  )
}

function QuickAdd({ product }: { product: Product }) {
  const { addToBag } = useShop()
  const [added, setAdded] = useState<string | null>(null)

  useEffect(() => {
    if (!added) return
    const t = window.setTimeout(() => setAdded(null), 1600)
    return () => window.clearTimeout(t)
  }, [added])

  return (
    <div
      className="absolute inset-x-3 bottom-3 flex h-[46px] translate-y-2 items-center justify-between bg-white px-[18px] opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
      role="group"
      aria-label={`Quick add ${product.name}`}
    >
      <span className="t-eyebrow text-ink" aria-live="polite">
        {added ? `Added · ${added}` : 'Quick add'}
      </span>
      <span className="flex items-center gap-[18px]">
        <span className="t-body-s flex text-muted">
          {sizes.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                addToBag(product.id, s)
                setAdded(s)
              }}
              aria-label={`Add ${product.name}, size ${s}, to bag`}
              className="px-[3px] transition-colors hover:text-ink"
            >
              {s}
            </button>
          ))}
        </span>
        <Icon name="plus" size={18} className="text-ink" />
      </span>
    </div>
  )
}

export function ProductCard({ product, size, className = '' }: Props) {
  if (size === 'large') {
    return (
      <article className={`group flex flex-col gap-3.5 ${className}`}>
        <div className="relative aspect-[310/388] overflow-hidden bg-stone">
          <img src={product.image} alt={product.name} loading="lazy" className="size-full object-cover" />
          {product.badge && <Badge label={product.badge} />}
          <WishlistButton product={product} variant="overlay" />
          <QuickAdd product={product} />
        </div>
        <div className="flex flex-col gap-1.5">
          <h3 className="text-[15px] leading-[1.55]">{product.name}</h3>
          <p className="t-price">{formatPrice(product.price)}</p>
          {product.swatches && (
            <ul className="flex h-5 items-center gap-2" aria-label="Available colours">
              {product.swatches.map((sw, i) => (
                <li
                  key={sw.label}
                  title={sw.label}
                  className={`size-3.5 rounded-full border ${i === 0 ? 'border-ink' : 'border-line'}`}
                  style={{ backgroundColor: sw.color }}
                >
                  <span className="sr-only">{sw.label}</span>
                </li>
              ))}
              <li className="t-body-s text-muted">
                +2<span className="sr-only"> more colours</span>
              </li>
            </ul>
          )}
        </div>
      </article>
    )
  }

  return (
    <article className={`flex flex-col gap-2.5 ${className}`}>
      <div className="relative aspect-[205/256] overflow-hidden bg-stone">
        <img src={product.image} alt={product.name} loading="lazy" className="size-full object-cover" />
        {product.badge && <Badge label={product.badge} />}
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="t-body-s">{product.name}</h3>
        <div className="flex items-center justify-between gap-2">
          <p className="t-price">{formatPrice(product.price)}</p>
          <WishlistButton product={product} variant="inline" />
        </div>
      </div>
    </article>
  )
}
