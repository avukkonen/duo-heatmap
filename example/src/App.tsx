import React from 'react'
import DuoHeatmap from 'duo-heatmap'
import 'duo-heatmap/dist/index.css'
import ROWS from './mock/data'

const App = () => {
  const color1 = '#fae00c'
  const color2 = '#ff0cfb'

  return (
    <div className='app'>
      <div className='app-container'>
        <h1>DuoHeatMap</h1>
        <div className='app-info'>
          <div className='app-color-container'>
            <label>Color 1:</label>
            <span style={{ color: color1 }}>{color1}</span>
          </div>
          <div className='app-color-container'>
            <label>Color 2:</label>
            <span style={{ color: color2 }}>{color2}</span>
          </div>
        </div>
      </div>
      <DuoHeatmap steps={7} rows={ROWS} color1={color1} color2={color2} />
    </div>
  )
}

export default App
