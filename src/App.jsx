import BookingPage from './pages/bookings/BookingPage'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

function HomePage() {
  return <BookingPage />
}

function LoginPage() {
  return <h1>Login Page</h1>
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
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/booking" element={<BookingPage />} />
      </Routes>
    </BrowserRouter>
  )
}
