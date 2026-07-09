import style from './CityItem.module.css';
import {Link} from "react-router-dom";
import {useCities} from "../context/CitiesContext.jsx";


const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",

    }).format(new Date(date));


function CityItem({city}) {
    const {currentCity, deleteCity} = useCities();
    const {cityName, emoji, date, id, position} = city;

    function handleClick(e) {
        e.preventDefault();
        deleteCity(id)
    }

    return (
        <li>
            {/*<span className={style.emoji}>{emoji}</span>*/}
            <Link className={`${style.cityItem} ${id === currentCity.id ? style["cityItem--active"] : ""}`}
                  to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
                <img src={emoji} alt={cityName} width={20}/>
                <h3 className={style.name}>{cityName}</h3>
                <time className={style.date}>({formatDate(date)})</time>
                <button className={style.deleteBtn} onClick={handleClick}>&times;</button>
            </Link>
        </li>
    )
}

export default CityItem;