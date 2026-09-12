import { useState } from 'react'
import { useBookings } from '../../hooks/useBookings'
import { Header, Menu, CategoriesBar, DateSelector, HeroImage, FilterSection, CTASection, NumberSelector } from '../../components/bookings/components.jsx'

const sections = [
  {
    title: 'Más Populares:',
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80',
    ],
  },
  {
    title: 'Chalets con encanto:',
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=900&q=80',
    ],
  },
  {
    title: 'Estilo tradicional:',
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=900&q=80',
    ],
  },
]

export default function BookingPage() {

  const { bookings, loading, error, saveBooking } = useBookings(1)
  const [form, setForm] = useState({
    hotelId: 1,
    checkIn: '',
    checkOut: '',
    guest: 2,
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await saveBooking(form)
      alert('Booking created successfully!')
    } catch (error) {
      alert('Error creating booking: ' + error.message)
    }
  }

  return (
    <div className="home">
      <Header />
      <Menu />
      <CategoriesBar />
      <div className="date-selectors">
        <DateSelector />
        <NumberSelector />
      </div>
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
  )
}