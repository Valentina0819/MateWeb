import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4" style={{ background: '#070145', color: 'white' }}>
      <div>
        <span className="ms-1">&copy; 2025 UNEFA.</span>
      </div>
      <div className="text-secondary " style={{ fontStyle: 'italic', fontSize: 15 }}>
        
      <span style={{color: 'white' }}></span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
