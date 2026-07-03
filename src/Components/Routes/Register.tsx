import { Link } from "react-router-dom";
import react_router_demo_logo from "../../assets/images/react-router-demo.bmp"
import type { SubmitEvent } from "react";

export const Register = () => {
    const handleSubmit = (event: SubmitEvent<HTMLFormElement>): void => {
        event.preventDefault();
    }
    return <>
        <header>
            <Link to="/" className="logo nav-bar"><img src={react_router_demo_logo} alt="" /></Link>
        </header>
        <main>
            <form onSubmit={handleSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <td><h5>Username</h5></td>
                            <td><input type="text"></input></td>
                        </tr>
                        <tr>
                            <td><h5>Password</h5></td>
                            <td><input type="password"></input></td>
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