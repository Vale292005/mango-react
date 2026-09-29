import { useEffect, useState } from "react"
import { Header, Menu, DateSelector, NumberSelector, TarjetaAlojamiento, PriceSelector, LocationSelector } from "../../components/bookings/components"
import { getAccommodations } from "../../services/accommodationService";
import '../list/ListaHospedajes.css';

export default function ListaHospedajes() {
  const vacio = [{}, {}];
  const [accommodations, setAccommodations] = useState([]);

  const [filteredAccommodations, setFilteredAccommodations] = useState([]);
  const [availableLocations, setAvailableLocations] = useState([]);
  const [availablePrices, setAvailablePrices] = useState([])

  const [cantHuespedes, setCantHuespedes] = useState(2);
  const [precioMax, setPrecioMax] = useState(1000);
  const [location, setLocation] = useState("");


  useEffect(() => {
    const fetchInitialLocations = async () => {
      try {
        const response = await getAccommodations('', 0, 9999999);
        const data = response?.content || [];

        const listaUbicaciones = [...new Set(data.map(item => item.location).filter(Boolean))];
        setAvailableLocations(listaUbicaciones);

        const listaPrices = [...new Set(data.map(item => item.price).filter(Boolean))];
        listaPrices.sort((a,b)=>a-b);
        setAvailablePrices(listaPrices);

      } catch (error) {
        console.error("Error al obtener las ubicaciones:", error);
      }
    };

    fetchInitialLocations();
  }, []);

  useEffect(() => {
    const localData = async () => {
      try {
        const response = await getAccommodations(location, cantHuespedes, precioMax);
        const data = response?.content || [];
        setFilteredAccommodations(data);
      } catch (error) {
        console.error("Error al obtener hospedajes:", error);
      }
    };

    localData();
  }, [cantHuespedes, precioMax, location]);

  return (
    <div className="home">
      <Header />
      <Menu />
      <div className="date-selectors">
        <LocationSelector value={location} onChange={(newLocation)=> setLocation(newLocation)} locations={availableLocations}></LocationSelector>
        <PriceSelector value={precioMax} onChange={(newPrice)=> setPrecioMax(newPrice)} minPrice={availablePrices[0]} maxPrice={availablePrices[-1]}></PriceSelector>
        <NumberSelector value={cantHuespedes} onChange={(nuevoValor) => setCantHuespedes(nuevoValor)} />
      </div>
      <div className="alojamientos">
        <TarjetaAlojamiento accommodations={filteredAccommodations} categoriasFiltradas={vacio} />
      </div>
    </div>
  )
};