import React from 'react'
import {Link} from 'react-router-dom'


export default function Navbar(){

    return(
        <div className="row justify-content-end navbar-row">
            <div>
                <nav className="navbar navbar-expand-lg justify-content-between">
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                            {/* <li class="nav-item mr-4">
                                <a  href="">Link</a>
                            </li>
                            <li class="nav-item mr-4">
                                <a  href="">Link2</a>
                            </li> */}

                            <Link to="/" className="mr-3">Home </Link>
                            <Link to="/top_movies" className="mr-3">Top Movies</Link>
                        </ul>
                    </div>       
                </nav>
            </div>
        </div>
    );
}