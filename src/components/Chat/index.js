import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBars, faTrophy, faUserFriends, faSignOut, faChartBar } from "@fortawesome/free-solid-svg-icons";
import Particle from "../particle";
import { ThemeProvider } from 'styled-components';
import "./index.scss"
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatBot, { Loading } from 'react-simple-chatbot';

// async function getResponse(prompt) {
//     const response = await fetch("http://127.0.0.1:5000/chatbot", {
//         headers: {
//             'Content-Type': 'application/json',
//             'Prompt': prompt,
//         },
//         method: 'GET',
//     }).then(function (response) {
//         return response.json();
//     }).then(function (text) {
//         return text.status;
//     });
//     return (response)
// }


class DBPedia extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            result: '',
            trigger: false,
        };

        this.triggetNext = this.triggetNext.bind(this);
    }

    componentWillMount() {
        const self = this;
        const { steps } = this.props;
        const search = steps.search.value;

        const queryUrl = `http://127.0.0.1:5000/chatbot`;

        const xhr = new XMLHttpRequest();

        xhr.addEventListener('readystatechange', readyStateChange);

        function readyStateChange() {
            if (this.readyState === 4) {
                const data = JSON.parse(this.responseText);
                self.setState({ loading: false, result: data.status });
            }
        }
        xhr.open('GET', queryUrl);
        xhr.setRequestHeader("Prompt", search)
        xhr.send();
    }

    triggetNext() {
        this.setState({ trigger: true }, () => {
            this.props.triggerNextStep();
        });
    }

    render() {
        const { trigger, loading, result } = this.state;

        return (
            <div className="dbpedia">
                {loading ? <Loading /> : result}
            </div>
        );
    }
}

DBPedia.propTypes = {
    steps: PropTypes.object,
    triggerNextStep: PropTypes.func,
};

DBPedia.defaultProps = {
    steps: undefined,
    triggerNextStep: undefined,
};


function Chat() {
    const [showNav, setShowNav] = useState(false);
    const [user, setUser] = useState({ name: "Loading", handle: "Handle", steps: 0, email: "", pass: "" });

    const theme = {
        background: 'transparent',
        headerBgColor: 'white',
        headerFontSize: '20px',
        botBubbleColor: 'white',
        headerFontColor: 'black',
        botFontColor: 'black',
        userBubbleColor: '#FF5733',
        userFontColor: 'white',
    };
    useEffect(() => {
        document.body.style.zoom = "80%";
        if (localStorage.getItem("email") != null) {
            getUser();
        }
        else {
            window.alert("Not Logged In!");
            window.location.href = "/signIn";
        }
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
        setUser(data.user)
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
        <div className="nav-bar">
            <Link onClick={() => setShowNav(false)} className="logo" to="/home" >
                <h4>LIFE-NET</h4>
            </Link>
            <ThemeProvider theme={theme}>
                <div className="chatbot">
                    <ChatBot
                        steps={[
                            {
                                id: '1',
                                message: 'Hey! How can I help you today?',
                                trigger: 'search',
                            },
                            {
                                id: 'search',
                                user: true,
                                trigger: '3',
                            },
                            {
                                id: '3',
                                component: <DBPedia />,
                                asMessage: true,
                                trigger: 'search',
                            },
                        ]}
                    />
                </div>
            </ThemeProvider>
            <div className="openai_text">
                    Hosting someone for the first time?
                    Dont worry. Brad can help you out!
            </div>
            <div className="openai_text_2">
                    Brad is your own personal chatbot, powered by GPT-3.
                    So ask away!
            </div>

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
        </div></>
}

export default Chat;