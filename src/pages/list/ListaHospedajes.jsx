import { useEffect, useState } from "react"
import { Header, Menu, DateSelector, NumberSelector, TarjetaAlojamiento } from "../../components/bookings/components"
import { getAccommodations } from "../../services/accommodationService";
import '../list/ListaHospedajes.css';

export default function ListaHospedajes() {
  const vacio = [{}, {}];
  const [accommodations, setAccommodations] = useState([]);
  const [filteredAccommodations, setFilteredAccommodations] = useState([]);
  const [cantHuespedes, setCantHuespedes] = useState(2);


useEffect(() => {
  const localData = async () => {
    try {
      // Llamas a tu servicio existente pasando los valores requeridos
      const response = await getAccommodations('', cantHuespedes, 9999999);
      const data = response?.content || [];

      setFilteredAccommodations(data);
    } catch (error) {
      console.error("Error al obtener hospedajes:", error);
    }
  };

  localData();
}, [cantHuespedes]);

  return (
    <div className="home">
      <Header />
      <Menu />
      <div className="date-selectors">
        <NumberSelector value={cantHuespedes} onChange={(nuevoValor) => setCantHuespedes(nuevoValor)}/>
      </div>
      <div className="alojamientos">
        <TarjetaAlojamiento accommodations={filteredAccommodations} categoriasFiltradas={vacio} />
      </div>
    </div>
  )
};