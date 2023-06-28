import React from 'react'
import CommonButton from 'common/components/Button/CommonButton'
import s from './HeaderPacks.module.css'
import Search from 'common/components/search/Search'
import MyOrAll from 'common/components/myOrAll/MyOrAll'
import RangeSlider from 'common/components/rangeSlider/RangeSlider'
import Reset from '../../../common/images/Reset.svg'
import { useActions } from '../../../app/hooks/useActions'
import { packsActions, packsThunks } from '../packs-reducer'
import { useAppSelector } from '../../../app/hooks/useAppSelector'
import { selectMaxCardsCount } from '../packs-selectors'
import { DeleteOutline } from '@mui/icons-material'

const HeaderPacks = () => {
  const { addPack } = useActions(packsThunks)
  const maxCardsCount = useAppSelector(selectMaxCardsCount)
  const { resetAllSettings } = useActions(packsActions)
  const onAddNewPack = () => {
    addPack({ name: 'NEW PACK +++' })
  }

  const onResetAllHandler = () => {
    resetAllSettings({ max: maxCardsCount })
  }

  return (
    <div className={s.container}>
      <div className={s.packsListContainer}>
        <div className={s.title}>Packs List</div>
        <CommonButton
          title={'Add new pack'}
          variant={'contained'}
          className={s.addNewPack}
          onClickHandler={onAddNewPack}
        />
      </div>
      <div className={s.filterBlock}>
        <Search />
        <MyOrAll />
        <RangeSlider />
        <CommonButton
          title={'Clear Filter'}
          variant={'contained'}
          startIcon={<DeleteOutline />}
          onClickHandler={onResetAllHandler}
          className={s.clearFilterBtn}
        />
        {/*<img src={Reset} alt={'Reset'} className={s.resetImg} width="40" height="36" onClick={onResetAllHandler} />*/}
      </div>
    </div>
  )
}

export default HeaderPacks
