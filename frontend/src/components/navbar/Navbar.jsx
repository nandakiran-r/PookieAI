import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import Swal from "sweetalert2";

export default function Navbar() {

    function pranked() {
        Swal.fire({
            html: " <h4> <b> You Got Pranked </b> </h4>",
            icon: "question",
            showConfirmButton: false
        });
    }

    function connect() {
        Swal.fire({
            html: "<b>Sorry, but I am not going to meet with a total stranger.</b>",
            icon: "info",
            showConfirmButton: false
        });
    }


    return (
        <div
            data-animation="default"
            data-collapse="medium"
            data-duration="400"
            data-easing="ease"
            data-easing2="ease"
            role="banner"
            className="navbar w-nav"
        >
            <div className="navbar-contents">
                <nav role="navigation" className="nav-menu w-nav-menu">
                    <Link
                        onClick={pranked}
                        className="nav-link"
                    >
                        About
                    </Link>
                    <Link
                        onClick={pranked}
                        className="nav-link"
                    >
                        Pricing
                    </Link>
                    <Link
                        onClick={pranked}
                        className="nav-link"
                    >
                        Pookify Me
                    </Link>
                </nav>
                <Link
                    to="/"
                    aria-current="page"
                    className="brand w-nav-brand w--current"
                >
                    <img width="194" loading="lazy" alt="" src={logo} />
                </Link>
                <div className="nav-right">
                    <div className="nav-right-content desktop">
                        <div className="white-button w-button">
                            <span
                                onClick={connect}
                            >CONNECT US</span>{" "}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
