import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { selectCardPacksTotalCount, selectorSortPack } from 'features/packs/packs-selectors'
import { useAppSelector } from 'app/hooks/useAppSelector'
import s from './PackList.module.css'
import arrowSort from '../../common/images/arrowSort.svg'
import PackItem from 'features/packs/packItem/PackItem'
import { BasicPagination } from './pagination/Pagination'
import { CardPacksType } from '../packs/packs-api'
import { packsActions } from '../packs/packs-reducer'
import { useAppDispatch } from '../../app/hooks/useAppDispatch'
import { useState } from 'react'

type PacksListPropsType = {
  packs?: CardPacksType[]
  pageCount?: number
  totalCount: number
  page?: number
}

const PacksList = ({ packs, pageCount, totalCount, page }: PacksListPropsType) => {
  const cardPacksTotalCount = useAppSelector(selectCardPacksTotalCount)
  const sortPacks = useAppSelector(selectorSortPack)
  const dispatch = useAppDispatch()
  const [down, setDown] = useState(true)

  const onChangePagination = (pageNumber: number, pageCount: number) => {
    dispatch(packsActions.setSearchParams({ page: pageNumber, pageCount }))
  }

  const onUpdatePackSort = () => {
    if (sortPacks === '0updated') {
      dispatch(packsActions.setSearchParams({ sortPacks: '1updated' }))
    } else {
      dispatch(packsActions.setSearchParams({ sortPacks: '0updated' }))
    }
    setDown(!down)
  }

  return (
    <>
      {/*<Paper sx={{ width: "100%", overflow: "hidden" }}>*/}
      <TableContainer sx={{ maxHeight: 440 }} className={s.tableContainer}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead className={s.header}>
            <TableRow>
              <TableCell>Name</TableCell>
              {/*<TableCell>Cover</TableCell>*/}
              <TableCell>Cards</TableCell>
              <TableCell sx={{ cursor: 'pointer', position: 'sticky' }} onClick={onUpdatePackSort}>
                Last Updated
                <img src={arrowSort} alt={'arrow'} className={down ? s.arrowImgDown : s.arrowImgUp} />
              </TableCell>
              <TableCell>Created by</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {packs?.map((pack) => {
              return <PackItem key={pack._id} packs={pack} />
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

export default PacksList
