import React, { useEffect } from 'react'
import s from './Cards.module.css'
import BackToPackList from '../../common/components/BackToPakList/BackToPackList'
import { useAppSelector } from '../../app/hooks/useAppSelector'
import { selectCards } from './cards-selectors'
import PackIsEmpty from '../../common/components/PackIsEmpty/PackIsEmpty'
import CardsHeader from './CardsHeader/CardsHeader'
import CardsList from './CardsList/CardsList'
import { useActions } from '../../app/hooks/useActions'
import { cardsThunks } from './cards-reducer'
import { useParams } from 'react-router-dom'

const Cards = () => {
  const cards = useAppSelector(selectCards)

  const { getCards } = useActions(cardsThunks)
  const { packID } = useParams()

  useEffect(() => {
    getCards({ cardsPack_id: packID })
  }, [packID])

  return (
    <div className={s.container}>
      <BackToPackList />
      {!cards.length ? (
        <PackIsEmpty />
      ) : (
        <>
          <CardsHeader />
          <CardsList />
        </>
      )}
    </div>
  )
}

export default Cards
