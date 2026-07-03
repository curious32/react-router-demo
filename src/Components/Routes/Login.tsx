import { Link } from "react-router-dom";

export const Login = () => {
    return <>
        <form>
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
                        <td>
                            <Link to="/register">New User</Link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    </>
};