import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import { WiStrongWind, WiHumidity } from "react-icons/wi";
import startbild from "./startbild.png";
import { BsSunriseFill, BsSunsetFill } from "react-icons/bs";

function App() {
  const [forecast, setForecast] = useState(null);
  const [forecast5Tage, setForecast5Tage] = useState([]);
  const [letzteStadt, setLetzteStadt] = useState(null);
  const [stadtBild, setStadtBild] = useState(null);

  // async Stadt (unsplash) Bild API
  async function ladeStadtBild(stadt) {
    try {
      const apiKeyUnsplash = import.meta.env.VITE_UNSPLASH_KEY;
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${stadt}&client_id=${apiKeyUnsplash}`
      );
      const daten = await res.json();
      const bildUrl = daten.results[0]?.urls?.regular;
      setStadtBild(bildUrl);
    } catch (err) {
      console.error("Stadtbild konnte nicht gleaden werden", err);
    }
  }

  // async openweather (wetter infos) API
  async function handleSearch(stadt) {
    try {
      const apiKeyOpenweather = import.meta.env.VITE_OPENWEATHER_KEY;
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${stadt}&appid=${apiKeyOpenweather}&units=metric&lang=de`;
      const res = await fetch(url);
      const daten = await res.json();
      setForecast(daten);
      setLetzteStadt(stadt);
      console.log(daten);

      const gefiltert = daten.list.filter((eintrag) =>
        eintrag.dt_txt.includes("12:00:00")
      );
      setForecast5Tage(gefiltert);

      // Stadtbild holen
      await ladeStadtBild(stadt);
    } catch (err) {
      console.error("Fehler, der Stadt wurde nicht gefunden", err);
    }
  }

  useEffect(() => {
    if (!letzteStadt) return;

    const intervall = setInterval(() => {
      handleSearch(letzteStadt); // aktualisiere Forecast + 5 Tage
    }, 3600000); // alle 60 Minuten

    return () => clearInterval(intervall);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [letzteStadt]);

  let iconUrl = null;
  let ersterTag = null;

  if (forecast) {
    ersterTag = forecast.list[0]; // Erster Eintrag der Liste
    const icon = ersterTag.weather[0].icon;
    iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  }

  // Woche, Datum, Monat, Jahr in deutsche Zeit
  const datum = new Date().toLocaleDateString("de-DE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const sunrise = forecast?.city?.sunrise
    ? new Date(forecast.city.sunrise * 1000).toLocaleTimeString("de-DE", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  const sunset = forecast?.city?.sunset
    ? new Date(forecast.city.sunset * 1000).toLocaleTimeString("de-DE", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  // Prüfen forecast
  if (forecast) {
    console.log("Forecast ist da", forecast);
  }

  return (
    <>
      <div className="header">
        <div className="top-row">
          <h1>Wetterkit</h1>
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>
      <div className="haupt-layout">
        {stadtBild && (
          <div className="stadtbild-box">
            <img src={stadtBild} alt="Stadtbild" className="stadtbild" />
          </div>
        )}
        <div className={`wetter-card ${!forecast ? "centered" : ""}`}>
          {!forecast ? (
            <div className="startbild-container">
              <img src={startbild} alt="Startbild" className="startbild" />
            </div>
          ) : (
            <div>
              <h2 className="city-name">{forecast.city.name}</h2>
              <p className="aktuelles-datum">{datum}</p>
              {/* Temperatur */}
              <p className="temp-info">{Math.round(ersterTag.main.temp)}°C</p>
              {/* Feuchtigkeit */}
              <p className="feucht-info">
                <span>
                  <WiHumidity size={30} style={{ color: "white" }} />
                </span>
                {ersterTag.main.humidity}%
              </p>
              {/* Wind stärke */}
              <p className="wind-info">
                <span>
                  <WiStrongWind size={30} style={{ color: "white" }} />
                </span>
                {ersterTag.wind.speed} m/s
              </p>
              {/* openweather icon */}
              <div className="img-container">
                <img className="img" src={iconUrl} alt="Wetter Icon" />
              </div>
              {/* openweather Info */}
              <p className="descrip-info">{ersterTag.weather[0].description}</p>
              <div className="sun-info inside">
                <div className="sun-box-rise">
                  <BsSunriseFill className="sun-icons" />
                  <p>{sunrise}</p>
                </div>
                <div className="sun-box-set">
                  <BsSunsetFill className="sun-icons" />
                  <p>{sunset}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {forecast5Tage.length > 0 && (
        <div className="forecast-wrapper">
          {forecast5Tage.map((tag, index) => {
            const icon = tag.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
            const wochentag = new Date(tag.dt_txt).toLocaleDateString("de-DE", {
              weekday: "short",
            });
            return (
              <div key={index} className="day-card">
                <p className="wochentag">{wochentag}</p>
                <div className="wochen-img-container">
                  <img
                    className="wochen-img"
                    src={iconUrl}
                    alt="Wetter Icon"
                    width={60}
                    height={60}
                  />
                </div>
                <p className="wochentag-temp">{Math.round(tag.main.temp)}°C</p>
                <p className="wochentag-des">{tag.weather[0].description}</p>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default App;
