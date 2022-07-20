import React from 'react'

export default function Login({ state, changeState, API_URL }) {
	function formHandler(e) {
		const check_entry = (entry, message) => {
			if (entry.replace(/\s+/g, '') === "") {
				alert(message);
				document.querySelector("#mainCont").style.setProperty("border-width", "1px 3px")
				setTimeout(() => {
					document.querySelector("#mainCont").style.setProperty("border-width", "1px 1px")
				}, 500);
				return false
			}
			return true
		}
		e.preventDefault();
		let email = document.getElementById("exampleInputEmail1").value
		let password = document.getElementById("exampleInputPassword1").value

		if (!check_entry(email, "Invalid Email")) { return }
		if (!check_entry(password, "Invalid Password")) { return }

		fetch(`${API_URL}lexicon/login-${email}-${password}-${JSON.stringify(state.lexicon)}`)
			.then(response => response.json())
			.then(data => {
				if (data === "Incorrect Password") {
					alert(data)
					document.getElementById("exampleInputPassword1").value = ""
					return
				}
				else if (data === "New Profile Created") {
					alert(`New Email Address Found!\nCurrent data has been assosiated with Email Address:\n${email}`)
				}
				else {
					changeState({ lexicon: JSON.parse(data) })
					alert("Your Dictionary Has Been Updated")
				}
				if (document.getElementById("exampleCheck1").checked) {
					localStorage.setItem("lexicon_email", email)
				}
				changeState({email: email, logged: true})
			});

	}

	return (<>
		{state.logged?
		<div className="m-5 p-5 text-center" style={{fontSize: "10px"}}>
			<h1 className='mt-5 pt-5 text-center' style={{wordWrap: 'break-word'}}>Hi {state.email}</h1>
			<button onClick={()=>{localStorage.removeItem("lexicon_email"); changeState({email: null, logged: false, lexicon: []});}} className={`my-4 btn bg-${state.theme[0].i} text-${state.theme[0].j}`}>Log Out</button>
		</div>
		:
		<form onSubmit={(e) => formHandler(e)} className='mx-auto my-5 p-5' style={{ width: "60%", margin: "auto", backgroundColor: `rgba(0, 0, 0, ${state.theme[0].k})`, borderRadius: "7%" }}>
			<div className="mb-4 mt-5">
				<label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
				<input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
			</div>
			<div className="mb-4">
				<label htmlFor="exampleInputPassword1" className="form-label">Password</label>
				<input type="password" className="form-control" id="exampleInputPassword1" />
			</div>
			<div className="mb-4 form-check">
				<input type="checkbox" className="form-check-input" id="exampleCheck1" />
				<label className="form-check-label" htmlFor="exampleCheck1">Keep me Logged In</label>
			</div>
			<button type="submit" className={`mb-5 btn bg-${state.theme[0].i} text-${state.theme[0].j}`}>LogIn</button>
		</form>
		}
	</>)
}
