import React from "react"
import { Link } from "react-router-dom";

export default function Navbar({ state, changeState }) {
	return (
		<nav className={`navbar navbar-expand-lg bg-${state.theme[0].i}`} style={{}}>
			<div className="container-fluid">
				<Link className={`btn btn-sm navbar-brand text-${state.theme[0].j}`} to="/" style={{}}>Explore</Link>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<Link className={`my-2 p-1 btn btn-sm nav-link text-${state.theme[0].j}`} style={{display: "inline-block" }} to="lexicon">My Dictionary</Link>
						</li>
					</ul>
					<button className={` btn btn-md text-${state.theme[0].j} me-2`}><Link className="nav-link" to="login" style={{}}>{state.email || "LogIn"}</Link></button>
					<button className={`btn btn-sm bg-${state.theme[0].j} text-${state.theme[0].i}`} style={{border: "2px solid"}} onClick={()=>{
						changeState({theme: state.theme.slice(1).concat(state.theme[0])})
					}}>Change Theme</button>
				</div>
			</div>
		</nav>
	)
}