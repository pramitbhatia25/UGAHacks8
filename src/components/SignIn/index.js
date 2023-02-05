import './index.scss';
import { useState, useEffect } from "react"

const SignIn = () => {

    const [loggedIn, setLoggedIn] = useState(false);
    console.log(loggedIn)
    useEffect(() => {
        document.body.style.zoom = "80%";
        try {
            if (localStorage.getItem("email") != null) {
                setLoggedIn(true);
            }
            else {
                setLoggedIn(false);
            }
        }
        catch (e) {
        }
    }, [])


    const [user, setUser] = useState({
        pass: "", email: "",
    });

    let name, value;
    const Input = (e) => {
        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]: value });
    }

    const GoToDash = async (e) => {
        e.preventDefault();
        window.location.href = "/user/dashboard";
    }

    const Login = async (e) => {
        e.preventDefault();

        const { email, pass } = user;

        const res = await fetch("http://localhost:1337/api/login", {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email, pass
            })
        });

        const data = await res.json();
        console.log(data)

        if (res.status === 400 || !data) {
            window.alert("Invalid Credentials!");
            window.location.href = "/signIn"

        } else {
            localStorage.setItem("email", email);
            window.location.href = "/user/dashboard"
        }

    }

    if (loggedIn === false) 
    {
        return (
            <div className="loginForm">
                <div className="container" id="container">
                    <div className="form-container sign-in-container">
                        <form action="#">
                            <h1>Sign in</h1>
                            <h5>Welcome back, Gamer!</h5>
                            <input type="email" placeholder="Email" onChange={Input} id="email" value={user.email} name="email" />
                            <input type="password" placeholder="Password" onChange={Input} id="pass" value={user.pass} name="pass" />
                            <br />
                            <button onClick={Login} className="btn">Sign In</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
    else if(loggedIn) {
        return (
        <div className="loginForm">
            <div className="container" id="container">
                <div className="form-container sign-in-container">
                    <form action="#">
                        <h1>Welcome,</h1>
                        <br />
                        <h1>{localStorage.getItem("email")}</h1>
                        <button onClick={GoToDash} className="btn dashboard">My Dashboard</button>
                    </form>
                </div>
            </div>
        </div>
    )
};
}
export default SignIn;