import Row from './row-component'
import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import React from 'react'

describe('Row component', () => {
  afterEach(() => {
    cleanup()
  })
  it('Label can be seen', () => {
    render(<Row label='Label1' />)
    expect(screen.getByTestId('label')).toBeInTheDocument()
  })
  it('No label given', () => {
    render(<Row />)
    expect(screen.queryByTestId('label')).toBeNull()
  })
})
