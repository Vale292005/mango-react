import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'

export default function LoginPage() {
  // Logica 
  const { loginUser, newUser, logout, user, loading, error } = useAuth()

  const [isLogin, setIsLogin] = useState(true)
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
      await loginUser({ email, password })
      return
    }

    const { email, password, firstName, lastName } = formData
    await newUser({ email, password, firstName, lastName })
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-visual">
          <h1>Mangoa</h1>
          <p>Reserva tu próximo destino</p>
        </div>

        <div className="auth-form-wrap">
          <h2>{isLogin ? 'Iniciar sesión' : 'Crear cuenta'}</h2>

          <form onSubmit={handleSubmit} className="auth-form">
            {!isLogin && (
              <>
                <label>
                  Nombre
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Ana"
                  />
                </label>

                <label>
                  Apellido
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Lopez"
                  />
                </label>
              </>
            )}

            <label>
              Correo electrónico
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tu@email.com"
              />
            </label>

            <label>
              Contraseña
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
              />
            </label>

            <button type="submit" disabled={loading}>
              {loading ? 'Cargando...' : isLogin ? 'Iniciar sesión' : 'Registrarme'}
            </button>
          </form>

          {error && <p className="auth-error">Hubo un error</p>}

          <p>
            {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
            <button type="button" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Crear una' : 'Iniciar sesión'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}