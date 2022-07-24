import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import {Context} from './ContextTag'

export default function Home() {
	const state = useContext(Context)
	let navigate = useNavigate();
	return (
		<div className={`text-center py-5`} style={{}}>
			<div className='container py-5' style={{ backgroundColor: `rgba(0, 0, 0, ${state.theme[0].k})`, border: "0.1px solid", borderRadius: "100%" }}>
				<h1 className='my-3'>Search for a Word</h1>
				<form onSubmit={(e) => {e.preventDefault(); let querry = document.getElementById("input").value;if (querry !== "") { navigate(`/word/${querry}`) }  }} className="mb-3 d-flex flex-row flex-wrap justify-content-center align-items-center">
					<input id='input' className={`text-dark bg-light p-0 me-1 btn btn-lg`} type="text" style={{ border: `2px solid`, cursor: "text" }} />
					<button className={`my-2 ms-1 btn bg-${state.theme[0].i} text-${state.theme[0].j}`} style={{}} id="search_btn">Search</button>
				</form>
			</div>

		</div>
	)
}
//  bg-${state.theme[0].j} text-${state.theme[0].i}  state.theme[0].k