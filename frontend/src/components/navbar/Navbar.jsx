import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function Navbar() {
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
                        onClick={() => {
                            alert("Useless Button");
                        }}
                        className="nav-link"
                    >
                        About
                    </Link>
                    <Link
                        onClick={() => {
                            alert("Useless Button");
                        }}
                        className="nav-link"
                    >
                        Pricing
                    </Link>
                    <Link
                        onClick={() => {
                            alert("Useless Button");
                        }}
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
                            <span>Signup</span>{" "}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
