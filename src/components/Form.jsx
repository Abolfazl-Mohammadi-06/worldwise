// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import {useEffect, useState} from "react";

import styles from "./Form.module.css";
import Button from "./Button.jsx";
import BackButton from "./BackButton.jsx";
import {useUrlPosition} from "../hooks/useUrlPosition.js";
import Message from "./Message.jsx";
import Spinner from "./Spinner.jsx";
import DatePicker from "react-datepicker";


import "react-datepicker/dist/react-datepicker.css";
import {useCities} from "../context/CitiesContext.jsx";
import {useNavigate} from "react-router-dom";
// export function convertToEmoji(countryCode) {
//     const codePoints = countryCode
//         .toUpperCase()
//         .split("")
//         .map((char) => 127397 + char.charCodeAt());
//     return String.fromCodePoint(...codePoints);
// }

export function convertToEmoji(countryCode) {
    return `https://flagcdn.com/${countryCode}.svg`
}


const BASE_URL = "https://us1.locationiq.com/v1/reverse?key=pk.844b565a2902d4af6706a7a70aed89e4"

// "&lat=51.50344025&lon=-0.12770820958562096&format=json&"

function Form() {
    const [lat, lng] = useUrlPosition();

    const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
    const [cityName, setCityName] = useState("");
    const [country, setCountry] = useState("");
    const [date, setDate] = useState(new Date());
    const [notes, setNotes] = useState("");
    const [emoji, setEmoji] = useState("");
    const [geocodingError, setGeocodingError] = useState("");
    const navigate = useNavigate();

    const {createCity, isLoading} = useCities()


    useEffect(function () {
        if (!lat && !lng) return;

        async function fetchCityData() {
            try {
                setGeocodingError("")
                setIsLoadingGeocoding(true);
                const res = await fetch(`${BASE_URL}&lat=${lat}&lon=${lng}&format=json&`);
                const data = await res.json();

                const city = data.address.city ? data.address.city : data.address.state;

                const MyConutry = data.address.country || data.address.state;


                if (!data) throw new Error("click some where else and please don't click on sea's")
                setEmoji(data.address.country_code)
                setCityName(city);
                setCountry(MyConutry)


            } catch (err) {
                setGeocodingError(err.message);
                console.error(geocodingError)
            } finally {
                setIsLoadingGeocoding(false);
            }

        }

        fetchCityData()
    }, [lat, lng])


    async function handleSubmit(e) {
        e.preventDefault();

        if (!cityName || !date) return;
        const newCity = {
            cityName,
            country,
            emoji: `${convertToEmoji(emoji)}`,
            date,
            notes,
            position: {lat, lng},

        }
        await createCity(newCity)
        navigate('/app/cities')

    }

    if (isLoadingGeocoding) return <Spinner/>
    if (!lat && !lng) return <Message message="Start by clicking somewhere on the map :)"/>
    if (geocodingError) return <Message message={geocodingError}/>

    return (
        <form className={`${styles.form} ${isLoading ? styles.loading : ""}`} onSubmit={handleSubmit}>
            <div className={styles.row}>
                <label htmlFor="cityName">City name</label>
                <input
                    id="cityName"
                    onChange={(e) => setCityName(e.target.value)}
                    value={cityName}
                />
                {/* <span className={styles.flag}>{emoji}</span> */}
                <span className={styles.flag}><img src={convertToEmoji(emoji)} alt={country} width={24}/></span>
            </div>

            <div className={styles.row}>
                <label htmlFor="date">When did you go to {cityName}?</label>
                {/*<input*/}
                {/*    id="date"*/}
                {/*    onChange={(e) => setDate(e.target.value)}*/}
                {/*    value={date}*/}
                {/*/>*/}
                <DatePicker dateFormat="dd/MM/yyyy" selected={date} onChange={(e) => setDate(e)}/>
            </div>

            <div className={styles.row}>
                <label htmlFor="notes">Notes about your trip to {cityName}</label>
                <textarea
                    id="notes"
                    onChange={(e) => setNotes(e.target.value)}
                    value={notes}
                />
            </div>

            <div className={styles.buttons}>
                <Button type="primary">Add</Button>
                <BackButton/>
                {/*<button>&larr; Back</button>*/}
            </div>
        </form>
    );
}

export default Form;
