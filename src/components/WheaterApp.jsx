import { useState } from "react";
import { useFech } from "../hooks/useFech";
import "../styles/WheaterApp.css";
import { Infocity } from "./Infocity.jsx";

// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
const APIGEOLOCALIZZACION = "http://api.openweathermap.org/geo/1.0/direct?";

const KEY = "9d08ad7cb67b71a80586b0cb1d005096";

export const WheaterApp = () => {
  const [ciudad, setCiudad] = useState("");
  const [url, setUrl] = useState("");
  const { data } = useFech(url);

  const searchCity = (event) => {
    event.preventDefault();
    if (!ciudad) return;
    setUrl(`${APIGEOLOCALIZZACION}q=${ciudad}&limit=5&appid=${KEY}`);
    setCiudad("");
  };

  const handleCambioCiudad = (event) => {
    setCiudad(event.target.value);
  };
  return (
    <>
      <div className="contenedor-principal">
        <div className="contenedor-titulo">BUSCA EL CLIMA DE TU CIUDAD</div>
        <form onSubmit={searchCity} className="for-ciudad">
          <div className="contenedor-busqueda">
            <input
              type="text"
              className="form-control"
              name="serchCity"
              aria-describedby="emailHelp"
              placeholder="Ingrese la ciudad"
              value={ciudad}
              onChange={handleCambioCiudad}
            />
            <button type="submit" className="btn btn-primary">
              Buscar
            </button>
          </div>
        </form>
        <div className="contenedor-resultados">
          {data &&
            data.map((city, index) => (
              <Infocity
                key={index}
                name={city.name}
                lat={city.lat}
                lon={city.lon}
                country={city.country}
                state={city.state}
              ></Infocity>
            ))}
        </div>
      </div>
    </>
  );
};
