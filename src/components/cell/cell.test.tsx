import Cell from './cell-component'
import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import './cell-module.scss'

// colors: RGB[]
// highestValue: number
// item1: Item
// item2: Item

// Todo check cell parameters

describe('Cell component', () => {
  afterEach(() => {
    cleanup()
  })
  it('Cell exists', () => {
    render(
      <Cell
        id='1'
        colors={[
          { red: 255, green: 255, blue: 255 },
          { red: 254, green: 254, blue: 254 },
          { red: 253, green: 253, blue: 253 }
        ]}
        highestValue={10}
        item1={{ label: 'Item1', value: 2 }}
        item2={{ label: 'Item2', value: 3 }}
      />
    )
    expect(screen.queryByTestId('cell')).toBeInTheDocument()
  })
  it('Labels are found', () => {
    render(
      <Cell
        id='1'
        colors={[
          { red: 255, green: 255, blue: 255 },
          { red: 254, green: 254, blue: 254 },
          { red: 253, green: 253, blue: 253 }
        ]}
        highestValue={10}
        item1={{ label: 'Item1', value: 3 }}
        item2={{ label: 'Item2', value: 2 }}
      />
    )
    expect(screen.getByText('Item1')).toBeInTheDocument()
    expect(screen.getByText('Item2')).toBeInTheDocument()
  })
  it('Values are found', () => {
    render(
      <Cell
        id='1'
        colors={[
          { red: 255, green: 255, blue: 255 },
          { red: 254, green: 254, blue: 254 },
          { red: 253, green: 253, blue: 253 }
        ]}
        highestValue={10}
        item1={{ label: 'Item1', value: 3 }}
        item2={{ label: 'Item2', value: 2 }}
      />
    )
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })
  it('Both values exist', () => {
    render(
      <Cell
        id='1'
        colors={[
          { red: 255, green: 255, blue: 255 },
          { red: 254, green: 254, blue: 254 },
          { red: 253, green: 253, blue: 253 }
        ]}
        highestValue={10}
        item1={{ label: 'Item1', value: 3 }}
        item2={{ label: 'Item2', value: 2 }}
      />
    )
    expect(screen.getByTestId('tooltip')).toBeInTheDocument()
  })
  it('Values 1 and 2 are 0', () => {
    render(
      <Cell
        id='1'
        colors={[
          { red: 255, green: 255, blue: 255 },
          { red: 254, green: 254, blue: 254 },
          { red: 253, green: 253, blue: 253 }
        ]}
        highestValue={10}
        item1={{ label: 'Item1', value: 0 }}
        item2={{ label: 'Item2', value: 0 }}
      />
    )
    expect(screen.queryByTestId('tooltip')).toBeNull()
  })
  it('Values 1 and 2 are "null"', () => {
    render(
      <Cell
        id='1'
        colors={[
          { red: 255, green: 255, blue: 255 },
          { red: 254, green: 254, blue: 254 },
          { red: 253, green: 253, blue: 253 }
        ]}
        highestValue={10}
        item1={{ label: 'Item1', value: null }}
        item2={{ label: 'Item2', value: null }}
      />
    )
    expect(screen.queryByTestId('tooltip')).toBeNull()
  })
  it('Values 1 and 2 are "undefined"', () => {
    render(
      <Cell
        id='1'
        colors={[
          { red: 255, green: 255, blue: 255 },
          { red: 254, green: 254, blue: 254 },
          { red: 253, green: 253, blue: 253 }
        ]}
        highestValue={10}
        item1={{ label: 'Item1', value: undefined }}
        item2={{ label: 'Item2', value: undefined }}
      />
    )
    expect(screen.queryByTestId('tooltip')).toBeNull()
  })
})
