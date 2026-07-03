import { Route, Routes } from 'react-router-dom'
import { Home } from './Home'
import { About } from './About'
import { Navbar } from "./Navbar";

export const Master = () => {
    return <>
        <header>
            <Navbar />
        </header>
        <main>
            <Routes>
                <Route element={<Home />} path='/'></Route>
                <Route element={<About />} path='/about'></Route>
            </Routes>
        </main>
    </>
};