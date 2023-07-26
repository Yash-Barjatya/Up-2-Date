import React from 'react'
import { Link, useLocation } from "react-router-dom";
const Navbar = () => {
    // location hook so that in navabr the link name  for the current page is activated
    let location = useLocation();
    // useEffect(() => {
    //     // console.log(["pageview", location.pathname]);
    // }, [location]); 
    /* last argument specifies that the fumction will be called whenever the location changes
    OR  If present, effect will only activate if the values in the list change.*/
    const handleLogout = () => {
        localStorage.removeItem('token');
        // console.log("token removed")
    }
    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Up-2-Date</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} to="/about">About</Link>
                        </li>
                    </ul>
                    {/* ternary operator to shoe login if token ==null else show logout */}
                    {!localStorage.getItem('token') ?
                        <form className="d-flex">
                            <Link to="/signup" className="btn btn-outline-light mx-2" type="submit">Sign Up</Link>
                            <Link to="/login" className="btn btn-outline-light mx-2" type="submit">Login</Link>
                        </form> : <Link to="/login" className="btn btn-outline-light mx-2" onClick={handleLogout} type="submit">Logout</Link>}
                </div>
            </div>
        </nav>

    )
}

export default Navbar
