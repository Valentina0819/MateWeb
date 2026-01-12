import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  CContainer, CRow, CCol, CCardGroup, CCard, CCardBody, CForm,
  CInputGroup, CInputGroupText, CFormInput, CButton, CModal,
  CModalHeader, CModalBody, CModalFooter
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilUser, cilLockLocked } from '@coreui/icons';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [mensajeError, setMensajeError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, contraseña }),
      });

      const data = await response.json();
      console.log("Respuesta del servidor:", data);

      if (response.ok) {
        // Guarda usuario, rol e id_usuario en localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("usuario", JSON.stringify({
          email: data.usuario,
          rol: data.rol,
          id_usuario: data.id_usuario
        }));

        // Redirige según el rol
        if (data.rol === 'admin') {
          navigate("/docente/dashboard");
        } else if (data.rol === 'alumno') {
          navigate("/AlumnoDashboard");
        } else if (data.rol === 'docente') {
          navigate("/docente/dashboard");
        
        } else {
          navigate("/404");
        }
      } else {
        setMensajeError(data.mensaje || "Error al iniciar sesión");
        setShowErrorModal(true);
      }
    } catch (error) {
      setMensajeError("Error al iniciar sesión");
      setShowErrorModal(true);
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-row align-items-center"
      style={{
        backgroundImage: "url('src/assets/images/fondomat.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4" style={{ background: '#fff', borderRight: '4px solidrgb(54, 121, 255)' }}>
                <CCardBody>
                  <CForm onSubmit={handleLogin}>
                    <h1 className="text-black fw-bold mb-3">Iniciar Sesión</h1>
                    <p className="mb-4" style={{ color: '#070145', fontWeight: 500 }}>
                      Accede a la plataforma de aprendizaje de matematicas
                    </p>
                    <div className="mb-3 text-secondary" style={{ fontStyle: 'italic', fontSize: 15 }}>
                      "Comprometidos con la educación de la sociedad"
                    </div>
                    <CInputGroup className="mb-3">
                      <CInputGroupText style={{ background: '#070145', color: '#fff' }}>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        type="email"
                        placeholder="Correo electrónico"
                        autoComplete="username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText style={{ background: ' #070145', color: '#fff' }}>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Contraseña"
                        autoComplete="current-password"
                        value={contraseña}
                        onChange={(e) => setContraseña(e.target.value)}
                        required
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="info" className="px-4 text-white fw-bold" type="submit">
                          Ingresar
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-end">
                        <CButton color="link" className="px-0 text-info">
                          <Link to="/lista">
                            ¿Olvidaste tu contraseña?
                          </Link>
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard
                className="text-white py-5 d-none d-md-block"
                style={{
                  width: '44%',
                  background: ' #070145',
                  border: 'none',
                }}
              >
                <CCardBody className="text-center d-flex flex-column justify-content-center align-items-center h-100">
                  <div>
                    <h2 className="fw-bold mb-3">¡Bienvenido!</h2>
                    <p className="mb-4" style={{ fontSize: 17 }}>
                      Únete a nuestra comunidad de aprendizaje sobre el mundo de las matematicas.
                    </p>
                    <Link to="/register">
                      <CButton color="light" className="mt-3 fw-bold text-black" active tabIndex={-1}>
                        ¡Regístrate ahora!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
      {/* Modal de error */}
      <CModal visible={showErrorModal} onClose={() => setShowErrorModal(false)}>
        <CModalHeader closeButton>
          Error de inicio de sesión
        </CModalHeader>
        <CModalBody>
          {mensajeError}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowErrorModal(false)}>
            Cerrar
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
};

export default Login;