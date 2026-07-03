import { Route, Routes } from 'react-router-dom'
import { Home } from './Home'
import { About } from './About'
import { Navbar } from "./Navbar";
import { NotFound404 } from './NotFound404';
import { Login } from './Login';
import { Register } from './Register';

export const Master = () => {
    return <>
        <header>
            <Navbar />
        </header>
        <main>
            <Routes>
                <Route element={<Home />} path='/'></Route>
                <Route element={<About />} path='/about'></Route>
                <Route element={<Login />} path='/login'></Route>
                <Route element={<Register />} path='/register'></Route>
                <Route element={<NotFound404 />} path='/*'></Route>
            </Routes>
        </main>
    </>
};