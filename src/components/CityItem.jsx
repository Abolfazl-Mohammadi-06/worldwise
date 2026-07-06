import style from './CityItem.module.css';


const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",

    }).format(new Date(date));


function CityItem({city}) {
    const {cityName, emoji, date} = city;
    return (
        <li className={style.cityItem}>
            {/*<span className={style.emoji}>{emoji}</span>*/}
            <img src={emoji} alt={cityName} width={20}/>
            <h3 className={style.name}>{cityName}</h3>
            <time className={style.date}>({formatDate(date)})</time>
            <button className={style.deleteBtn}>&times;</button>
        </li>
    )
}

export default CityItem;