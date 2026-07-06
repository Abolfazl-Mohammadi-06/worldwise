import {BrowserRouter, Route, Routes} from "react-router-dom";
import Product from "./pages/Product.jsx";
import Pricing from "./pages/Pricing.jsx";
import Homepage from "./pages/Homepage.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import Login from "./pages/Login.jsx";
import CityList from "./components/CityList.jsx";
import {useEffect, useState} from "react";
import CountriesList from "./components/CountriesList.jsx";

const BASE_URL = "http://localhost:9000";
export default function App() {

    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(function () {
        async function fetchCities() {
            try {
                setIsLoading(true);
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                setCities(data);
            } catch {
                alert("Failed to fetch cities.");
            } finally {
                setIsLoading(false);
            }
        }

        fetchCities();
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Homepage/>}/>
                <Route path="product" element={<Product/>}/>
                <Route path="Pricing" element={<Pricing/>}/>
                <Route path="login" element={<Login/>}/>

                <Route path="app" element={<AppLayout/>}>
                    <Route index element={<CityList cities={cities} isLoading={isLoading}/>}/>
                    <Route index path="cities" element={<CityList cities={cities} isLoading={isLoading}/>}/>
                    <Route path="countries" element={<CountriesList cities={cities} isLoading={isLoading}/>}/>
                    <Route path="form" element={<p>Form</p>}/>
                </Route>

                <Route path="*" element={<PageNotFound/>}/>
            </Routes>
        </BrowserRouter>
    );
}
//E12