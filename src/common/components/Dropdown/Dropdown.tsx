import useOnClickOutside from 'app/hooks/useOnClickOutside'
import React, { ReactNode, useRef, useState } from 'react'
import cn from 'classnames'
import s from './Dropdown.module.css'

type Props = {
  text?: string | number | JSX.Element
  icon?: ReactNode
  // fillArrow?: string;
  // widthArrow?: string;
  // heightArrow?: string;
  disable?: boolean
  className?: string
  onClick?: (() => void) | null
  children: ReactNode
  showArrowIcon?: boolean
  hiddenText?: boolean
  buttonType?: 'button' | 'submit' | 'reset' | undefined
  error?: boolean
  setOpenState?: (status: boolean) => void
  open?: boolean
}

const Dropdown: React.FC<Props> = ({
  icon,
  className,
  text = '',
  // fillArrow = '#8a8a8a',
  // widthArrow = '9px',
  // heightArrow = '9px',
  disable,
  onClick,
  showArrowIcon = true,
  hiddenText = false,
  buttonType = 'button',
  children,
  setOpenState,
  open = false,
}) => {
  const [isInnerOpen, setInnerOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const isOpen = setOpenState ? open : isInnerOpen

  const changeOpen = (status: boolean) => {
    if (setOpenState) {
      setOpenState(status)
    } else {
      setInnerOpen(status)
    }
  }

  useOnClickOutside(ref, () => isOpen && changeOpen(false))

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()
    !disable && changeOpen(!isOpen)
  }

  return (
    // <div className={cn('dropdown-base ', className, { 'dropdown-base--active': isOpen })} ref={ref}>
    <div className={cn(s.dropdown, className)} ref={ref}>
      <button type={buttonType} className={s.dropdownButton} onClick={onClick || handleOnClick}>
        {icon && icon}
        {(!hiddenText || (hiddenText && isOpen)) && text}
        {!disable && showArrowIcon && (
          <img
            className={s.dropdownIcon}
            // name={'cc_arrow-bold'}
            // width={widthArrow}
            // height={heightArrow}
            // fill={fillArrow}
          />
        )}
      </button>
      {!disable && isOpen && (
        <div onClick={(e) => e.stopPropagation()} className={s.menu}>
          {children}
        </div>
      )}
    </div>
  )
}

export default Dropdown
