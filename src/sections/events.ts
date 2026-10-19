import type { FilterTab } from '../content/site'

/** Fired by "View all new arrivals" to expand the product grid to the full catalogue. */
export const SHOW_ALL_PRODUCTS = 'aeris:show-all-products'

/** Fired by category links elsewhere on the page to pre-select a Best sellers filter tab. */
export const SELECT_FILTER = 'aeris:select-filter'

export function selectFilter(tab: FilterTab) {
  window.dispatchEvent(new CustomEvent<FilterTab>(SELECT_FILTER, { detail: tab }))
}
