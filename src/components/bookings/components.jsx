import React, { useEffect, useEffectEvent, useRef, useState } from 'react';
import { Sidebar } from '../layout/sideBar';
import '../../pages/bookings/Home.css';
import { useNavigation } from '../../hooks/useNavigation';
import { useBookings } from '../../hooks/useBookings';
import { useAccommodations } from '../../hooks/useAccommodations';
import { getAccommodationsById } from '../../services/accommodationService';

// ============ DATOS ============
const categories = [
  { icon: '🐾', label: 'Pet Friendly', key: 'PET_FRIENDLY' },
  { icon: '♿', label: 'Accesibilidad', key: 'ACCESIBILIDAD' },
  { icon: '💆', label: 'Spa', key: 'SPA' },
  { icon: '🏋️', label: 'Gym', key: 'GYM' },
  { icon: '📶', label: 'Wiffi', key: 'WIFI' },
  { icon: '📺', label: 'Tv', key: 'TV' },
  { icon: '❄️', label: 'Climatización', key: 'CLIMATIZACION' },
  { icon: '🚿', label: 'Baño Privado', key: 'BANIO_PRIVADO' },
  { icon: '🍳', label: 'Desayuno Incluido', key: 'DESAYUNO_INCLUIDO' },
  { icon: '👕', label: 'Lavanderia', key: 'LAVANDERIA' },
  { icon: '🅿️', label: 'Parqueadero', key: 'PARQUEADERO' },
  { icon: '⛰️', label: 'Montaña', key: 'MONTANIA' },
  { icon: '🌇', label: 'Balcón', key: 'BALCON' },
  { icon: '🏊', label: 'Piscina', key: 'PISCINA' },
  { icon: '🌿', label: 'Jardín', key: 'JARDIN' },
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
  const { accommodations = [], getAccommodations } = useAccommodations();
  const [localAccommodations, setLocalAccommodations] = useState([]);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showList, setShowList] = useState(false);

  // 1. Cargar los alojamientos al montar el componente (sin enviar objetos extraños)
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      if (!getAccommodations) return;
      try {
        // Llamamos sin parámetros para que traiga todos los alojamientos activos
        const data = await getAccommodations();
        if (mounted && data) {
          // Extraemos el array ya sea que venga plano o paginado (.content)
          const items = Array.isArray(data) ? data : (data.content || []);
          setLocalAccommodations(items);
        }
      } catch (err) {
        console.error("Error al cargar los alojamientos:", err);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  // 2. Filtrado local inteligente basado en las propiedades reales del Alojamiento
  useEffect(() => {
    if (query.trim().length < 1) {
      setSuggestions([]);
      setShowList(false);
      return;
    }

    const q = query.trim().toLowerCase();
    const id = setTimeout(() => {
      const source = localAccommodations.length > 0 ? localAccommodations : (accommodations || []);

      if (!Array.isArray(source) || source.length === 0) {
        setSuggestions([]);
        return;
      }

      const results = source.filter((item) => {
        if (!item) return false;

        // Propiedades reales de tu entidad Accommodation
        const name = String(item.name || '').toLowerCase();
        const location = String(item.location || '').toLowerCase();
        const description = String(item.description || '').toLowerCase();

        return (
          name.includes(q) ||
          location.includes(q) ||
          description.includes(q)
        );
      }).slice(0, 6);

      setSuggestions(results);
      setShowList(true);
    }, 300);

    return () => clearTimeout(id);
  }, [query, localAccommodations, accommodations]);

  const handleSelect = (item) => {
    setQuery(item.name || '');
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
            <li key={s.id || i} onMouseDown={() => handleSelect(s)} style={{ padding: '8px 12px', cursor: 'pointer', borderBottom: '1px solid #f0f0f0' }}>
              {/* Cambiamos accommodationName por s.name y agregamos la ubicación */}
              <div style={{ fontWeight: '500' }}>{s.name}</div>
              <div style={{ fontSize: '12px', color: '#666' }}>{s.location}</div>
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

export function ExplorePage({ onFilterChange }) {
  const { accommodations = [], getAccommodations } = useAccommodations();
  const [localAccommodations, setLocalAccommodations] = useState([]); // Corregido: usaba useAccommodations mal
  const [filteredAccommodations, setFilteredAccommodations] = useState([]); // Corregido el nombre en plural
  const [selectedFilters, setSelectedFilters] = useState([]);

  useEffect(() => {
    const localData = async () => {
      try {
        const response = await getAccommodations();
        const data = response?.content || [];
        setLocalAccommodations(data);
        setFilteredAccommodations(data);
      } catch (error) {
        console.error("Error al cargar los alojamientos", error);
      }
    };
    localData();
  }, []);

  const handleToggleFilter = (key) => {
    setSelectedFilters((prevFilters) => {
      if (prevFilters.includes(key)) {
        return prevFilters.filter((f) => f !== key);
      } else {
        return [...prevFilters, key];
      }
    });
  };

useEffect(() => {
  const result = selectedFilters.length === 0 
    ? [] 
    : localAccommodations.filter((acc) =>
        selectedFilters.every((filter) => acc.caracteristicas?.includes(filter))
      );

  setFilteredAccommodations(result);

  // Verificamos que sea una función antes de invocarla pasándole el objeto
  if (typeof onFilterChange === 'function') {
    onFilterChange({
      results: result,
      hasActiveFilters: selectedFilters.length > 0
    });
  }
}, [selectedFilters, localAccommodations, onFilterChange]);

  return (
    <div className="explore-container">
      {/* Le pasamos la función para cambiar filtros a la barra */}
      <CategoriesBar
        selectedFilters={selectedFilters}
        onToggleFilter={handleToggleFilter}
        categorias={categories}
      />

      {/* AQUÍ ESTÁ LA CLAVE: Le pasamos el valor (filteredAccommodations) 
          a otro componente hijo para que lo pinte */}
      <TarjetaAlojamiento accommodations={filteredAccommodations} categoriasFiltradas={selectedFilters}/>
    </div>
  );
}


export function CategoriesBar({ selectedFilters, onToggleFilter, categorias }) {
  return (
    <div className="categories-bar">
      {categorias.map((cat) => {
        const isSelected = selectedFilters.includes(cat.key);

        return (
          <div
            key={cat.key}
            className="category-item"
            onClick={() => onToggleFilter(cat.key)}
            style={{ cursor: 'pointer', background: 'transparent', border: 'none' }}
          >
            {/* El círculo amarillo que cambia a negro si está seleccionado */}
            <div
              className="category-icon"
              style={{
                backgroundColor: isSelected ? '#141414' : '#fdbe02', // Pasa de amarillo a negro
                color: isSelected ? '#ffffff' : '#141414',           // Cambia el color del icono si es necesario
                transition: 'background-color 0.2s ease'
              }}
            >
              {cat.icon}
            </div>
            <span className="category-label">{cat.label}</span>
          </div>
        );
      })}
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

export function TarjetaAlojamiento({
  accommodations
,categoriasFiltradas }){
  const { navigateTo } = useNavigation();

  if(accommodations.length === 0 && categoriasFiltradas.length > 0){
    return(
      <p>
        No se encontraron hospedajes que coincidan con tu búsqueda.
      </p>
    )
  }
  return (
    <>
      {accommodations.length > 0 &&
        accommodations.map((acc, index) => (
          <article className="tarjeta-alojamiento" key={acc?.id || index}>
            <img
              className="tarjeta-alojamiento__imagen"
              src={acc?.rutaImagenes?.[0] || acc?.rutaImagen}
              alt={`Vista de ${acc?.name}`}
            />

            <div className="tarjeta-alojamiento__contenido">
              <header className="tarjeta-alojamiento__header">
                <h2>{acc?.name}</h2>
              </header>

              <p className="tarjeta-alojamiento__descripcion">
                {acc?.description}
              </p>

              <CategoriesBar
                selectedFilters={acc?.caracteristicas}
                onToggleFilter={() => { }}
                categorias={categories.filter((cat) =>
                  acc?.caracteristicas?.includes(cat.key)
                )}
              />

              <div className="tarjeta-alojamiento__acciones">
                <button type="button" onClick={() => navigateTo('/login')}>
                  Editar
                </button>

                <button type="button" onClick={() => navigateTo('/login')}>
                  Eliminar
                </button>
              </div>
            </div>
          </article>
        ))}
    </>
  );
}