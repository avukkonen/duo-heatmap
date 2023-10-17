import * as React from 'react'
import Row from './components/row/row-component'
import Cell, { Item } from './components/cell/cell-component'

interface DuoHeatmapProps {
  rows: IRow[]
  color1?: string
  color2?: string
  steps?: number
  modifier?: string
}

export interface IRow {
  label?: string
  data: ICell[]
}

export interface ICell {
  id: string
  item1: Item
  item2: Item
}
const DuoHeatmap: React.FC<DuoHeatmapProps> = (props) => {
  const { modifier, rows, color1, color2, steps } = props
  const [highestValue, setHighestValue] = React.useState(-1)
  const stepsAmount = steps || 10
  const firstColor = color1 || '#ffffff'
  const secondColor = color2 || '000000'

  React.useEffect(() => {
    let dataHighestValue = 0
    for (let r = 0; r < rows.length; r++) {
      const currentRow = rows[r]
      let rowHighest = 0

      for (let c = 0; c < currentRow.data.length; c++) {
        const value1 = currentRow.data[c].item1.value
          ? (currentRow.data[c].item1.value as number)
          : 0
        const value2 = currentRow.data[c].item2.value
          ? (currentRow.data[c].item2.value as number)
          : 0

        const currentCellValue = value1 + value2
        if (currentCellValue > rowHighest) rowHighest = currentCellValue
      }
      if (rowHighest > dataHighestValue) dataHighestValue = rowHighest
    }

    setHighestValue(dataHighestValue)
  }, [highestValue])

  /**
   * Turns two hex colors to a lerp of rgb values
   * @param color1 first color in hex
   * @param color2 second color in hex
   * @param steps amount of steps
   * @returns an array of objects containing rgb values
   */
  const interpolateHexColorsToRGB = (
    color1: string,
    color2: string,
    steps: number
  ) => {
    // Parse the hex colors into RGB values
    const c1R = parseInt(color1.slice(1, 3), 16)
    const c1G = parseInt(color1.slice(3, 5), 16)
    const c1B = parseInt(color1.slice(5, 7), 16)

    const c2R = parseInt(color2.slice(1, 3), 16)
    const c2G = parseInt(color2.slice(3, 5), 16)
    const c2B = parseInt(color2.slice(5, 7), 16)

    // Calculate the difference between the two colors
    const diffR = c2R - c1R
    const diffG = c2G - c1G
    const diffB = c2B - c1B

    const interpolatedColors = []

    // Create the interpolated array of colors
    for (let i = 0; i < steps; i++) {
      const ratio = i / (steps - 1)
      const r = Math.round(c1R + ratio * diffR)
      const g = Math.round(c1G + ratio * diffG)
      const b = Math.round(c1B + ratio * diffB)

      interpolatedColors.push({ red: r, green: g, blue: b })
    }

    return interpolatedColors
  }

  const rgbColors = interpolateHexColorsToRGB(
    firstColor,
    secondColor,
    stepsAmount
  )

  return (
    <div
      data-testid='duo-heatmap'
      className={`duo-heatmap ${modifier ? 'duo-heatmap--' + modifier : ''}`}
    >
      {rows.map((row, index) => (
        <Row label={row.label} key={'row-' + index}>
          {highestValue === -1
            ? null
            : row.data.map((cell) => (
                <Cell
                  id={cell.id}
                  key={cell.id}
                  highestValue={highestValue}
                  colors={rgbColors}
                  item1={cell.item1}
                  item2={cell.item2}
                />
              ))}
        </Row>
      ))}
    </div>
  )
}

export default DuoHeatmap
