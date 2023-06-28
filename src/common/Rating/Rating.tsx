import React from 'react'
import Star from './Star/Star'

export type RatingValueType = 0 | 1 | 2 | 3 | 4 | 5

type RatingPropsType = {
  value: RatingValueType
  setRatingValue: (value: RatingValueType) => void
}

const Rating = (props: RatingPropsType) => {
  return (
    <div>
      <Star selected={props.value > 0} value={1} setRatingValue={props.setRatingValue} />
      <Star selected={props.value > 1} value={2} setRatingValue={props.setRatingValue} />
      <Star selected={props.value > 2} value={3} setRatingValue={props.setRatingValue} />
      <Star selected={props.value > 3} value={4} setRatingValue={props.setRatingValue} />
      <Star selected={props.value > 4} value={5} setRatingValue={props.setRatingValue} />
    </div>
  )
}

export default Rating
