import React, { FC, useState } from 'react'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import s from '../../../packs/packItem/PackItem.module.css'
import { Link } from 'react-router-dom'
import Actions from '../../../packs/actions/Actions'
import { CardType } from '../../cards-api'
import { convertDate } from '../../../../common/utils/convertDate'
import Rating, { RatingValueType } from '../../../../common/Rating/Rating'

type CardItemPropsType = {
  cards: CardType
}

const CardItem: FC<CardItemPropsType> = ({ cards }) => {
  const [value, setRatingValue] = useState<RatingValueType>(0)
  const dateUpdated = convertDate(cards.updated)

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      {/*<TableCell className={s.packName} component="th" scope="row">*/}
      {/*  /!*<Link style={{ wordBreak: "break-word" }} to={card._id}>*!/*/}
      {/*  /!*  {card.name}*!/*/}
      {/*  /!*</Link>*!/*/}
      {/*</TableCell>*/}
      {/*<TableCell align="left">/!*<Picture deckCover={packs.deckCover} defaultCover={coverDefault} />*!/</TableCell>*/}
      <TableCell className={s.text}>{cards.question}</TableCell>
      <TableCell className={s.text}>{cards.answer}</TableCell>
      <TableCell className={s.text}>{dateUpdated}</TableCell>
      <TableCell className={s.text}>
        <Rating value={value} setRatingValue={setRatingValue} />
      </TableCell>
    </TableRow>
  )
}

export default CardItem
