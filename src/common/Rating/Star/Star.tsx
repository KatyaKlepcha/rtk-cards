import React from 'react'
// import { ReactComponent as StarImg } from '../../images/star.svg'
import { ReactComponent as StarImg } from '../../images/Star 5.svg'
// import { ReactComponent as StarImg } from '../../images/new-start.svg'

import { RatingValueType } from '../Rating'
import s from './Star.module.css'

type StarPropsType = {
  selected: boolean
  value: RatingValueType
  setRatingValue: (value: RatingValueType) => void
}

const Star = (props: StarPropsType) => {
  const selected = s.starImg + ' ' + s.starSelected
  return (
    <StarImg
      className={props.selected ? selected : s.starImg}
      onClick={() => {
        props.setRatingValue(props.value)
      }}
    />
  )
}

export default Star
