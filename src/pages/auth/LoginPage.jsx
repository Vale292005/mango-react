import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { Auth } from './Auth'
import { Header, Menu } from '../../components/bookings/components.jsx'

export default function LoginPage() {
  // Logica 
  const [isLogin, setIsLogin] = useState(false)
  return (
    <>
      <div style={{
        position: 'relative',
        width: '100vw',
        minHeight: '100vh',
        overflowX: 'hidden'
      }}>
        <Header />
        <Menu />
        <div style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          minHeight: '100vh',
          padding: '24px 0',
          boxSizing: 'border-box',
          margin: '0',
          overflow: 'hidden',
          backgroundImage: `url(src/assets/image.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}>
          <Auth isLogin={isLogin} setIsLogin={setIsLogin}></Auth>
        </div>
      </div>
    </>
  )
}