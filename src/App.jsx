import BookingPage from './pages/bookings/BookingPage'
import LoginPage from './pages/auth/LoginPage'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

function HomePage() {
  return <BookingPage />
}

function Auth() {
  return <LoginPage />
}

function RegisterPage() {
  return <h1>Register Page</h1>
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<LoginPage />} />
        <Route path="/booking" element={<BookingPage />} />
      </Routes>
    </BrowserRouter>
  )
}
