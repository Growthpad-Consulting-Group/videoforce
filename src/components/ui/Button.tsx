import Link from 'next/link'

type ButtonVariant = 'flat' | 'color'

interface ButtonProps {
  variant?: ButtonVariant
  float?: boolean
  href?: string              // internal — uses Next.js Link
  externalHref?: string      // external — uses <a target="_blank">
  type?: 'button' | 'submit'
  disabled?: boolean
  onClick?: () => void
  className?: string
  children: React.ReactNode
}

// Base classes matching .btn CSS exactly:
// padding: 15px 30px; position: relative; margin-top: 10px;
// font-size: 10px; font-weight: 600; letter-spacing: 4px;
// transition: all 200ms linear; text-transform: uppercase;
// border-radius: 4px; display: inline-block;
// ::before pseudo line: top:50%, left:20px, h:1px, w:0 → hover w:30px
// :hover padding-left: 60px
const BASE = [
  'relative inline-block mt-[10px] px-[30px] py-[15px]',
  'text-[10px] font-semibold tracking-[4px] uppercase rounded',
  'transition-all duration-200 ease-linear',
  // ::before pseudo line that slides in on hover
  "before:content-[''] before:absolute before:top-1/2 before:left-5",
  'before:h-px before:w-0 before:bg-white',
  'before:transition-all before:duration-200 before:ease-linear',
  // hover: line appears + padding shifts left
  'hover:before:w-[30px] hover:pl-[60px]',
].join(' ')

// .flat-btn: border: 1px solid #000; color: #fff; background: #bb0168
// .color-btn: background: #fac921; color: #fff; border-color: transparent
const VARIANTS: Record<ButtonVariant, string> = {
  flat:  'border border-black text-white bg-[#bb0168]',
  color: 'bg-[#fac921] text-white border border-transparent',
}

export default function Button({
  variant = 'flat',
  float,
  href,
  externalHref,
  type = 'button',
  disabled,
  onClick,
  className = '',
  children,
}: ButtonProps) {
  const classes = [
    BASE,
    VARIANTS[variant],
    float ? 'float-left' : '',
    disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '',
    className,
  ].filter(Boolean).join(' ')

  if (externalHref) {
    return (
      <a
        href={externalHref}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    )
  }

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
