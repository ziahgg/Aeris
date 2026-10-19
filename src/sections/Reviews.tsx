import { useEffect, useRef, useState } from 'react'
import { Button } from '../components/Button'
import { Icon } from '../components/Icon'
import { reviews } from '../content/site'

function Stars({ size }: { size: number }) {
  return (
    <span className="flex gap-1 text-ink" role="img" aria-label="Rated 5 out of 5">
      {Array.from({ length: 5 }, (_, i) => (
        <Icon key={i} name="star" size={size} />
      ))}
    </span>
  )
}

export function Reviews() {
  const railRef = useRef<HTMLUListElement>(null)
  const [active, setActive] = useState(0)

  // Track which card is in view for the mobile pager dots.
  useEffect(() => {
    const rail = railRef.current
    if (!rail) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index))
        })
      },
      { root: rail, threshold: 0.6 },
    )
    Array.from(rail.children).forEach((c) => io.observe(c))
    return () => io.disconnect()
  }, [])

  const goTo = (i: number) => {
    const rail = railRef.current
    const card = rail?.children[i] as HTMLElement | undefined
    if (rail && card) rail.scrollTo({ left: card.offsetLeft - rail.offsetLeft, behavior: 'smooth' })
  }

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="bg-ivory py-14 lg:pt-24 lg:pb-28">
      <div className="container-page flex flex-col gap-6 lg:gap-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-3 lg:gap-4">
            <p className="t-eyebrow text-muted">Customer reviews</p>
            <h2 id="reviews-title" className="t-h2">
              Worn &amp; loved
            </h2>
          </div>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-4">
            <span className="lg:hidden">
              <Stars size={16} />
            </span>
            <span className="hidden lg:block">
              <Stars size={18} />
            </span>
            <p className="t-body-s text-muted">Average rating and review count from your review platform</p>
            <span className="hidden w-2 lg:block" aria-hidden="true" />
            <Button variant="link" href="#reviews-list" className="self-start max-lg:hidden">
              Read all reviews
            </Button>
          </div>
        </div>

        <ul
          id="reviews-list"
          ref={railRef}
          className="rail -mx-5 scroll-px-5 gap-3 px-5 md:-mx-10 md:scroll-px-10 md:gap-6 md:px-10 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0"
        >
          {reviews.map((r, i) => (
            <li key={r.id} data-index={i} className="w-full bg-white md:w-[calc(50%-12px)] lg:w-auto">
              <figure className="flex h-full flex-col gap-5 p-9">
                <Stars size={16} />
                <blockquote className="flex-1 text-[18px] leading-[1.6]">
                  <p>{r.text}</p>
                </blockquote>
                <hr className="border-line" />
                <figcaption className="flex flex-col gap-1">
                  <span className="t-eyebrow">{r.author}</span>
                  <span className="t-body-s text-muted">{r.meta}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <div className="flex gap-2 md:hidden" role="group" aria-label="Choose review">
          {reviews.map((r, i) => (
            <button
              key={r.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show review ${i + 1}`}
              aria-current={i === active}
              className={`size-1.5 rounded-full bg-ink transition-opacity ${i === active ? 'opacity-100' : 'opacity-25'}`}
            />
          ))}
        </div>
        <Button variant="link" href="#reviews-list" className="self-start lg:hidden">
          Read all reviews
        </Button>

        <p className="t-body-s hidden text-muted lg:block">
          Review cards are placeholders. Replace with verified customer reviews and real ratings before launch.
        </p>
      </div>
    </section>
  )
}
