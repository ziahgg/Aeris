import { Button } from '../components/Button'
import { images } from '../content/images'
import { communityPosts, social } from '../content/site'

/*
 * The mobile frame shows a 3 × 2 grid of square placeholders with no images
 * assigned, so it is filled with editorial photography from the same file.
 */
const mobileGrid = [
  images.brandStory,
  images.chapterLight,
  images.chapterMovement,
  images.bentoKnit,
  images.chapterEase,
  images.bentoDress,
]

export function Community() {
  return (
    <section id="community" aria-labelledby="community-title" className="bg-white pt-14 lg:pt-28">
      <div className="mx-auto flex max-w-[560px] flex-col items-center gap-3 px-5 text-center lg:gap-4">
        <p className="t-eyebrow text-muted">Community</p>
        <h2 id="community-title" className="t-h2">
          #WearAERIS
        </h2>
        <p className="t-body-s text-muted lg:hidden">Tag @aeris for a chance to be featured.</p>
        <p className="t-body hidden text-muted lg:block">
          Share how you wear it. Tag @aeris for a chance to be featured here and on our channels.
        </p>
        <Button variant="link" href={social.instagram} target="_blank" rel="noopener noreferrer">
          Follow on Instagram
        </Button>
      </div>

      <ul className="mt-8 grid grid-cols-3 lg:hidden" aria-label="Community photos">
        {mobileGrid.map((src) => (
          <li key={src}>
            <img src={src} alt="" loading="lazy" className="aspect-square w-full bg-stone object-cover" />
          </li>
        ))}
      </ul>

      <ul className="mt-12 hidden grid-cols-5 lg:grid" aria-label="AERIS on Instagram">
        {communityPosts.map((post) => (
          <li key={post.image}>
            <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="group block overflow-hidden">
              <img
                src={post.image}
                alt={post.alt}
                loading="lazy"
                className="aspect-[288/360] w-full object-cover transition-opacity duration-300 group-hover:opacity-90"
              />
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
