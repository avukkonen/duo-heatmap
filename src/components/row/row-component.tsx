import React from 'react'
import styles from './row.module.scss'

interface RowProps {
  label?: string
}

const Row: React.FC<RowProps> = (props) => {
  const { label, children } = props
  return (
    <div data-testid='row' className={styles.row}>
      {label ? (
        <div data-testid='label' className={styles.rowLabel}>
          {label}
        </div>
      ) : null}
      <div data-testid='row-data' className={styles.rowData}>
        {children}
      </div>
    </div>
  )
}

export default Row
