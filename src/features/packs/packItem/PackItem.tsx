import React, { FC } from 'react'
import { CardPacksType } from 'features/packs/packs-api'
import s from './PackItem.module.css'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import { convertDate } from '../../../common/utils/convertDate'
import Actions from '../actions/Actions'
import { Link } from 'react-router-dom'

type PackPropsType = {
  packs: CardPacksType
}

const PackItem: FC<PackPropsType> = ({ packs }) => {
  const date = convertDate(packs.updated)
  return (
    // <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
    <TableRow className={s.container}>
      <TableCell className={s.packName} component="th" scope="row">
        <Link style={{ wordBreak: 'break-word' }} to={packs._id}>
          {packs.name}
        </Link>
      </TableCell>
      {/*<TableCell align="left">/!*<Picture deckCover={packs.deckCover} defaultCover={coverDefault} />*!/</TableCell>*/}
      <TableCell className={s.text}>{packs.cardsCount}</TableCell>
      <TableCell className={s.text}>{date}</TableCell>
      <TableCell className={s.text}>{packs.user_name}</TableCell>
      <TableCell className={s.text}>
        <Actions packs={packs} />
      </TableCell>
    </TableRow>
  )
}

export default PackItem
