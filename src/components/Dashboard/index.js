import "./index.scss";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBars, faTrophy, faUserFriends, faSignOut, faChartBar } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Particle from "../particle";
import { useEffect } from "react";
import React from 'react';


const FoodListing = (props) => {

    async function Verify() {
        document.getElementById("v").classList.add("mystyle");
    }

    console.log(props)
    return <>
        <div className="f_l">
            <div className="ex">
                <div className="firstl">
                    <div className="loc">
                        Location:
                    </div>
                    <button className="ocr_title">{props.i.address}</button>
                    <div className="time">
                        Time:
                    </div>
                    <button className="ocr_title">{props.i.time}</button>
                    <div className="spots">
                        Spots Available:
                    </div>
                    <button className="ocr_title">{props.i.no_of_spots}</button>
                </div>
                <button onClick={Verify} id="v"className="verify">Verify PIN</button>
                <input className="pin" placeholder="Enter PIN"></input>
            </div>
        </div>
    </>
}

const DashBoard = () => {


    const Collapsible = () => {
        const [location, setLocation] = useState('Address');
        const [time, setTime] = useState('Time (Eg. 10 am to 12 pm)');
        const [spots, setSpots] = useState(0);
        const Input = (e) => {
            console.log(e)
            let tls = e.target.name
            let tls_value = e.target.value
            if (tls == "loc") { setLocation(tls_value) }
            else if (tls == "time") { setTime(tls_value) }
            else if (tls == "spots") { setSpots(parseInt(tls_value)) }
            console.log(tls_value)
            console.log(spots);
        }

        async function onSubmit(e) {
            e.preventDefault();
            console.log(time, spots, location)
            console.log("submitted")
            let email = user.email;
            let passwords = []
            for (var i = 0; i < spots; i++) {
                passwords.push(i + "A")
            }

            let food_listings = user.food_listings;
            food_listings.push({ address: location, time: time, no_of_spots: spots, spot_passwords: passwords });
            let lifep = 0;
            for(var i = 0; i < food_listings.length; i++)
            {
                lifep += food_listings[i].no_of_spots;
            }
            let community = user.community;

            const response = await fetch('http://localhost:1337/api/updateFoodListing', {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'PUT',
                body: JSON.stringify({
                    // pass: "", email: "", name:"", phone: "", food_listings: "", lifep: "", community:""
                    email, food_listings, lifep
                }),
            })
            console.log(response.status)
            if (response.status === 200) {
                console.log("S" + response.toString());
                window.alert("Event Added!");
                window.location.reload();
            }
            else {
                window.alert("Error!" + response.error)
            }




        }

        const toggle = () => {
            setOPen(!open);
        };
        const [open, setOPen] = useState(false);
        return (
            <div>
                <button onClick={toggle} className="connect_button">Host An Event</button>
                {open && (
                    <div className="loginForm p">
                        <div className="container" id="container">
                            <div className="form-container sign-in-container">
                                <form action="#">
                                    <h1>Welcome, {user.name}</h1>
                                    <h2 className="af">To create an event, add the address, time and spots available.</h2>
                                    <h2>You can verify people's identity by submitting their code in the Verify box.</h2>
                                    <h2>and waiting for the green light.</h2>
                                    <div className="af">
                                        <br />
                                        <h3 className="af2">Location:    </h3>
                                        <input className="af2" type="location" onChange={Input} placeholder="Address" id="loc" value={user.location} name="loc" />
                                    </div>
                                    <div className="af">
                                        <br />
                                        <h3 className="af2">Time:    </h3>
                                        <input className="af2" type="input" onChange={Input} placeholder="Time (Eg. 10 am to 12 pm)" value={user.time} id="pass" name="time" />
                                    </div>
                                    <div className="af">
                                        <br />
                                        <h3 className="af2">Spots Available:    </h3>
                                        <input className="af2" type="input" onChange={Input} placeholder="No. of spots available" id="spts" value={user.spots} name="spots" />
                                    </div>
                                    <button onClick={onSubmit} className="af btn dashboard">Confirm Listing</button>
                                    <button onClick={toggle} className="af btn dashboard">Exit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    const Collapsible2 = () => {

        const onSubmit = (e) => {
            e.preventDefault();
            console.log("submitted")
        }

        const toggle = () => {
            setOPen2(!open2);
        };
        const [open2, setOPen2] = useState(false);
        return (
            <div>
                <button onClick={toggle} className="step_count">
                    <div className="steps_title">
                        FAQ
                    </div>
                </button>
                {open2 && (
                    <div className="loginForm p">
                        <div className="container" id="container">
                            <div className="form-container sign-in-container">
                                <form action="#">
                                    <h1>Welcome, {user.name}</h1>
                                    <h2 className="af">To create an event, add the address, time and spots available.</h2>
                                    <h2>You can verify people's identity by submitting their code in the Verify box.</h2>
                                    <h2>and waiting for the green light.</h2>
                                    <h2>Your life points will depend on the number of people you volunteer to help.</h2>
                                    <h2>Your life points contribute to your community.</h2>
                                    <h2>Show your generosity and contribute to society today!</h2>
                                    <button onClick={toggle} className="af btn dashboard">Exit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }


    const [showNav, setShowNav] = useState(false);
    const [user, setUser] = useState({ name: "Loading", food_listings: [], phone: "Loading", email: "", pass: "", lifep: "", community: "" });

    useEffect(() => {
        getUser();
        document.body.style.zoom = "80%";
    }, [])

    async function getUser() {
        let email = localStorage.getItem("email");
        const response = await fetch('http://localhost:1337/api/find', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                email,
            }),
        })

        const data = await response.json()
        console.log(data);
        setUser({ name: data.user.name, food_listings: data.user.food_listings, phone: data.user.phone, email: data.user.email, pass: data.user.pass, lifep: data.user.lifep, community: data.user.community })
        console.log("AAAAAAAA", data.user.food_listings);
    }

    async function updateDB(steps) {
        let email = localStorage.getItem("email");
        const response = await fetch('http://localhost:1337/api/updateApprovalStatus', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email, steps
            }),
        })
        console.log("hola")

        const data = await response.json()
        console.log(data)
        // window.location.href = "/user/dashboard";
    }


    async function SignOutUser(e) {
        setShowNav(false);
        e.preventDefault();
        localStorage.removeItem('email');
        window.alert('You have been logged out!')
        window.location.href = "/home";
    }

    return <>
        <Particle />
        <div className="dash">
            <div className="nav-bar">
                <Link onClick={() => setShowNav(false)} className="logo" to="/home" >
                    <h4>Life-net</h4>
                </Link>


                <nav className={showNav ? 'mobile-show' : ''}>
                    <NavLink exact="true" activeclassname="active" to="/user/dashboard" onClick={() => setShowNav(false)}>
                        <FontAwesomeIcon icon={faHome} color="#fff" />
                    </NavLink>
                    <NavLink exact="true" activeclassname="active" className="friends-link" to="/user/chat" onClick={() => setShowNav(false)}>
                        <FontAwesomeIcon icon={faUserFriends} color="#fff" />
                    </NavLink>
                    <NavLink exact="true" activeclassname="active" className="signout-link" to="/home" onClick={SignOutUser}>
                        <FontAwesomeIcon icon={faSignOut} color="red" />
                    </NavLink>
                    <NavLink exact="true" activeclassname="active" className="leaderboard-link" to="/world/leaderboard" onClick={() => setShowNav(false)}>
                        <FontAwesomeIcon icon={faTrophy} color="#fff" />
                    </NavLink>
                </nav>
                <FontAwesomeIcon
                    onClick={() => setShowNav(true)}
                    icon={faBars}
                    color="#ffd700"
                    size="3x"
                    className='hamburger-icon' />
            </div>
            <div className="welcome_box">
                Welcome, {user.name}! You have {user.lifep} points.
            </div>
            <Collapsible2 />
            <Collapsible />
            <div className="my_events">
                My Events
            </div>
            <div className="lis">
                {user.food_listings.reverse().map((app) => <FoodListing i={app} />)}
            </div>
        </div>
    </>
}

export default DashBoard;