import './Navbar.css';
import React from "react";
import {Link, Route} from "react-router-dom"

function Navbar(props) {
    return (
        <header>
            <h1>Rancid Tomatillos</h1> 
            
            <Route
                exact path="/"
                render= {() =>
                    <div class="button-container">
                        <div class="center">
                            
                                <button className="btn" onClick={props.sortByRating}>
                                    <svg width="180px" height="60px" viewBox="0 0 180 60" class="border">
                                        <polyline points="179,1 179,59 1,59 1,1 179,1" class="bg-line" />
                                        <polyline points="179,1 179,59 1,59 1,1 179,1" class="hl-line" />
                                    </svg>
                                    <span>SORT BY RATING</span>
                                </button>
                        </div> 
                    </div>
                }
            />

            <Route
                exact path="/:id"
                    render= {() => 
                    <div class="button-container">
                        <div class="center">
                            <Link to="/">
                                <button className="btn">
                                    <svg width="180px" height="60px" viewBox="0 0 180 60" class="border">
                                        <polyline points="179,1 179,59 1,59 1,1 179,1" class="bg-line" />
                                        <polyline points="179,1 179,59 1,59 1,1 179,1" class="hl-line" />
                                    </svg>
                                    <span>HOME</span>
                                </button>
                            </Link>
                        </div> 
                    </div>
                    }
            />
           
        </header>
    )
}

export default Navbar;