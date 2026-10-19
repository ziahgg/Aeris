import { images } from './images'

/* Copy and data taken verbatim from the Figma frames. */

export type ProductCategory = 'Dresses' | 'Knitwear' | 'Shirts' | 'Trousers' | 'Outerwear' | 'Accessories'

export type Product = {
  id: string
  name: string
  price: number
  category: ProductCategory
  image: string
  badge?: 'Bestseller' | 'New'
  swatches?: { color: string; label: string }[]
  /** Featured in the "Best sellers" grid. */
  bestSeller?: boolean
  /** Featured in the "New arrivals" rail. */
  newArrival?: boolean
}

export const products: Product[] = [
  {
    id: 'draped-midi-dress',
    name: 'Draped midi dress',
    price: 189,
    category: 'Dresses',
    image: images.drapedMidiDress,
    badge: 'Bestseller',
    bestSeller: true,
    swatches: [
      { color: '#1a1a1a', label: 'Black' },
      { color: '#e8e0d2', label: 'Ivory' },
      { color: '#7a8da3', label: 'Sky' },
    ],
  },
  {
    id: 'soft-wool-blend-jumper',
    name: 'Soft wool-blend jumper',
    price: 149,
    category: 'Knitwear',
    image: images.softWoolBlendJumper,
    bestSeller: true,
    swatches: [
      { color: '#cdbba7', label: 'Oat' },
      { color: '#f1ece4', label: 'Ivory' },
      { color: '#3a3a3a', label: 'Charcoal' },
    ],
  },
  {
    id: 'oversized-cotton-shirt',
    name: 'Oversized cotton shirt',
    price: 98,
    category: 'Shirts',
    image: images.oversizedCottonShirt,
    badge: 'Bestseller',
    bestSeller: true,
    swatches: [
      { color: '#a9bdd4', label: 'Sky' },
      { color: '#ffffff', label: 'White' },
      { color: '#e3d9c9', label: 'Sand' },
    ],
  },
  {
    id: 'wide-leg-tailored-trousers',
    name: 'Wide-leg tailored trousers',
    price: 139,
    category: 'Trousers',
    image: images.wideLegTrousers,
    bestSeller: true,
    swatches: [
      { color: '#efe9df', label: 'Ivory' },
      { color: '#1a1a1a', label: 'Black' },
      { color: '#8a7f70', label: 'Taupe' },
    ],
  },
  { id: 'slit-midi-dress', name: 'Slit midi dress', price: 159, category: 'Dresses', image: images.slitMidiDress, badge: 'New', newArrival: true },
  { id: 'soft-wool-jumper', name: 'Soft wool jumper', price: 129, category: 'Knitwear', image: images.softWoolJumper, badge: 'New', newArrival: true },
  { id: 'oversized-poplin-shirt', name: 'Oversized poplin shirt', price: 89, category: 'Shirts', image: images.oversizedPoplinShirt, badge: 'New', newArrival: true },
  { id: 'straight-leg-jeans', name: 'Straight-leg jeans', price: 119, category: 'Trousers', image: images.straightLegJeans, badge: 'New', newArrival: true },
  { id: 'belted-trench-coat', name: 'Belted trench coat', price: 229, category: 'Outerwear', image: images.beltedTrenchCoat, badge: 'New', newArrival: true },
  { id: 'leather-tote-bag', name: 'Leather tote bag', price: 179, category: 'Accessories', image: images.leatherToteBag, badge: 'New', newArrival: true },
]

export const sizes = ['XS', 'S', 'M', 'L', 'XL'] as const

export const filterTabs = ['All', 'Dresses', 'Knitwear', 'Shirts', 'Trousers', 'Outerwear'] as const
export type FilterTab = (typeof filterTabs)[number]

export const announcements = ['Free shipping on orders over $150', 'Free returns within 30 days']

export const primaryNav = [
  { label: 'Women', href: '#categories' },
  { label: 'Men', href: '#categories' },
  { label: 'New In', href: '#new-arrivals' },
  { label: 'Collections', href: '#autumn-edit' },
  { label: 'Our Story', href: '#our-story' },
]

export const categories = [
  { title: 'Women', text: 'Tailoring, knitwear and dresses', image: images.categoryWomen, href: '#best-sellers' },
  { title: 'Men', text: 'Shirts, outerwear and denim', image: images.categoryMen, href: '#best-sellers' },
  { title: 'New Arrivals', text: 'The autumn drop, just landed', image: images.categoryNewArrivals, href: '#new-arrivals' },
  { title: 'Accessories', text: 'Bags, belts and finishing details', image: images.categoryAccessories, href: '#autumn-edit' },
]

export const values = [
  { icon: 'layers', title: 'Considered fabrics', text: 'Chosen for how they feel and how they wear over time.' },
  { icon: 'scissors', title: 'Timeless cuts', text: 'Proportions refined to stay relevant beyond one season.' },
  { icon: 'clock', title: 'Fewer, better pieces', text: 'A focused collection designed to mix across your wardrobe.' },
] as const

export const chapters = [
  { no: '01', title: 'Light', text: 'Morning sun on soft ivory tailoring.', image: images.chapterLight },
  { no: '02', title: 'Movement', text: 'Fluid shapes that follow every step.', image: images.chapterMovement },
  { no: '03', title: 'Ease', text: 'Layers that work from early to late.', image: images.chapterEase },
]

export const reviews = [1, 2, 3].map((n) => ({
  id: n,
  text: 'Placeholder for a verified customer review. Pull real reviews from your review platform and keep them to two or three lines so the cards stay even.',
  author: 'Customer name',
  meta: 'Verified buyer · Product purchased',
}))

export const communityPosts = [
  { image: images.postProductHighlight, alt: 'AERIS post: Draped midi dress, $189 — Bestseller' },
  { image: images.postSeasonalCampaign, alt: 'AERIS post: Autumn / Winter 2026 — The warm season' },
  { image: images.postNewArrivals, alt: 'AERIS post: New arrivals — the latest pieces from Autumn / Winter 2026' },
  { image: images.postSaleAnnouncement, alt: 'AERIS post: Limited time — 30% off selected styles' },
  { image: images.postBestSellers, alt: 'AERIS post: Best sellers — wide-leg tailored trousers and oversized cotton shirt' },
]

export const services = [
  { icon: 'truck', title: 'Free shipping', text: 'On orders over $150', textMobile: 'Orders over $150' },
  { icon: 'returns', title: 'Free returns', text: 'Within 30 days of delivery', textMobile: 'Within 30 days' },
  { icon: 'ruler', title: 'Size guide', text: 'Find your perfect fit', textMobile: 'Find your fit' },
  { icon: 'phone', title: 'Customer care', text: 'Mon–Fri, 9:00–18:00', textMobile: 'Mon–Fri, 9–18' },
] as const

/*
 * External destinations. The design does not specify real profile URLs, so these
 * point at the platforms' home pages — replace with the brand's handles before launch.
 */
export const social = {
  instagram: 'https://www.instagram.com/',
  facebook: 'https://www.facebook.com/',
  pinterest: 'https://www.pinterest.com/',
  tiktok: 'https://www.tiktok.com/',
}

/** Campaign film URL. The Figma file contains no video, so the control stays inactive until one is set. */
export const campaignFilmUrl = ''

export type FooterLink = { label: string; href?: string }

export const footerColumns: { title: string; links: FooterLink[] }[] = [
  {
    title: 'Shop',
    links: [
      { label: 'Women', href: '#categories' },
      { label: 'Men', href: '#categories' },
      { label: 'New arrivals', href: '#new-arrivals' },
      { label: 'Best sellers', href: '#best-sellers' },
      { label: 'Accessories', href: '#autumn-edit' },
      { label: 'Gift cards' },
    ],
  },
  {
    title: 'Customer service',
    links: [
      { label: 'Help & FAQ' },
      { label: 'Shipping & returns', href: '#services' },
      { label: 'Size guide', href: '#services' },
      { label: 'Track your order' },
      { label: 'Care guide' },
    ],
  },
  {
    title: 'Company',
    links: [{ label: 'Our story', href: '#our-story' }, { label: 'Journal', href: '#campaign' }, { label: 'Stores' }, { label: 'Careers' }],
  },
  {
    title: 'Contact',
    links: [
      { label: 'hello@aeris.com', href: 'mailto:hello@aeris.com' },
      { label: '+1 (000) 000-0000' },
      { label: 'Mon–Fri, 9:00–18:00' },
      { label: 'Live chat', href: 'mailto:hello@aeris.com?subject=Live%20chat' },
    ],
  },
]

export const legalLinks: FooterLink[] = [
  { label: 'Privacy policy' },
  { label: 'Terms of service' },
  { label: 'Cookie settings' },
  { label: 'Accessibility' },
]
