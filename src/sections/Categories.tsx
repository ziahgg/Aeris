import { Button } from '../components/Button'
import { categories } from '../content/site'

export function Categories() {
  return (
    <section id="categories" aria-labelledby="categories-title" className="bg-white py-14 lg:py-24">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 pl-5 md:pl-10 lg:gap-10 lg:px-16">
        <h2 id="categories-title" className="t-h2 lg:text-center">
          Shop by category
        </h2>
        <ul className="rail gap-3 pr-5 md:pr-10 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:pr-0">
          {categories.map((c) => (
            <li key={c.title} className="relative isolate h-[350px] w-[260px] overflow-hidden bg-stone lg:h-auto lg:w-auto lg:aspect-[310/420]">
              <img src={c.image} alt="" loading="lazy" className="absolute inset-0 -z-10 size-full object-cover" />
              <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-[200px] bg-gradient-to-b from-ivory/0 to-ivory/94" />
              <div className="absolute bottom-6 left-6 flex flex-col gap-2">
                <h3 className="t-h3">{c.title}</h3>
                <p className="t-body-s text-ink-80">{c.text}</p>
                <Button
                  variant="link"
                  href={c.href}
                  aria-label={`Shop ${c.title}`}
                  className="self-start after:absolute after:inset-[-1000px] after:content-['']"
                >
                  Shop
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
