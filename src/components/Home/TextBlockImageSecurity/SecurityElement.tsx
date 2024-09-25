import { type BaseBlock } from '@/components/Home/types'
import AngleBracketsIcon from '@/public/images/Home/angle-brackets-icon.svg'
import css from './styles.module.css'
import { Typography } from '@mui/material'

const SecurityElement = ({ image }: { image: BaseBlock['image'] }) => {
  return (
    <div className={css.imageWrapper}>
      <img src="/images/particle2.png" alt="Lines background" className={css.bgImage} />
      {/* {image ? <img src={image.src} alt={image.alt} className={css.image} /> : null} */}

      <div className={css.list}>
        <div className={css.entry}>
          <AngleBracketsIcon />
          <Typography>Open Source</Typography>
        </div>
        <div className={css.entry}>
          <AngleBracketsIcon />
          <Typography>AI-Powered</Typography>
        </div>
        <div className={css.entry}>
          <AngleBracketsIcon />
          <Typography>Interoperable</Typography>
        </div>
      </div>
    </div>
  )
}

export default SecurityElement
