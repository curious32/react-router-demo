import { Route, Routes } from 'react-router-dom'
import { Home } from './Home'
import { About } from './About'
import { Navbar } from "./Navbar";
import { Login } from './Login';
import { Register } from './Register';
// import { RedirectTo } from './RedirectTo';
import { PageNotFound } from './PageNotFound';

export const Master = () => {
    return <>
        <Routes>
            <Route element={<Navbar />}>
                <Route element={<Home />} path='/'></Route>
                <Route element={<About />} path='/about'></Route>
            </Route>
            <Route element={<Login />} path='/login'></Route>
            <Route element={<Register />} path='/register'></Route>
            {/* <Route element={<RedirectTo to='/404.html' />} path='/*'></Route> */}
            <Route element={<PageNotFound />} path='/*'></Route>
        </Routes>
    </>
};