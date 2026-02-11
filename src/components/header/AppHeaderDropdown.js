import React from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
  cilAccountLogout, // Agregado para cerrar sesión
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

// Avatar por defecto si no carga el tuyo
import avatar8 from './../../assets/images/avatars/8.jpg'

const AppHeaderDropdown = () => {
  return (
    <>
      <style>
        {`
          /* Personalización del menú desplegable */
          .custom-dropdown-menu {
            border-radius: 16px !important;
            border: 1px solid rgba(168, 85, 247, 0.2) !important;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2) !important;
            overflow: hidden;
            padding: 0 !important;
            min-width: 220px !important;
          }

          .custom-header {
            background: #f3e8ff !important; /* Lila muy claro */
            color: #581c87 !important; /* Morado oscuro */
            font-weight: 800 !important;
            text-transform: uppercase;
            font-size: 0.7rem;
            letter-spacing: 1px;
            padding: 12px 16px !important;
          }

          .custom-item {
            padding: 10px 16px !important;
            font-weight: 500;
            color: #4b5563;
            transition: all 0.2s ease;
          }

          .custom-item:hover {
            background-color: #faf5ff !important;
            color: #7e22ce !important;
          }

          .icon-purple {
            color: #a855f7 !important;
          }

          /* Efecto para el avatar en el header */
          .header-avatar {
            border: 2px solid #a855f7;
            padding: 2px;
            transition: transform 0.2s;
          }

          .header-avatar:hover {
            transform: scale(1.05);
            border-color: #d8b4fe;
          }
        `}
      </style>

      <CDropdown variant="nav-item">
        <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
          <CAvatar src={avatar8} size="md" className="header-avatar" />
        </CDropdownToggle>

        <CDropdownMenu className="custom-dropdown-menu pt-0" placement="bottom-end">
          <CDropdownHeader className="custom-header mb-2">Cuenta del Usuario</CDropdownHeader>

          <CDropdownItem className="custom-item" href="#">
            <CIcon icon={cilUser} className="me-2 icon-purple" />
            Mi Perfil
          </CDropdownItem>

          <CDropdownItem className="custom-item text-danger" href="/login">
            <CIcon icon={cilAccountLogout} className="me-2" />
            Cerrar Sesión
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    </>
  )
}

export default AppHeaderDropdown
