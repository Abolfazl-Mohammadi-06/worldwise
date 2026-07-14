import {lazy, Suspense} from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

import {CitiesProvider} from "./context/CitiesContext.jsx";
import {AuthProvider} from "./context/FakeAuthContext.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";

// import Product from "./pages/Product.jsx";
// import Pricing from "./pages/Pricing.jsx";
// import Homepage from "./pages/Homepage.jsx";
// import Login from "./pages/Login.jsx";
// import AppLayout from "./pages/AppLayout.jsx";
// import PageNotFound from "./pages/PageNotFound.jsx";


import CityList from "./components/CityList.jsx";
import CountriesList from "./components/CountriesList.jsx";
import City from "./components/City.jsx";
import Form from "./components/Form.jsx";
import SpinnerFullPage from "./components/SpinnerFullPage.jsx";

// dist/index.html                   0.42 kB │ gzip:   0.28 kB
// dist/assets/bg-f6f92717.jpg     344.58 kB
// dist/assets/index-7171cdad.css   32.80 kB │ gzip:   5.47 kB
// dist/assets/index-acb61cac.js   521.90 kB │ gzip: 152.06 kB

const Homepage = lazy(() => import("./pages/Homepage.jsx"));
const Product = lazy(() => import("./pages/Product.jsx"));
const Pricing = lazy(() => import("./pages/Pricing.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const AppLayout = lazy(() => import("./pages/AppLayout.jsx"));
const PageNotFound = lazy(() => import("./pages/PageNotFound.jsx"));


export default function App() {


    return (
        <AuthProvider>
            <CitiesProvider>
                <BrowserRouter>
                    <Suspense fallback={<SpinnerFullPage/>}>
                        <Routes>
                            <Route index element={<Homepage/>}/>
                            <Route path="product" element={<Product/>}/>
                            <Route path="Pricing" element={<Pricing/>}/>
                            <Route path="login" element={<Login/>}/>

                            <Route path="app" element={
                                <ProtectedRoute>
                                    <AppLayout/>
                                </ProtectedRoute>
                            }>
                                <Route index element={<Navigate replace to="cities"/>}/>
                                <Route index path="cities" element={<CityList/>}/>
                                <Route path="cities/:id" element={<City/>}/>
                                <Route path="countries" element={<CountriesList/>}/>
                                <Route path="form" element={<Form/>}/>
                            </Route>

                            <Route path="*" element={<PageNotFound/>}/>
                        </Routes>
                    </Suspense> 
                </BrowserRouter>
            </CitiesProvider>
        </AuthProvider>
    );
}
//E20 it is not done. I was in 5:22