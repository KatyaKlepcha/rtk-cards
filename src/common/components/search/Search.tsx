import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import s from './Search.module.css'
import search from '../../images/Search.svg'
import { useAppDispatch } from '../../../app/hooks/useAppDispatch'
import { packsThunks } from '../../../features/packs/packs-reducer'
import { useDebounce } from '../../../app/hooks/useDebaunce'

const Search = () => {
  const dispatch = useAppDispatch()
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  const isFirstRenderRef = useRef(true)

  useEffect(() => {
    if (!isFirstRenderRef.current) {
      dispatch(packsThunks.getPacks({ packName: searchTerm }))
    }
    isFirstRenderRef.current = false
  }, [debouncedSearchTerm])

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.currentTarget.value)
  }

  return (
    <div className={s.container}>
      <label className={s.searchLabel}>
        Search
        <input
          placeholder="Provide your text"
          className={s.inputSearch}
          value={searchTerm}
          onChange={onChangeHandler}
        />
        <img src={search} alt={'search'} className={s.searchImg} />
      </label>
    </div>
  )
}

export default Search
