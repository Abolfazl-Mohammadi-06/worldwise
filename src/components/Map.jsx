import style from "./Map.module.css";
import {useNavigate, useSearchParams} from "react-router-dom";
import {MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents} from "react-leaflet";
import {useEffect, useState} from "react";
import {useCities} from "../context/CitiesContext.jsx";
import {useGeolocation} from "../hooks/useGeolocation.jsx";
import Button from "./Button.jsx";

function Map() {
    const {cities} = useCities();
    const [mapPosition, setMapPosition] = useState([40, 0])
    const [searchParams] = useSearchParams()
    const {
        isLoading: isLoadingPosition,
        position: geoLocationPosition,
        getPosition,
    } = useGeolocation()

    const mapLat = searchParams.get("lat")
    const mapLng = searchParams.get("lng")

    useEffect(function () {
        if (mapLng && mapLng) setMapPosition([mapLat, mapLng])
    }, [mapLat, mapLng])

    useEffect(function () {
        if (geoLocationPosition) setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng])
    }, [geoLocationPosition]);

    return (
        <div className={style.mapContainer}>
            {!geoLocationPosition && <Button type="position"
                                             onClick={getPosition}>{isLoadingPosition ? "Loading...." : "Use your position"}
            </Button>}
            <MapContainer
                center={mapLat && mapLng ? [Number(mapLat), Number(mapLng)] : mapPosition}
                // center={mapPosition}
                zoom={6} className={style.map} scrollWheelZoom={true}>
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
                <ChangeCenter Position={mapLat && mapLng ? [Number(mapLat), Number(mapLng)] : mapPosition}/>
                <DetectClick/>
            </MapContainer>
        </div>
    )
}

function ChangeCenter({Position}) {
    const map = useMap();
    map.setView(Position);
    return null;
}

function DetectClick() {

    const navigate = useNavigate()
    useMapEvents({
        click: e => {

            navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
        }
    })
}

export default Map;