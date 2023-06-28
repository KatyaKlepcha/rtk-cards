import React from 'react'
import CommonButton from '../Button/CommonButton'
import s from './PackIsEmpty.module.css'
import { useAppSelector } from '../../../app/hooks/useAppSelector'
import { selectPackName } from '../../../features/cards/cards-selectors'

const PackIsEmpty = () => {
  const packName = useAppSelector(selectPackName)
  const onAddNewCard = () => {}

  return (
    <div className={s.container}>
      <div className={s.packName}>{packName}</div>
      <div className={s.infoWrapper}>
        <div className={s.info}>This pack is empty. Click add new card to fill this pack</div>
        <CommonButton
          title={'Add new card'}
          variant={'contained'}
          onClickHandler={onAddNewCard}
          className={s.addButton}
        />
      </div>
    </div>
  )
}

export default PackIsEmpty
