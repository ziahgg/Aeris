import { useEffect, useRef, type ReactNode } from 'react'
import { Icon } from './Icon'

/*
 * Side panel built on the native <dialog> element, which provides focus
 * trapping, Escape-to-close and an inert page behind it.
 */
type Props = {
  open: boolean
  onClose: () => void
  title: string
  side?: 'left' | 'right'
  children: ReactNode
}

export function Drawer({ open, onClose, title, side = 'right', children }: Props) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      aria-label={title}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose()
      }}
      className={`fixed inset-y-0 m-0 h-dvh max-h-none w-full max-w-[420px] bg-white p-0 text-ink backdrop:bg-ink/40 ${
        side === 'right' ? 'right-0 left-auto' : 'right-auto left-0'
      }`}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-line px-5 py-4 lg:px-8 lg:py-6">
          <h2 className="t-eyebrow">{title}</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="-m-2 p-2">
            <Icon name="close" size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-6 lg:px-8">{children}</div>
      </div>
    </dialog>
  )
}
