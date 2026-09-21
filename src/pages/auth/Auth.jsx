import { useAuth } from "../../hooks/useAuth"
import { useState } from "react"
import { useSpring, animated } from '@react-spring/web';
import { useNavigation } from '../../hooks/useNavigation';
import "./Auth.css"

export function Auth({ isLogin, setIsLogin }) {
    const { navigateTo } = useNavigation();
    const { loginUser, logout, newUser, user, loading, error } = useAuth()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (isLogin) {
            const { email, password } = formData
            await loginUser(formData)
            navigateTo('/booking')
        }

        else {
            const { email, password, firstName, lastName } = formData
            await newUser(formData)
        }
    }

    const asideSpringLogin = useSpring({
        transform: isLogin ? `translateX(0%)` : `translateX(-100%)`,
        config: { tension: 200, friction: 25 }
    })

    const asideSpringRegister = useSpring({
        transform: isLogin ? `translateX(-100%)` : `translateX(0%)`,
        config: { tension: 200, friction: 25 }
    })

    return (
        <>
            <animated.aside
                style={{
                    ...asideSpringRegister,
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1,
                    pointerEvents: 'auto'
                }}
                onClick={(e) => e.stopPropagation()}>
                <div className="auth-card">
                    <div className="auth-text">
                        <h1 className="titulo">Crea tu cuenta y comienza tu próxima aventura</h1>
                        <span>Regístrate gratis para explorar alojamientos auténticos, chalets con encanto y casas que te harán sentir como en casa.</span>
                    </div>
                    <div className="auth-form">
                        <label className="auth-label">
                            Primer nombre
                            <input
                                className="auth-input"
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="Juanito"
                            />
                        </label>
                        <label className="auth-label">
                            Apellido
                            <input
                                className="auth-input"
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Perez"
                            />
                        </label>
                        <label className="auth-label">
                            Correo electrónico
                            <input
                                className="auth-input"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="tu@email.com"
                            />
                        </label>
                        <label className="auth-label">
                            Contraseña
                            <input
                                className="auth-input"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                            />
                        </label>
                        <button className="auth-button" disabled={loading} onClick={handleSubmit}>
                            {loading ? 'Cargando...' : isLogin ? 'Iniciar sesión' : 'Registrarme'}
                        </button>
                    </div>
                    {error && <p className="auth-error">Hubo un error</p>}

                    <div className="auth-card-buttons">
                        <p>
                            {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
                        </p>
                        <button type="button" onClick={() => setIsLogin(!isLogin)} className="auth-button">
                            {isLogin ? 'Crear una' : 'Iniciar sesión'}
                        </button>
                    </div>

                </div>
            </animated.aside>
            <animated.aside
                style={{
                    ...asideSpringLogin,
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1,
                    pointerEvents: 'auto'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="auth-card">
                    <div className="auth-text">
                        <h1 className="titulo">¡Bienvenido de nuevo!</h1>
                        <span>Ingresa a tu cuenta y sigue descubriendo lugares acogedores para tu próxima escapada.</span>
                    </div>
                    <div className="auth-form">
                        <label className="auth-label">
                            Correo electrónico
                            <input
                                className="auth-input"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="tu@email.com"
                            />
                        </label>
                        <label className="auth-label">
                            Contraseña
                            <input
                                className="auth-input"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                            />
                        </label>
                        <button className="auth-button" disabled={loading} onClick={handleSubmit}>
                            {loading ? 'Cargando...' : isLogin ? 'Iniciar sesión' : 'Registrarme'}
                        </button>
                    </div>
                    {error && <p className="auth-error">Hubo un error</p>}

                    <div className="auth-card-buttons">
                        <p>
                            {isLogin ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
                        </p>
                        <button type="button" onClick={() => setIsLogin(!isLogin)} className="auth-button">
                            {isLogin ? 'Crear una' : 'Iniciar sesión'}
                        </button>
                    </div>

                </div>

            </animated.aside >
        </>
    )
}