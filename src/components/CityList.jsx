import style from "./CityList.module.css"
import Spinner from "./Spinner.jsx";
import CityItem from "./CityItem.jsx";
import Message from "./Message.jsx";
import {useCities} from "../context/CitiesContext.jsx";

function CityList() {
    const {cities, isLoading} = useCities();

    if (isLoading) return <Spinner/>

    if (!cities.length) return <Message message={"Add your first city by clicking on a city on the map."}/>

    return (
        <ul className={style.cityList}>

            {cities.map(city => <CityItem city={city} key={city.id}/>)}
        </ul>
    );
}

export default CityList;