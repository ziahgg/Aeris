import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

/*
 * Client-side wishlist and bag. This is a static site with no backend, so state
 * lives in the browser (localStorage) and is never sent anywhere.
 */

export type BagItem = { productId: string; size: string }

type ShopState = {
  wishlist: string[]
  bag: BagItem[]
  toggleWishlist: (productId: string) => void
  isWishlisted: (productId: string) => boolean
  addToBag: (productId: string, size: string) => void
  removeFromBag: (index: number) => void
}

const ShopContext = createContext<ShopState | null>(null)

function readStored<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function writeStored(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage can be unavailable (private mode); state still works for the session.
  }
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>(() => readStored('aeris:wishlist', []))
  const [bag, setBag] = useState<BagItem[]>(() => readStored('aeris:bag', []))

  useEffect(() => writeStored('aeris:wishlist', wishlist), [wishlist])
  useEffect(() => writeStored('aeris:bag', bag), [bag])

  const toggleWishlist = useCallback((id: string) => {
    setWishlist((list) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]))
  }, [])
  const isWishlisted = useCallback((id: string) => wishlist.includes(id), [wishlist])
  const addToBag = useCallback((productId: string, size: string) => {
    setBag((items) => [...items, { productId, size }])
  }, [])
  const removeFromBag = useCallback((index: number) => {
    setBag((items) => items.filter((_, i) => i !== index))
  }, [])

  const value = useMemo(
    () => ({ wishlist, bag, toggleWishlist, isWishlisted, addToBag, removeFromBag }),
    [wishlist, bag, toggleWishlist, isWishlisted, addToBag, removeFromBag],
  )
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useShop() {
  const ctx = useContext(ShopContext)
  if (!ctx) throw new Error('useShop must be used inside <ShopProvider>')
  return ctx
}
