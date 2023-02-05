import { Link } from "react-router-dom";
import { useEffect} from "react";
import { Loader } from "react-loaders";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.scss";
import {faArrowDownLong, faContactCard, faSignIn, faUser} from "@fortawesome/free-solid-svg-icons";

function Home() {

    useEffect(() => {
        document.body.style.zoom = "80%";
    }, [])

    return <><div className="container home-page">
        <div className="text-zone">
            <div className="hh5">Empowering Communities, Changing Lives.</div>
            <div className="hh6">Join the LiveNet Community today!</div>
            <div className="typing_2"><i>LifeNet is a software solution that aims to help the needy and 
            homeless through the use of Kiosks placed in public areas.<br /><br /> 
            It provides access to information on food donations, job 
            opportunities, emergency services, weather reports, and a 
            community leaderboard. <br /><br />
            It also includes a website for registering and posting food donations 
            and a chatbot powered by OpenAI GPT-3 to provide community 
            support and mental health resources</i></div>

            <div className="buttons">
                <Link to="/signIn" className="flat-button">SignIn <FontAwesomeIcon className="ic" icon={faSignIn} color="white" fontSize={"20px"} /></Link>
                <Link to="/contact" className="flat-button">Contact <FontAwesomeIcon className="ic" icon={faContactCard} color="white" fontSize={"20px"} /></Link>
                <Link to="/signUp" className="flat-button">SignUp <FontAwesomeIcon className="ic" icon={faUser} color="white" fontSize={"20px"} /></Link>
            </div>

        </div>
        <img className="lottie" src={require("../../assets/images/life.jpeg")} alt="life"/>
        <FontAwesomeIcon className="scroll" icon={faArrowDownLong} color="white" fontSize={"25px"} />

    </div>
        <Loader type="line-scale" />
    </>
}

export default Home;