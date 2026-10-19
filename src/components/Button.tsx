import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { Icon } from './Icon'

/* Mirrors the Figma "Button" component set: Primary, Light, Outline, Link, Link Light. */
export type ButtonVariant = 'primary' | 'light' | 'outline' | 'link' | 'link-light'

const base = 't-eyebrow inline-flex items-center justify-center gap-3 whitespace-nowrap transition-colors duration-200'

const variants: Record<ButtonVariant, string> = {
  primary: 'h-[50px] px-[34px] bg-ink text-white hover:bg-ink-80',
  light: 'h-[50px] px-[34px] bg-white text-ink hover:bg-ivory',
  outline: 'h-[52px] px-[34px] border border-ink text-ink hover:bg-ink hover:text-white',
  link: 'py-1.5 text-ink [&:hover>svg]:translate-x-1',
  'link-light': 'py-1.5 text-white [&:hover>svg]:translate-x-1',
}

type Common = { variant: ButtonVariant; children: ReactNode; className?: string }
type AsLink = Common & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
type AsButton = Common & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }

export function Button(props: AsLink | AsButton) {
  const { variant, children, className = '', ...rest } = props
  const isLink = variant === 'link' || variant === 'link-light'
  const cls = `${base} ${variants[variant]} ${className}`
  const content = (
    <>
      {children}
      {isLink && <Icon name="arrow-right" size={18} className="transition-transform duration-200" />}
    </>
  )
  if ('href' in rest && rest.href !== undefined) {
    return (
      <a className={cls} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </a>
    )
  }
  return (
    <button type="button" className={cls} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  )
}
