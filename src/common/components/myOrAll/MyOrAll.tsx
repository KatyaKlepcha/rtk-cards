import React from 'react'
import CommonButton from '../Button/CommonButton'
import s from './MyOrAll.module.css'
import { useAppSelector } from '../../../app/hooks/useAppSelector'
import {
  selectIsMy,
  selectMaxCardsCount,
  selectMinCardsCount,
  selectUserId,
} from '../../../features/packs/packs-selectors'
import { useActions } from '../../../app/hooks/useActions'
import { packsActions } from '../../../features/packs/packs-reducer'
import { selectProfileId } from 'features/profile/profile-selector'

const MyOrAll = () => {
  const isMy = useAppSelector(selectIsMy)
  const maxValue = useAppSelector(selectMaxCardsCount)
  const minValue = useAppSelector(selectMinCardsCount)
  const userId = useAppSelector(selectProfileId)
  const { setSearchParams } = useActions(packsActions)

  const myPacksFilter = () => {
    // setSearchParams({ isMy: true, min: minValue, max: maxValue, userId });
    setSearchParams({ isMy: true, min: minValue, max: maxValue, user_id: userId })
  }

  const allPacksFilter = () => {
    // setSearchParams({ isMy: false, min: minValue, max: maxValue, userId: "" });
    setSearchParams({ isMy: false, min: minValue, max: maxValue, user_id: '' })
  }

  return (
    <div className={s.container}>
      <div className={s.title}>Show packs cards</div>
      <div className={s.buttons}>
        <CommonButton
          title={'My cards'}
          variant={'outlined'}
          className={isMy ? `${s.button} ${s.active}` : s.button}
          onClickHandler={myPacksFilter}
        />
        <CommonButton
          title={'All cards'}
          variant={'outlined'}
          className={!isMy ? `${s.button} ${s.active}` : s.button}
          onClickHandler={allPacksFilter}
        />
      </div>
    </div>
  )
}

export default MyOrAll
