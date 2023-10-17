import React from 'react'
import styles from './cell.module.scss'

export interface Item {
  label: string
  value: number | undefined | null
}

export interface RGB {
  red: number
  green: number
  blue: number
}

export interface Props {
  colors: RGB[]
  id: string
  highestValue: number
  item1: Item
  item2: Item
}

const Cell: React.FC<Props> = (props) => {
  const { id, item1, item2, colors, highestValue } = props
  const stepAmount = colors.length

  // values can be null or undefined
  const value1 = item1.value || 0
  const value2 = item2.value || 0

  //  maximum value of the items values
  const cellMaxValue = value1 + value2

  // ratio of the first value inverted
  const ratio = 1 - value1 / cellMaxValue

  // calculated index of the color lerp
  let colorIndex = Math.round(ratio * stepAmount) - 1

  // sometimes the index is -1 and then it must be 0 or there will be pain
  if (colorIndex < 0) {
    colorIndex = 0
  }

  // alpha value of the total highest value of the given range
  const alpha = 1 / (highestValue / cellMaxValue)
  const cellColor = cellMaxValue
    ? colors[colorIndex]
    : { red: 255, green: 255, blue: 255 }

  return (
    <div
      data-testid='cell'
      id={id}
      className={styles.cell}
      style={{
        backgroundColor: `rgba(${cellColor.red}, ${cellColor.green}, ${
          cellColor.blue
        }, ${cellMaxValue ? alpha : 1})`
      }}
    >
      {cellMaxValue ? (
        <div
          role='tooltip'
          id={'tooltip-' + id}
          data-testid='tooltip'
          className={styles.cellData}
        >
          <div className={styles.cellItem}>
            <span className={styles.cellItemLabel}>{item1.label}</span>
            <span className={styles.cellItemValue}>{value1}</span>
          </div>
          <div className={styles.cellItem}>
            <span className={styles.cellItemLabel}>{item2.label}</span>
            <span className={styles.cellItemValue}>{value2}</span>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Cell
