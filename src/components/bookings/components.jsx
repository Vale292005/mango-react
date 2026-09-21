import React, { useEffect, useEffectEvent, useRef, useState } from 'react';
import { Sidebar } from '../layout/sideBar';
import '../../pages/bookings/Home.css';
import { useNavigation } from '../../hooks/useNavigation';
import { useBookings } from '../../hooks/useBookings';

// ============ DATOS ============
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

// ============ COMPONENTES ============

export function ButtonContraste({ children, onClick }) {
  return (
    <button className="btn-contraste" onClick={onClick}>
      {children}
    </button>
  );
}


export function SearchBar() {
  const { bookings = [], getBookings } = useBookings();
  const [localBookings, setLocalBookings] = useState([]);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showList, setShowList] = useState(false);

  // 1. Cargar las reservas al montar el componente (intentando traer un tamaño amplio si lo soporta tu API)
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      if (!getBookings) return;
      try {
        // Si tu API acepta parámetros de paginación, pide un tamaño grande para poder filtrar en cliente:
        const data = await getBookings({ page: 0, size: 1000 });
        if (mounted && data) {
          setLocalBookings(data);
        }
      } catch (err) {
        console.error("Error al cargar bookings:", err);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  // 2. Filtrado local inteligente
  useEffect(() => {
    if (query.length < 1) {
      setSuggestions([]);
      setShowList(false);
      return;
    }

    const q = query.trim().toLowerCase();
    const id = setTimeout(() => {
      let rawSource = localBookings.length > 0 ? localBookings : (bookings || []);

      // Extraemos el array del objeto paginado de Spring Boot (.content) o usamos rawSource si ya es un array
      const source = Array.isArray(rawSource)
        ? rawSource
        : (rawSource.content || rawSource.data || []);

      if (!Array.isArray(source) || source.length === 0) {
        setSuggestions([]);
        return;
      }

      const results = source.filter((b) => {
        if (!b) return false;

        // Adaptado tanto para Objetos JSON como para Arrays/Tuplas por si cambias el backend
        const accommodationName = String(b.accommodationName || b[4] || '').toLowerCase();
        const userName = String(b.userName || b[2] || '').toLowerCase();
        const status = String(b.status || b[8] || '').toLowerCase();

        return (
          accommodationName.includes(q) ||
          userName.includes(q) ||
          status.includes(q)
        );
      }).slice(0, 6);

      setSuggestions(results);
      setShowList(true);
    }, 300);

    return () => clearTimeout(id);
  }, [query, localBookings, bookings]);

  const handleSelect = (item) => {
    setQuery(item.accommodationName || item[4] || '');
    setShowList(false);
  };

  return (
    <div className="search-bar" style={{ position: 'relative' }}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => { if (suggestions.length) setShowList(true); }}
        placeholder="Busca por alojamiento, usuario o estado..."
        className="search-input"
        aria-label="Buscar reservas"
      />
      <button className="search-icon" aria-label="Buscar">
        <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
          <circle cx="7" cy="7" r="6" stroke="#141414" strokeWidth="2" />
          <line x1="11.5" y1="11.5" x2="16" y2="16" stroke="#141414" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      {showList && suggestions.length > 0 && (
        <ul className="search-suggestions" style={{ position: 'absolute', top: '110%', left: 0, right: 0, background: '#fff', zIndex: 1500, listStyle: 'none', margin: 0, padding: '8px 0', boxShadow: '0 6px 18px rgba(0,0,0,0.12)', borderRadius: 6 }}>
          {suggestions.map((s, i) => (
            <li key={i} onMouseDown={() => handleSelect(s)} style={{ padding: '8px 12px', cursor: 'pointer', borderBottom: '1px solid #f0f0f0' }}>
              <div style={{ fontWeight: '500' }}>{s.accommodationName || s[4]}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function Header() {
  const { navigateTo } = useNavigation();
  const estaLogueado = localStorage.getItem('token') !== null;
  console.log(localStorage.getItem('item'))
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  return (
    <>
      <header className="header">
        <div className="header-content">
          <div className="header-left">
            <img className='logo' src='src/assets/logo.png' onClick={() => setSidebarOpen(true)} alt="Logo" />
            <SearchBar />
          </div>
          <div className="header-actions">
            {estaLogueado !== null && (
              <>
                <ButtonContraste onClick={() => navigateTo('/login')}>Inicio de Sesión.</ButtonContraste>
                <ButtonContraste onClick={() => navigateTo('/register')}>Registro.</ButtonContraste>
              </>
            )}
          </div>
        </div>
      </header>
      <Sidebar isSideBarOpen={isSidebarOpen} setSideBarOpen={setSidebarOpen} />
    </>
  );
}

export function Menu() {
  const items = ['Menú', 'Alojamientos', 'Panel Personal'];
  return (
    <nav className="menu">
      {items.map((item) => (
        <a key={item} href="#" className="menu-item">
          {item}
        </a>
      ))}
    </nav>
  );
}

export function CategoryIcon({ icon, label }) {
  return (
    <div className="category-item">
      <div className="category-icon">{icon}</div>
      <span className="category-label">{label}</span>
    </div>
  );
}

export function CategoriesBar() {
  return (
    <div className="categories-bar">
      {categories.map((cat) => (
        <CategoryIcon key={cat.label} icon={cat.icon} label={cat.label} />
      ))}
    </div>
  );
}

export function DateSelector() {
  const [arrival, setArrival] = useState('');
  const [departure, setDeparture] = useState('');

  const arrivalInputRef = useRef(null);
  const departureInputRef = useRef(null);

  const openCalendar = (ref) => {
    if (ref.current) {
      if (typeof ref.current.showPicker === 'function') {
        ref.current.showPicker();
      } else {
        ref.current.click();
      }
    }
  };

  return (
    <div className="date-selector">
      <span className="date-label">Cuándo llegas y cuándo te despedimos</span>

      <div className="date-controls">
        <button
          type="button"
          className="date-btn"
          onClick={() => openCalendar(arrivalInputRef)}
        >
          <span>{arrival ? arrival : 'Llegada'}</span>
          <ChevronDown />
          <input
            ref={arrivalInputRef}
            type="date"
            value={arrival}
            onChange={(e) => setArrival(e.target.value)}
            aria-label="Fecha de llegada"
            style={{
              position: 'absolute',
              opacity: 0,
              width: 1,
              height: 1,
              pointerEvents: 'none',
            }}
          />
        </button>

        <button
          type="button"
          className="date-btn"
          onClick={() => openCalendar(departureInputRef)}
        >
          <span>{departure ? departure : 'Salida'}</span>
          <ChevronDown />
          <input
            ref={departureInputRef}
            type="date"
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
            aria-label="Fecha de salida"
            style={{
              position: 'absolute',
              opacity: 0,
              width: 1,
              height: 1,
              pointerEvents: 'none',
            }}
          />
        </button>
      </div>
    </div>
  );
}



export function ChevronDown() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M4 6L8 10L12 6" stroke="#141414" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function HeroImage() {
  return (
    <div className="hero-image">
      <a
        href="https://media-cdn.tripadvisor.com/media/photo-s/16/1a/ea/54/hotel-presidente-4s.jpg"
        target="_blank"
        rel="noreferrer"
      >
        <img
          src="https://media-cdn.tripadvisor.com/media/photo-s/16/1a/ea/54/hotel-presidente-4s.jpg"
          alt="Imagen principal"
          className="hero-img"
        />
      </a>
    </div>
  )
}

export function ImageCarousel({ images }) {
  return (
    <div className="carousel">
      {images.map((img, i) => (
        <div key={i} className="carousel-card">
          <img src={img} alt={`Alojamiento ${i + 1}`} />
        </div>
      ))}
    </div>
  );
}

export function FilterSection({ title, images }) {
  return (
    <section className="filter-section">
      <div className="section-title-bar">
        <h2 className="section-title">{title}</h2>
      </div>
      <ImageCarousel images={images} />
    </section>
  );
}

export function CTASection() {
  return (
    <section className="cta-section">
      <h2 className="cta-title">Únete a nuestra comunidad de anfitriones</h2>
      <p className="cta-description">
        Únete a nuestra comunidad de anfitriones. Comparte tu espacio, conecta
        con viajeros de todo el mundo y genera ingresos. En nuestra plataforma
        te damos visibilidad, apoyo personalizado, herramientas para que tu
        alojamiento destaque y disfruta de los beneficios.
      </p>
      <ButtonContraste>Quiero ser parte.</ButtonContraste>
    </section>
  );
}


export function NumberSelector() {
  const [guest, setGuest] = useState(2);
  const min = 1;
  const max = 10;

  const aumentar = () => {
    if (guest < max) {
      setGuest((prev) => prev + 1);
    }
  }

  const disminuir = () => {
    if (guest > min) {
      setGuest((prev) => prev - 1);
    }
  }

  return (
    <div className="date-selector">
      <span className="date-label">Huéspedes</span>

      <div className="date-controls">
        <button
          type="button"
          className="number-btn"
          onClick={disminuir}
        >
          <span>-</span>
        </button>

        <span className="date-label">{guest}</span>

        <button
          type="button"
          className="number-btn"
          onClick={aumentar}
        >
          <span>+</span>
        </button>
      </div>
    </div>
  );
}