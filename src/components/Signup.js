import React, { useContext } from 'react'
import { Context } from './ContextTag'
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
	const state = useContext(Context)
	let navigate = useNavigate()

	function formHandler(e) {
		e.preventDefault();
		const check_entry = (entry) => {
			if (entry.replace(/\s+/g, '') === "") {
				state.triggerAlert("danger", "Invalid", "Field Cannot Be Empty")
				return false
			} return true
		}
		let name = document.getElementById("exampleInputName").value
		let email = document.getElementById("exampleInputEmail1").value
		let password1 = document.getElementById("exampleInputPassword1").value
		let password2 = document.getElementById("exampleInputPassword2").value

		if (!check_entry(name)) { return }
		if (!check_entry(email)) { return }
		if (!check_entry(password1)) { return }
		if (!check_entry(password2)) { return }
		if (password1 !== password2) {return}

		fetch(
			state.API_URL + '/user/signup',
			{
				method: "POST",
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					"name": name,
					"email": email,
					"password": password1,
					"data": JSON.stringify(state.lexicon)
				})
			}
		)
		.then(response => response.json())
		.then(data => {
			if (data === "Account Created") {
				state.triggerAlert("success", "Success", "Account Created")
				navigate("/login")
			} else if (data === "Duplicate Email") {
				state.triggerAlert("danger", "Warning", "Account with this email has already been registered")
			}
		});

	}
	return (
		<form onSubmit={(e) => formHandler(e)} className='mx-auto mt-3 mb-5 p-5' style={{ width: "60%", margin: "auto", backgroundColor: `rgba(0, 0, 0, ${state.theme[0].k})`, borderRadius: "7%" }}>
			<div className="mb-4 mt-3">
				<label htmlFor="exampleInputEmail1" className="form-label">Name</label>
				<input type="text" className="form-control" id="exampleInputName" aria-describedby="emailHelp" />
			</div>
			<div className="mb-4">
				<label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
				<input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
			</div>
			<div className="mb-4">
				<label htmlFor="exampleInputPassword1" className="form-label">Password</label>
				<input type="password" className="form-control" id="exampleInputPassword1" />
			</div>
			<div className="mb-4">
				<label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
				<input type="password" className="form-control" id="exampleInputPassword2" />
			</div>
			<div className='d-flex flex-column my-3 py-4 mx-auto' style={{width: "40%"}}>
				<button type="submit" className={`mb-2 btn bg-${state.theme[0].i} text-${state.theme[0].j}`}>Sign Up</button>
				<Link className={`btn bg-${state.theme[0].i} text-${state.theme[0].j}`} to="/login">Log In</Link>
			</div>
		</form>
	)
}
