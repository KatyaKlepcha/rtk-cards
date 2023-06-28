import * as React from 'react'
import Pagination from '@mui/material/Pagination'
import s from './Pagination.module.css'
import BaseSelect from 'common/components/BaseSelect/BaseSelect'

type BasicPaginationPropsType = {
  page?: number
  pageCount?: number
  totalCount: number
  onChangePagination: (pageNumber: number, pageCount: number) => void
}

export const BasicPagination = ({ page, pageCount, totalCount, onChangePagination }: BasicPaginationPropsType) => {
  const lastPage = pageCount && Math.ceil(totalCount / pageCount)

  const onChangeCallback = (event: React.ChangeEvent<unknown>, page: number) => {
    pageCount && onChangePagination(page, pageCount)
  }

  const onChangeSelect = (event: number) => {
    page && onChangePagination(event, page)
  }
  return (
    <div className={s.container}>
      <div className={s.pages}>
        <Pagination page={page} count={lastPage} onChange={onChangeCallback} className={s.pagination} shape="rounded" />
      </div>
      <div className={s.selectWrapper}>
        Show <BaseSelect pageCount={pageCount} page={page} onChangeSelect={onChangeSelect} />
        Cards per Page
      </div>
    </div>
  )
}
