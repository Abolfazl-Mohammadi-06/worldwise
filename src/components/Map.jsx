import style from "./Map.module.css";
import {useNavigate, useSearchParams} from "react-router-dom";
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import {useState} from "react";
import {useCities} from "../context/CitiesContext.jsx";

function Map() {
    const navigate = useNavigate()
    const {cities} = useCities();
    const [mapPosition, setMapPosition] = useState([40, 0])

    const [searchParams, setSearchParams] = useSearchParams()

    const lat = searchParams.get("lat")
    const lng = searchParams.get("lng")

    return (
        <div className={style.mapContainer}>
            <MapContainer center={mapPosition} zoom={13} className={style.map} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {cities.map(city => (<Marker position={[city.position.lat, city.position.lng]} key={city.id}>
                        <Popup>
                            <img src={city.emoji} alt={city.cityName} width={17}/><span>{city.cityName}</span>
                        </Popup>
                    </Marker>)
                )
                }

            </MapContainer>
        </div>
    )
}

export default Map;