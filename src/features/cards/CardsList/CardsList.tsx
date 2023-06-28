import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import s from './CardsList.module.css'
import arrowSort from '../../../common/images/arrowSort.svg'
import { BasicPagination } from 'features/packList/pagination/Pagination'
import { useAppSelector } from '../../../app/hooks/useAppSelector'
import { selectCards, selectCardsTotalCount, selectPage, selectPageCount } from '../cards-selectors'
import CardItem from './CardItem/CardItem'
import { CardType } from '../cards-api'
import { useAppDispatch } from '../../../app/hooks/useAppDispatch'
import { cardsActions } from '../cards-reducer'
import { selectorSortPack } from '../../packs/packs-selectors'

const CardsList = () => {
  const cards: CardType[] = useAppSelector(selectCards)
  const page = useAppSelector(selectPage)
  const pageCount = useAppSelector(selectPageCount)
  const totalCount = useAppSelector(selectCardsTotalCount)
  const sortPacks = useAppSelector(selectorSortPack)
  const dispatch = useAppDispatch()

  const onChangePagination = (pageNumber: number, pageCount: number) => {
    dispatch(cardsActions.setCardPage({ cardPage: pageNumber }))
    dispatch(cardsActions.setCardPageCount({ pageCount }))
  }

  const onUpdateSort = () => {}

  return (
    <>
      {/*<Paper sx={{ width: "100%", overflow: "hidden" }}>*/}
      <TableContainer sx={{ maxHeight: 440 }} className={s.tableContainer}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead className={s.header}>
            <TableRow>
              <TableCell>Question</TableCell>
              {/*<TableCell>Cover</TableCell>*/}
              <TableCell>Answer</TableCell>
              <TableCell sx={{ cursor: 'pointer', position: 'sticky' }}>
                Last Updated
                <img src={arrowSort} alt={'arrow'} className={s.arrowImg} onClick={onUpdateSort} />
              </TableCell>
              <TableCell>Grade</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cards.map((card) => {
              return <CardItem cards={card} key={card._id} />
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <BasicPagination
        page={page}
        pageCount={pageCount}
        totalCount={totalCount}
        onChangePagination={onChangePagination}
      />
    </>
  )
}

export default CardsList
