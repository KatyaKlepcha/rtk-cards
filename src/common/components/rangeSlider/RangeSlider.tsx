import React, { useEffect, useState } from 'react'
import s from './RangeSlider.module.css'
import { selectMax, selectMaxCardsCount, selectMin, selectMinCardsCount } from '../../../features/packs/packs-selectors'
import { useAppSelector } from '../../../app/hooks/useAppSelector'
import { Slider } from '@mui/material'
import { useActions } from '../../../app/hooks/useActions'
import { packsActions } from '../../../features/packs/packs-reducer'

const RangeSlider = () => {
  const minCardsCount = useAppSelector(selectMinCardsCount)
  const maxCardsCount = useAppSelector(selectMaxCardsCount)
  const minRangeCount = useAppSelector(selectMin)
  const maxRangeCount = useAppSelector(selectMax)

  const { setSearchParams } = useActions(packsActions)

  const [value, setValue] = useState<number[]>([minCardsCount, maxCardsCount])

  useEffect(() => {
    if (!minRangeCount && !maxRangeCount) {
      setValue([minCardsCount, maxCardsCount])
    } else {
      minRangeCount && maxRangeCount && setValue([minRangeCount, maxRangeCount])
    }
  }, [minRangeCount, maxRangeCount, minCardsCount, maxCardsCount])

  useEffect(() => {
    if (minCardsCount !== minRangeCount) {
      minRangeCount && setValue([minRangeCount, value[1]])
    }
    if (maxCardsCount !== maxRangeCount) {
      setValue([value[0], maxCardsCount])
    }
  }, [minCardsCount, maxCardsCount])
  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[])
  }

  const onChangeCommittedHandler = () => {
    setSearchParams({ min: value[0] })
    setSearchParams({ max: value[1] })
  }

  return (
    <div className={s.container}>
      <div className={s.title}>Number of cards</div>
      <div className={s.rangeBlock}>
        <div className={s.value}>{value[0]}</div>
        <Slider
          // id={"hw11-double-slider"}
          value={value}
          className={s.slider}
          onChange={handleChange}
          valueLabelDisplay="auto"
          max={maxCardsCount}
          min={minCardsCount}
          onChangeCommitted={onChangeCommittedHandler} //запускается при срабатывании мыши.
        />
        <div className={s.value}>{value[1]}</div>
      </div>
    </div>
  )
}

export default RangeSlider
