import { Link, useNavigate } from "react-router-dom";
import react_router_demo_logo from "../../assets/images/react-router-demo.bmp"
import { useEffect, useState, type SubmitEvent } from "react";
import { getAuth, isLoggedIn, type AuthState, type LoggedInUser, type User } from "../../data/user";
import { login } from "../../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectUsers } from "../../app/store";
import { addUser } from "../../redux/usersSlice";

interface ValidationState {
    showFirstName: boolean;
    showLastName: boolean;
    showUsername: boolean;
    showPassword: boolean;
    showCPassword: boolean;
}

export const Register = () => {
    const dispatch = useDispatch();
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
    const users = useSelector(selectUsers).users || [];
    const validationStateObj: ValidationState = {
        showFirstName: false,
        showLastName: false,
        showUsername: false,
        showPassword: false,
        showCPassword: false
    };
    const [validationState, setValidationState] = useState<ValidationState>(validationStateObj);

    const registeredUser: User = { id: 0, username: "", password: "", fullName: "" };

    const handleSubmit = (event: SubmitEvent<HTMLFormElement>): void => {
        event.preventDefault();

        const form = event.currentTarget;

        const formData = new FormData(form);

        const firstname =
            formData.get("firstname") as string;

        const middlename =
            formData.get("middlename") as string;

        const lastname =
            formData.get("lastname") as string;

        const username =
            formData.get("username") as string;

        const password =
            formData.get("password") as string;

        const cpassword =
            formData.get("cpassword") as string;

        if (!firstname) {
            validationState.showFirstName = true;
        }
        else if (!/^[A-Z][a-z]{1,64}$/.test(firstname)) {
            validationState.showFirstName = true;
        }
        else {
            validationState.showFirstName = false;
            console.log('Called');
        }
        if (!lastname) {
            validationState.showLastName = true;
        }
        else if (!/^[A-Z][a-z]{1,64}$/.test(lastname)) {
            validationState.showLastName = true;
        }
        else {
            validationState.showLastName = false;
        }
        if (!username) {
            validationState.showUsername = true;
        }
        else if (!/^[a-z][a-z0-9]{2,15}$/.test(username)) {
            validationState.showUsername = true;
        }
        else {
            validationState.showUsername = false;
        }
        if (!password) {
            validationState.showPassword = true;
        }
        else if (!/^\S{8,32}$/.test(password)) {
            validationState.showPassword = true;
        }
        else {
            validationState.showPassword = false;
        }
        if (!cpassword) {
            validationState.showCPassword = true;
        }
        else if (password && password != cpassword) {
            validationState.showCPassword = true;
        }
        else {
            validationState.showCPassword = false;
        }

        if (!validationState.showFirstName && !validationState.showLastName && !validationState.showUsername && !validationState.showPassword && !validationState.showCPassword) {
            registeredUser.id = users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;
            if (middlename && /^[A-Z][a-z]{1,64}$/.test(middlename)) {
                registeredUser.fullName = `${firstname} ${middlename} ${lastname}`;
            }
            else {
                registeredUser.fullName = `${firstname} ${lastname}`;
            }
            registeredUser.username = username;
            registeredUser.password = password;
            const userIndex = users.findIndex(user => user.username == registeredUser.username);
            if (userIndex < 0) {
                dispatch(addUser(registeredUser));
                const loggedInUser: LoggedInUser = { username, password };
                dispatch(login(loggedInUser));
                navigate('/');
            }
            else {
                alert('User already exist');
            }
        }
        setValidationState(prev => ({ ...prev, ...validationState }));
    }
    return <>
        <header>
            <Link to="/" className="logo nav-bar"><img src={react_router_demo_logo} alt="" /></Link>
        </header>
        <main>
            <form onSubmit={handleSubmit} method="post">
                <table>
                    <tbody>
                        <tr>
                            <td><h5>First name <b style={{ color: "red" }}>*</b></h5></td>
                            <td><input name="firstname" type="text"></input></td>
                            <td>{validationState.showFirstName && <span style={{ color: "red" }}>Invalid data</span>}</td>
                        </tr>
                        <tr>
                            <td><h5>Middle name</h5></td>
                            <td><input name="middlename" type="text"></input></td>
                        </tr>
                        <tr>
                            <td><h5>Last name <b style={{ color: "red" }}>*</b></h5></td>
                            <td><input name="lastname" type="text"></input></td>
                            <td>{validationState.showLastName && <span style={{ color: "red" }}>Invalid data</span>}</td>
                        </tr>
                        <tr>
                            <td><h5>Username <b style={{ color: "red" }}>*</b></h5></td>
                            <td><input name="username" type="text"></input></td>
                            <td>{validationState.showUsername && <span style={{ color: "red" }}>Invalid data</span>}</td>
                        </tr>
                        <tr>
                            <td><h5>Password <b style={{ color: "red" }}>*</b></h5></td>
                            <td><input name="password" type="password"></input></td>
                            <td>{validationState.showPassword && <span style={{ color: "red" }}>Invalid data</span>}</td>
                        </tr>
                        <tr>
                            <td><h5>Confirmed password <b style={{ color: "red" }}>*</b></h5></td>
                            <td><input name="cpassword" type="password"></input></td>
                            <td>{validationState.showCPassword && <span style={{ color: "red" }}>Password does not match</span>}</td>
                        </tr>
                        <tr>
                            <td><button type="reset">Clear</button></td>
                            <td><button type="submit">Submit</button></td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <Link to="/login">Have an account</Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </main>
    </>
};