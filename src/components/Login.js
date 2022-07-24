import React, { useContext } from 'react'
import { Context } from './ContextTag'
import { Link } from "react-router-dom";

export default function Login() {
	const state = useContext(Context)

	function formHandler(e) {
		const check_entry = (entry) => {
			if (entry.replace(/\s+/g, '') === "") {
				state.triggerAlert("danger", "Invalid", "Field Cannot Be Empty")
				return false
			} return true
		}
		e.preventDefault();
		let email = document.getElementById("exampleInputEmail1").value
		let password = document.getElementById("exampleInputPassword1").value

		if (!check_entry(email)) { return }
		if (!check_entry(password)) { return }


		fetch(
			state.API_URL + '/user/login',
			{
				method: "POST",
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					"email": email,
					"password": password,
					"getToken": document.getElementsByClassName("check-box")[0].checked
				})
			}
		)
		.then(response => response.json())
		.then(data => {
			if (data === "Account Not Found") {
				state.triggerAlert("danger", "Warning", "No Account found with these credentials")
			} else if (data === "Incorrect Password") {
				state.triggerAlert("danger", "Warning", "Incorrect Password")
			} else {
				if (data.token) {localStorage.setItem("lexicon_token", data.token)}
				else localStorage.removeItem("lexicon_token")

				state.setName(data.name)
				state.setEmail(data.email)
				state.setLogged(true)
				state.triggerAlert("success", "Success", "Your Dictionary Has Been Updated")
			}
		});
	}
	function logout() {
		state.setName(null)
		state.setEmail(null)
		state.setLexicon([])
		state.setLogged(false)
		localStorage.removeItem("lexicon_token")
	}

	return (<>
		{state.logged?
		<div className="mb-5 p-5 text-center" style={{fontSize: "10px"}}>
			<h1 className='mt-5 pt-5 text-center' style={{wordWrap: 'break-word'}}>Hi {state.name}</h1>
			<button onClick={logout} className={`my-4 btn bg-${state.theme[0].i} text-${state.theme[0].j}`}>Log Out</button>
		</div>
		:
		<form onSubmit={(e) => formHandler(e)} className='mx-auto mb-5 p-5' style={{ width: "60%", margin: "auto", backgroundColor: `rgba(0, 0, 0, ${state.theme[0].k})`, borderRadius: "7%" }}>
			<div className="mb-4 mt-2">
				<label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
				<input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
			</div>
			<div className="mb-4">
				<label htmlFor="exampleInputPassword1" className="form-label">Password</label>
				<input type="password" className="form-control" id="exampleInputPassword1" />
			</div>
			<div className="mb-4 form-check">
				<input type="checkbox" className="form-check-input check-box" id="exampleCheck1" />
				<label className="form-check-label" htmlFor="exampleCheck1">Keep me Logged In</label>
			</div>
			<div className='d-flex flex-column my-3 py-4 mx-auto' style={{width: "40%"}}>
				<button type="submit" className={`mb-2 btn bg-${state.theme[0].i} text-${state.theme[0].j}`}>Log In</button>
				<Link className={`btn bg-${state.theme[0].i} text-${state.theme[0].j}`} to="/signup">Sign Up</Link>
			</div>
		</form>
		}
	</>)
}
