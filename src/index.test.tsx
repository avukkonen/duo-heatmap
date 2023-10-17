import { ROWS } from './mock/data'
import DuoHeatmap from './index'
import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import React from 'react'

describe('DuoHeatmap', () => {
  const color1 = '#fae00c'
  const color2 = '#ff0cfb'
  const rowCount = ROWS.length

  afterEach(() => {
    cleanup()
  })
  it('DuoheatMap renders', () => {
    render(<DuoHeatmap steps={7} rows={ROWS} color1={color1} color2={color2} />)
    expect(screen.getByTestId('duo-heatmap')).toBeInTheDocument()
  })
  it('All data rows are rendered', () => {
    render(<DuoHeatmap steps={7} rows={ROWS} color1={color1} color2={color2} />)
    const data = screen.getAllByTestId('row-data')
    expect(data.length).toBe(rowCount)
  })
  it('All data cells are rendered', () => {
    render(<DuoHeatmap steps={7} rows={ROWS} color1={color1} color2={color2} />)
    let cellCount = 0

    for (let i = 0; i < rowCount; i++) {
      cellCount += ROWS[i].data.length
      console.log(cellCount)
    }
    const data = screen.getAllByTestId('cell')
    expect(data.length).toBe(cellCount)
  })
  it('all rows have data', () => {
    render(<DuoHeatmap steps={7} rows={ROWS} color1={color1} color2={color2} />)
    const data = screen.getAllByTestId('row-data')
    expect(data.length).toBe(rowCount)
  })
})
