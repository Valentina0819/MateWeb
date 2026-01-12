import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    CForm,
    CRow,
    CCol,
    CFormInput,
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CAlert
} from '@coreui/react';

const Formulario = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [rol, setRol] = useState('usuario');
    const [enviando, setEnviando] = useState(false);

    // Estados para errores de validación
    const [errors, setErrors] = useState({
        nombre: '',
        apellido: '',
        email: '',
        contraseña: '',
        repeatPassword: ''
    });

    // Estado para saber si el formulario es válido
    const [isFormValid, setIsFormValid] = useState(false);

    const [mensaje, setMensaje] = useState({ text: '', color: '' });
    const navigate = useNavigate();

    // VALIDADORES
    const validarNombre = (val) => {
        if (!val || val.trim() === '') return 'El nombre es obligatorio.';
        if (val.trim().length < 2) return 'El nombre debe tener al menos 2 caracteres.';
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(val)) return 'El nombre solo puede contener letras y espacios.';
        return '';
    };

    const validarApellido = (val) => {
        if (!val || val.trim() === '') return 'El apellido es obligatorio.';
        if (val.trim().length < 2) return 'El apellido debe tener al menos 2 caracteres.';
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(val)) return 'El apellido solo puede contener letras y espacios.';
        return '';
    };

    const validarEmail = (val) => {
        if (!val || val.trim() === '') return 'El correo es obligatorio.';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(val)) return 'Ingrese un correo electrónico válido.';
        return '';
    };

    const validarContraseña = (val) => {
        if (!val) return 'La contraseña es obligatoria.';
        if (val.length < 6) return 'La contraseña debe tener al menos 6 caracteres.';
        if (!/(?=.*[a-z])/.test(val)) return 'La contraseña debe contener al menos una letra minúscula.';
        if (!/(?=.*[A-Z])/.test(val)) return 'La contraseña debe contener al menos una letra mayúscula.';
        if (!/(?=.*\d)/.test(val)) return 'La contraseña debe contener al menos un número.';
        return '';
    };

    const validarRepetirContraseña = (val, pass) => {
        if (!val) return 'Debe repetir la contraseña.';
        if (val !== pass) return 'Las contraseñas no coinciden.';
        return '';
    };

    // Validación en tiempo real
    useEffect(() => {
        const newErrors = {
            nombre: validarNombre(nombre),
            apellido: validarApellido(apellido),
            email: validarEmail(email),
            contraseña: validarContraseña(contraseña),
            repeatPassword: validarRepetirContraseña(repeatPassword, contraseña)
        };
        setErrors(newErrors);

        // Verificar si todos los campos son válidos
        const allValid = !newErrors.nombre && !newErrors.apellido && !newErrors.email && !newErrors.contraseña && !newErrors.repeatPassword;
        setIsFormValid(allValid);
    }, [nombre, apellido, email, contraseña, repeatPassword]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar antes de enviar (por si acaso)
        const errNombre = validarNombre(nombre);
        const errApellido = validarApellido(apellido);
        const errEmail = validarEmail(email);
        const errContraseña = validarContraseña(contraseña);
        const errRepeat = validarRepetirContraseña(repeatPassword, contraseña);

        setErrors({
            nombre: errNombre,
            apellido: errApellido,
            email: errEmail,
            contraseña: errContraseña,
            repeatPassword: errRepeat
        });

        if (errNombre || errApellido || errEmail || errContraseña || errRepeat) {
            setMensaje({ text: 'Corrija los errores antes de continuar.', color: 'danger' });
            return;
        }

        setEnviando(true);
        try {
            const response = await fetch('http://localhost:4000/userss', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre,
                    apellido,
                    email,
                    contraseña,
                    rol
                })
            });

            if (response.ok) {
                setMensaje({ text: 'Usuario registrado correctamente. Redirigiendo...', color: 'success' });
                setTimeout(() => navigate('/login'), 2000);
            } else {
                const data = await response.json();
                setMensaje({ text: data.message || 'Error al registrar el usuario', color: 'danger' });
            }
        } catch (error) {
            console.error('Error:', error);
            setMensaje({ text: 'Error al registrar el usuario. Intente nuevamente.', color: 'danger' });
        }
        setEnviando(false);
    };

    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage: "url('src/assets/images/fondomat.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <CCard className="shadow" style={{ maxWidth: '500px', width: '100%', borderRadius: 10 }}>
                <CCardHeader style={{
                    backgroundColor: '#070145',
                    textAlign: 'center',
                    color: 'white',
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10
                }}>
                    <h4 className="mb-0">Registro de Usuario</h4>
                </CCardHeader>
                <CCardBody style={{ padding: '2rem' }}>
                    {mensaje.text && (
                        <CAlert color={mensaje.color} dismissible onClose={() => setMensaje({ text: '', color: '' })}>
                            {mensaje.text}
                        </CAlert>
                    )}
                    <CForm onSubmit={handleSubmit}>
                        <CRow>
                            <CCol md={12}>
                                {/* Nombre */}
                                <CFormInput
                                    type="text"
                                    label="Nombre"
                                    placeholder="Ingrese su nombre"
                                    minLength={2}
                                    maxLength={50} /*o lo que diga su base de datos para ese campo maxlenght es el maximo y minlenght  el minimo de caractereres que va entrar  asi lo hace en todos los de texto y los que son de cantidades usas min 1 y max pues el valor que quieras*/
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    className="mb-2"
                                    style={{ borderRadius: 8 }}
                                />
                                {errors.nombre && <div style={{ color: 'red', fontSize: 13, marginBottom: 12 }}>{errors.nombre}</div>}

                                {/* Apellido */}
                                <CFormInput
                                    type="text"
                                    label="Apellido"
                                    placeholder="Ingrese su apellido"
                                    value={apellido}
                                    onChange={(e) => setApellido(e.target.value)}
                                    className="mb-2"
                                    style={{ borderRadius: 8 }}
                                />
                                {errors.apellido && <div style={{ color: 'red', fontSize: 13, marginBottom: 12 }}>{errors.apellido}</div>}

                                {/* Email */}
                                <CFormInput
                                    type="email"
                                    label="Correo electrónico"
                                    placeholder="ejemplo@correo.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mb-2"
                                    style={{ borderRadius: 8 }}
                                />
                                {errors.email && <div style={{ color: 'red', fontSize: 13, marginBottom: 12 }}>{errors.email}</div>}

                                {/* Contraseña */}
                                <CFormInput
                                    type="password"
                                    label="Contraseña"
                                    placeholder="Mínimo 6 caracteres, una mayúscula y un número"
                                    value={contraseña}
                                    onChange={(e) => setContraseña(e.target.value)}
                                    className="mb-2"
                                    style={{ borderRadius: 8 }}
                                />
                                {errors.contraseña && <div style={{ color: 'red', fontSize: 13, marginBottom: 12 }}>{errors.contraseña}</div>}

                                {/* Repetir Contraseña */}
                                <CFormInput
                                    type="password"
                                    label="Repetir contraseña"
                                    placeholder="Repita su contraseña"
                                    value={repeatPassword}
                                    onChange={(e) => setRepeatPassword(e.target.value)}
                                    className="mb-2"
                                    style={{ borderRadius: 8 }}
                                />
                                {errors.repeatPassword && <div style={{ color: 'red', fontSize: 13, marginBottom: 12 }}>{errors.repeatPassword}</div>}
                            </CCol>
                        </CRow>
                        <div className="text-center mt-4">
                            <CButton
                                type="submit"
                                style={{
                                    backgroundColor: isFormValid ? '#070145' : '#cccccc',
                                    color: 'white',
                                    marginRight: '10px',
                                    minWidth: 120,
                                    borderRadius: 6,
                                    cursor: isFormValid ? 'pointer' : 'not-allowed'
                                }}
                                disabled={!isFormValid || enviando}
                            >
                                {enviando ? 'Enviando...' : 'Enviar'}
                            </CButton>
                            <CButton
                                type="button"
                                color="secondary"
                                onClick={() => navigate('/login')}
                                style={{ minWidth: 120, borderRadius: 6 }}
                            >
                                Regresar
                            </CButton>
                        </div>
                    </CForm>
                </CCardBody>
            </CCard>
        </div>
    );
};

export default Formulario;