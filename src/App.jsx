import {lazy, Suspense} from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

import {CitiesProvider} from "./context/CitiesContext.jsx";
import {AuthProvider} from "./context/FakeAuthContext.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";

import CityList from "./components/CityList.jsx";
import CountriesList from "./components/CountriesList.jsx";
import City from "./components/City.jsx";
import Form from "./components/Form.jsx";
import SpinnerFullPage from "./components/SpinnerFullPage.jsx";


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
