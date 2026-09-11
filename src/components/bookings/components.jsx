import React, { useState } from 'react';
import '../../pages/bookings/Home.css';

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
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="¿Buscas un rincón acogedor?"
        className="search-input"
      />
      <button className="search-icon" aria-label="Buscar">
        <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
          <circle cx="7" cy="7" r="6" stroke="#141414" strokeWidth="2" />
          <line x1="11.5" y1="11.5" x2="16" y2="16" stroke="#141414" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}

export function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <h1 className="logo">Mangoa.</h1>
          <SearchBar />
        </div>
        <div className="header-actions">
          <ButtonContraste>Inicio de Sesión.</ButtonContraste>
          <ButtonContraste>Registro.</ButtonContraste>
        </div>
      </div>
    </header>
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
  return (
    <div className="date-selector">
      <span className="date-label">Cuándo llegas y cuándo te despedimos</span>
      <div className="date-controls">
        <button className="date-btn">
          Llegada
          <ChevronDown />
        </button>
        <button className="date-btn">
          Salida
          <ChevronDown />
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