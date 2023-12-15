import { useEffect,useState } from "react";
import { useFech } from "../hooks/useFech";
import PropTypes from "prop-types";

// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
const APITEMPERATURE = "https://api.openweathermap.org/data/2.5/weather?";
const KEY = "9d08ad7cb67b71a80586b0cb1d005096";

export const Infocity = ({ name, lat, lon, country, state }) => {
  const { data, isLoading, errors } = useFech(
    `${APITEMPERATURE}lat=${lat}&lon=${lon}&appid=${KEY}`
  );

  const [infoPais, setInfoPais] = useState();

  useEffect(() => {
    const getInfoPais = async () => {
      try {
        const response = await fetch(
          `https://restcountries.com/v2/alpha/${country}`
        );
        const datos = await response.json();
        if(response.ok){
          setInfoPais(datos);
        }else{
          console.log("No hay datos")
        }
      } catch (error) {
        console.log(`errror: ${error}`)
      }
    };
    getInfoPais();
  }, [country]);

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  if (errors) {
    return <p>Error al cargar la información.</p>;
  }

  if (!data) {
    return null;
  }

  return (
    <>
      {data && (
        <div className="contenedor-ciudad">
          <h1>{name}</h1>
          <div className="info-ciudad">
            <p>
              pais: {infoPais.name} <img className="bandera-pais" src={infoPais.flags.svg} alt="" />
              {state ? " | " + state : ""}
            </p>
          </div>
          <div className="contenedor-informacion">
            <div className="contenedor-clima">
              <p className="informacion">
                Temperatura: {parseInt(data.main.temp) - 272}°C
              </p>
              <p className="informacion">Humedad: {data.main.humidity}</p>
              <p className="informacion">
                Descripacion: {data.weather[0].description}
              </p>
            </div>
            <img className="logo-image"
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              alt=""
            />
          </div>
        </div>
      )}
    </>
  );
};

Infocity.propTypes = {
  name: PropTypes.string.isRequired,
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
  country: PropTypes.string.isRequired,
  state: PropTypes.string,
};
