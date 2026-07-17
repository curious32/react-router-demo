import { Route, Routes, useNavigate } from 'react-router-dom'
import { Home } from './Home'
import { About } from './About'
import { Navbar } from "./Navbar";
import { Login } from './Login';
import { Register } from './Register';
import { PageNotFound } from './PageNotFound';
import { useAppDispatch } from '../../app/hooks';
import { getAuth, isLoggedIn, type AuthState, type LoggedInUser } from '../../data/user';
import { login } from '../../redux/authSlice';
import { useEffect } from 'react';

export const Master = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (isLoggedIn()) {
            const storedAuth: AuthState | null = getAuth();
            if (storedAuth && storedAuth.currentUser) {
                const storedLoggedInUser: LoggedInUser = {
                    username: storedAuth.currentUser.username,
                    password: storedAuth.currentUser.password
                };
                dispatch(login(storedLoggedInUser));
                navigate('/');
            }
        }
    }, []);
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