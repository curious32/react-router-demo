import { Link, useNavigate } from "react-router-dom";
import react_router_demo_logo from "../../assets/images/react-router-demo.bmp"
import { useEffect, useRef, useState, type SubmitEvent } from "react";
import { type LoggedInUser, type User } from "../../data/user";
import { login, LoginMessageCode } from "../../redux/authSlice";
import { addUser, RegisterMessageCode } from "../../redux/usersSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { log } from "../../util/common";
import { Loader } from "../Loader";
import { Alert } from "../dialogs/Alert";

interface AlertMsg {
    msg: string;
    cb?: () => void;
}

interface ValidationState {
    showFirstName: boolean;
    showLastName: boolean;
    showUsername: boolean;
    showPassword: boolean;
    showCPassword: boolean;
}

export const Register = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const reg = useAppSelector(state => state.reg);
    const auth = useAppSelector(state => state.auth); const stateRef = useRef<number>(0);
    const validationStateObj: ValidationState = {
        showFirstName: false,
        showLastName: false,
        showUsername: false,
        showPassword: false,
        showCPassword: false
    };
    const [validationState, setValidationState] = useState<ValidationState>(validationStateObj);
    const [msg, setMsg] = useState<{ flag: boolean, value: AlertMsg | null }>({ flag: false, value: null });
    function showAlert(value: AlertMsg) {
        setMsg({ flag: true, value: value });
    }
    function hideAlert() {
        setMsg({ flag: false, value: null });
    }

    const registeredUser: User = { id: 0, username: "", password: "", fullName: "" };

    const handleSubmit = async (event: SubmitEvent<HTMLFormElement>): Promise<void> => {
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

        const nextValidationState: ValidationState = { ...validationState }
        if (!firstname) {
            nextValidationState.showFirstName = true;
        }
        else if (!/^[A-Z][a-z]{1,64}$/.test(firstname)) {
            nextValidationState.showFirstName = true;
        }
        else {
            nextValidationState.showFirstName = false;
            log('Called');
        }
        if (!lastname) {
            nextValidationState.showLastName = true;
        }
        else if (!/^[A-Z][a-z]{1,64}$/.test(lastname)) {
            nextValidationState.showLastName = true;
        }
        else {
            nextValidationState.showLastName = false;
        }
        if (!username) {
            nextValidationState.showUsername = true;
        }
        else if (!/^[a-z][a-z0-9]{1,15}$/.test(username)) {
            nextValidationState.showUsername = true;
        }
        else {
            nextValidationState.showUsername = false;
        }
        if (!password) {
            nextValidationState.showPassword = true;
        }
        else if (!/^\S{8,32}$/.test(password)) {
            nextValidationState.showPassword = true;
        }
        else {
            nextValidationState.showPassword = false;
        }
        if (!cpassword) {
            nextValidationState.showCPassword = true;
        }
        else if (password && password != cpassword) {
            nextValidationState.showCPassword = true;
        }
        else {
            nextValidationState.showCPassword = false;
        }

        if (!nextValidationState.showFirstName && !nextValidationState.showLastName &&
            !nextValidationState.showUsername && !nextValidationState.showPassword &&
            !nextValidationState.showCPassword) {
            if (middlename && /^[A-Z][a-z]{1,64}$/.test(middlename)) {
                registeredUser.fullName = `${firstname} ${middlename} ${lastname}`;
            }
            else {
                registeredUser.fullName = `${firstname} ${lastname}`;
            }
            registeredUser.username = username;
            registeredUser.password = password;
            const result = await dispatch(addUser(registeredUser));
            if (addUser.fulfilled.match(result)) {
                if (result.payload.code === RegisterMessageCode.USER_ADDED.code) {
                    const loggedInUser: LoggedInUser = { username, password };
                    await dispatch(login(loggedInUser));
                }
            }
        } else {
            setValidationState(nextValidationState);
        }
    }

    useEffect(() => {
        if (auth) {
            if (auth.pageRefreshed) navigate('/', { replace: true });
            else if (!reg.loading && reg.code == RegisterMessageCode.USER_ADDED.code &&
                !auth.loading && auth.code == LoginMessageCode.LOGIN_SUCCESS.code) {
                showAlert({ msg: 'Adding user successfull', cb: () => navigate('/', { replace: true }) });
            } else if (!reg.loading && reg.code && reg.code != RegisterMessageCode.USER_ADDED.code) {
                if (reg.message) showAlert({ msg: reg.message, cb: () => hideAlert() });
            }
        }
    }, [auth, reg]);
    log('State: ', stateRef.current++);
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
                            <td><button type="submit" disabled={reg.loading || auth.loading}>Submit</button></td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <Link to="/login">Have an account</Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
            {reg.loading || auth.loading && <Loader />}
            {msg.flag && <Alert ChildElement={<span>{msg.value?.msg}</span>} callback={msg.value?.cb} />}
        </main>
    </>
};