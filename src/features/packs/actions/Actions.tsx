import React, { FC } from 'react'
import teach from '../../../common/images/teach.svg'
import editActions from '../../../common/images/editActions.svg'
import trash from '../../../common/images/trash.svg'
import { CardPacksType } from '../packs-api'
import s from './Actions.module.css'
import { useActions } from '../../../app/hooks/useActions'
import { packsThunks } from '../packs-reducer'
import { useAppSelector } from '../../../app/hooks/useAppSelector'
import { selectIsMy, selectUserId } from '../packs-selectors'
import { selectProfileId } from '../../profile/profile-selector'

type ActionsPropsType = {
  packs: CardPacksType
}

const Actions: FC<ActionsPropsType> = ({ packs }) => {
  const userId = useAppSelector(selectProfileId)
  const isMy = packs.user_id === userId
  const isMySort = useAppSelector(selectIsMy)
  const { deletePacks } = useActions(packsThunks)

  const onCardDelete = () => {
    deletePacks(packs._id)
  }

  return (
    <div className={s.container}>
      <button disabled={packs.cardsCount === 0}>
        <img src={teach} alt={'teach'} />
      </button>
      {isMy && (
        <button>
          <img src={editActions} alt={'editActions'} />
        </button>
      )}
      {isMy && (
        <button>
          <img src={trash} alt={'trash'} onClick={onCardDelete} />
        </button>
      )}
    </div>
  )
}

export default Actions
