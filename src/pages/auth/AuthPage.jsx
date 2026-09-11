import { useState } from 'react'
import {useAuth} from '../../hooks/useAuth'

export default function AuthPage() {
// Logica 
    const { loginUser, newUser, logout, user, loading, error } = useAuth()

    const [isLogin, setIsLogin] = useState(true)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({...prev, [name]: value}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(isLogin){
            await loginUser(formData)
            return
        }

        await newUser(formData)
    }

    // Render

    const categories = [
  { icon: '🐾', label: 'Pet\nFriendly' },
  { icon: '♿', label: 'Accesibilidad' },
  { icon: '💆', label: 'Spa' },
  { icon: '🏋️', label: 'Gym' },
  { icon: '📶', label: 'Wiffi' },
  { icon: '📺', label: 'Tv' },
  { icon: '❄️', label: 'Climatización' },
  { icon: '🚿', label: 'Baño\nPrivado' },
  { icon: '🍳', label: 'Desayuno\nIncluido' },
  { icon: '👕', label: 'Lavanderia' },
  { icon: '🅿️', label: 'Parqueadero' },
  { icon: '⛰️', label: 'Montaña' },
  { icon: '🌇', label: 'Balcón' },
  { icon: '🏊', label: 'Piscina' },
  { icon: '🌿', label: 'Jardín' },
];

const sections = [
  { title: 'Más Populares:', images: ['/images/popular1.jpg', '/images/popular2.jpg', '/images/popular3.jpg', '/images/popular4.jpg'] },
  { title: 'Chalets con encanto:', images: ['/images/chalet1.jpg', '/images/chalet2.jpg', '/images/chalet3.jpg', '/images/chalet4.jpg'] },
  { title: 'Estilo tradicional:', images: ['/images/trad1.jpg', '/images/trad2.jpg', '/images/trad3.jpg', '/images/trad4.jpg'] },
];

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
            <label>
              Correo electrónico
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="tu@email.com"
              />
            </label>

            <label>
              Contraseña
              <input
                type="password"
                name="password"
                value={form.password}
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
export default function Home() {
  return (
    <div className="home">
      <Header />
      <Menu />
      <CategoriesBar />
      <DateSelector />
      <HeroImage />
      {sections.map((section) => (
        <FilterSection
          key={section.title}
          title={section.title}
          images={section.images}
        />
      ))}
      <CTASection />
    </div>
  );
}