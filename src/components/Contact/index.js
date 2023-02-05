import Loader from "react-loaders";
import AnimatedLetters from "../AnimatedLetters";
import "./index.scss";
import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const Contact = () => {
    const [letterClass, setLetterClass] = useState('text-animate')
    const refForm = useRef();
    useEffect(() => {
        document.body.style.zoom = "80%";
        let timeoutId = setTimeout(() => {
            setLetterClass('text-animate-hover')
        }, 4000)

        return () => {
            clearTimeout(timeoutId)
        }
    }, [])

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm(
            'service_e8p67ma',
            'template_bvcoawo',
            refForm.current,
            'RVo9CxTqD3INEUHwE'
        )
            .then(
                () => {
                    alert("Message successfully sent!");
                    document.location.href = "http://127.0.0.1:3000/contact";
                },
                () => {
                    alert("Failed to send the message, try again.");
                }
            )
            ;
    }
    return <div>
        <div className="container contact-page">
            <div className="text-zone">
                <h1>
                    <AnimatedLetters strArray={["C", "o", "n", "t", "a", "c", "t", " ", "m", "e"]}
                        idx={15}
                        letterClass={letterClass} />
                </h1>
                <p>
                Do you have concerns or questions about the donation process?
                To report concerns and queries, contact us using the form below.
                <br />
                We promise we'll get back ASAP :)
                <br />
                </p>
                <div className="contact-form">
                    <form ref={refForm} onSubmit={sendEmail}>
                        <ul>
                            <li className="half">
                                <input type="text" name="name" placeholder="Name" required />
                            </li>
                            <li className="half">
                                <input type="email" name="email" placeholder="Email" required />
                            </li>
                            <li className="full">
                                <input type="text" name="subject" placeholder="Subject" required />
                            </li>
                            <li className="full">
                                <textarea name="message" placeholder="Message" required />
                            </li>
                            <li className="full">
                                <input type="submit" value="SEND" className="flat-button" />
                            </li>
                        </ul>
                    </form>
                </div>
            </div>
            <div className="info-map">
            LifeNet
          <br />
          @ UGAHacks 8.0
          <br />
          <span>lifenet@gmail.com</span>
        </div>
        <div className="map-wrap">
          <MapContainer center={[33.7488, -84.3877]} zoom={13}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[33.7488, -84.3877]}>
              <Popup>Our Location!</Popup>
            </Marker>
          </MapContainer>
        </div>
        </div>
        <Loader type="line-scale" />
    </div>
}

export default Contact;