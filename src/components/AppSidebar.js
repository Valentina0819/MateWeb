import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
// filepath: d:\USUARIO\Documents\GitHub\FrontEnd - Lenguaje 3\frontend\src\components\AppSidebar.js
import logo1 from 'src/assets/images/logodesastres.jpg'

import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react'


import { AppSidebarNav } from './AppSidebarNav'



// sidebar nav config
import navigation from '../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  // Tamaño del logo según el estado del sidebar
  const logoSize = unfoldable ? { height: 60, width: 60 } : { height: 155, width: 160 }
  const logoStyle = {
    borderRadius: '100%',
    objectFit: 'cover',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    display: 'block',
    margin: '0 25px',
    transition: 'all 0.3s',
    ...logoSize,
  }

  return (
    <CSidebar
      className="border-end"
      style={{ background: '#FF7043' }} // Orange 3
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarHeader className="border-bottom" style={{ background: '#FF7043' }}>
        <CSidebarBrand
          to="/"
          className="logo1 d-flex justify-content-center align-items-center"
          style={{ height: 140 }}
        >
          <img
            src={logo1}
            alt="Logo"
            style={logoStyle}
          />
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
        />
      </CSidebarHeader>
      <AppSidebarNav items={navigation} />
      <CSidebarFooter className="border-top d-none d-lg-flex" style={{ background: '#FF7043' }}>
        <CSidebarToggler
          onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
        />
      </CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
