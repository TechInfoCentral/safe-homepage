import { useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Button, ButtonBase } from '@mui/material'
import NextLink from 'next/link'
import clsx from 'clsx'

import { AppRoutes } from '@/config/routes'
import { WALLET_LINK } from '@/config/constants'
import SafeLink from '@/components/common/SafeLink'
import Menu from '@/components/common/Header/Menu'
import { navCategories, type NavCategories } from '@/components/common/Header/navCategories'
// import Logo from '@/public/images/logo.svg'
import AngleDownIcon from '@/public/images/angle-down.svg'
import ArrowIcon from '@/public/images/arrow-out-square-corner.svg'
import css from './styles.module.css'
import NavigationButton from '@/components/common/Header/NavigationButton'
import { useIsMediumScreen } from '@/hooks/useMaxWidth'

const Header = () => {
  const [isBurgerOpen, setIsBurgerOpen] = useState<boolean>(false)
  const [subMenuOpen, setSubMenuOpen] = useState<null | NavCategories>(null)
  const isMediumScreen = useIsMediumScreen()

  const toggleMobileNavigation = () => {
    setIsBurgerOpen((prev) => !prev)
    document.body.classList.toggle('navOpen')
  }

  const closeMobileNavigation = () => {
    document.body.classList.remove('navOpen')
    setIsBurgerOpen(false)
    setSubMenuOpen(null)
  }

  return (
    <div className={clsx(css.header, isBurgerOpen && css.visible)}>
      <NextLink href={AppRoutes.index}>
        {/* <div className={css.logo}>
          <Logo />
        </div> */}
      <div>
      <img src="/images/dimp-logo.png" alt="Logo" width="100"/>
      </div>

      </NextLink>

      <ButtonBase className={css.burger} onClick={toggleMobileNavigation} aria-label="Toggle navigation" disableRipple>
        <span />
      </ButtonBase>
      <nav className={css.navigation}>
        <ul className={css.navList}>
          {navCategories.map(({ category, items, href }) => {
            const onEnter = () => setSubMenuOpen(category)
            const onLeave = () => setSubMenuOpen(null)

            return (
              <li key={category} onMouseEnter={onEnter} onFocus={onEnter} onMouseLeave={onLeave} onBlur={onLeave}>
                {href ? (
                  <NextLink href={href} onClick={closeMobileNavigation}>
                    <div className={css.navLink} dangerouslySetInnerHTML={{ __html: category }} />
                  </NextLink>
                ) : isMediumScreen ? (
                  // Mobile button
                  <Accordion className={clsx(css.accordion, css.hideInLaptop)}>
                    <AccordionSummary expandIcon={<AngleDownIcon />}>
                      <div className={css.categoryTitle}>{category}</div>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Menu items={items ?? []} onItemClick={closeMobileNavigation} />
                    </AccordionDetails>
                  </Accordion>
                ) : (
                  // Desktop button
                  <NavigationButton
                    category={category}
                    items={items ?? []}
                    subMenuOpen={subMenuOpen}
                    onItemClick={closeMobileNavigation}
                  />
                )}
              </li>
            )
          })}
          <li key={WALLET_LINK} className={css.hideInLaptop}>
            {/* <WalletButton /> */}
          </li>
        </ul>
      </nav>

      <div className={css.hideInMobile}>
        {/* <WalletButton /> */}
      </div>
    </div>
  )
}

const WalletButton = () => (
  <SafeLink href={WALLET_LINK}>
    <Button className={css.button} variant="contained">
      Launch Wallet
      <ArrowIcon className={css.icon} />
    </Button>
  </SafeLink>
)

export default Header
