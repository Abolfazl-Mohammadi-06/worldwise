import style from "./CityList.module.css"
import Spinner from "./Spinner.jsx";
import CityItem from "./CityItem.jsx";

function CityList({cities, isLoading}) {
    if (isLoading) return <Spinner/>
    return (<ul className={style.cityList}>
        {cities.map(city => <CityItem city={city} key={city.id}/>)}
    </ul>);
}

export default CityList;