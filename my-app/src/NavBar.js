import { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom'
import React from 'react'
import './NavBar.css'
function NavBar() {
    const [show, handleShow] = useState(false);
    const history = useHistory();
    const transitionBar = () => {
        if (window.scrollY) {
            handleShow(true);
        } else {
            handleShow(false);
        }
    }
    useEffect(() => {
        window.addEventListener("scroll", transitionBar);
        return () => window.removeEventListener("scroll",transitionBar)
    }, [])
    return (
        <div className={`nav ${show && "nav__black"}`}>
            <div className="nav__contents">
            <img
                className="nav__logo"
                src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
                    alt=""
                    onClick={()=> history.push("/")}
            />
            
            <img
                className="nav__avatar"
                src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                    alt=""
                    onClick = {()=>history.push("/profile")}
            />
            </div>
        </div>
    )
}

export default NavBar
