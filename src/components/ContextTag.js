import { createContext, useState, useEffect } from "react";

export const Context = createContext()

const API_URL = "https://personal-dictionary-api.herokuapp.com"
// const API_URL = "http://127.0.0.1:8000"
/*
BACKEND API ENDPOINTS
/dictionary-{word}    # GET
/user/init-{token}    # GET
/user/signup          # POST
/user/login           # POST
/user/update          # POST
*/
let rendered = false

export default function ContextTag(props) {

	// ------------> STATES
	const [name, setName] = useState(null)
	const [email, setEmail] = useState(null)
	const [lexicon, setLexicon] = useState([])
	const [logged, setLogged] = useState(false)
	const [addMode, setAddMode] = useState(false)
	const [sortCounter, setSortCounter] = useState(0)
	const [theme, setTheme] = useState(
		JSON.parse(localStorage.getItem("lexicon_theme"))
		||
		[
			{ i: "dark", j: "light", k: 0.048 },
			// blues
			{ i: "12", j: "11", k: 0.048 },
			{ i: "7", j: "dark", k: 0.048 },
			{ i: "info", j: "dark", k: 0.3 },
			{ i: "1", j: "2", k: 0.009 },
			// yellows
			{ i: "warning", j: "dark", k: 0.3 },
			{ i: "6", j: "5", k: 0.048 },
			{ i: "4", j: "3", k: 0.1 },
			// greys
			{ i: "13", j: "14", k: 0.048 },
			{ i: "light", j: "dark", k: 0.3 },
			{ i: "14", j: "13", k: 0.048 },
		]
	)
	const [info, setInfo] = useState(null)

	// ------------> EFFECTS
	useEffect(() => {
		if (email) {
			fetch(
				API_URL + '/user/update',
				{
					method: "POST",
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						email: email,
						lexicon: JSON.stringify(lexicon)
					})
				}
			)
				.then(response => response.json())
				.then(data => {
					console.log(data)
				});
		}
	}, [lexicon, email])
	useEffect(() => {
		localStorage.setItem("lexicon_theme", JSON.stringify(theme))
	}, [theme])

	// ------------> OTHER WORK
	document.getElementsByTagName("body")[0].removeAttribute('class');
	document.getElementsByTagName("body")[0].classList.add(`bg-${theme[0].j}`)
	if (!rendered) {
		fetch(
			API_URL + `/user/init-${localStorage.getItem('lexicon_token')}`,
			{
				method: "GET",
				headers: { 'Content-Type': 'application/json' },
			}
		)
			.then(response => response.json())
			.then(data => {
				console.log(data)
				if (data !== "Invalid Token") {
					setName(data.name)
					setEmail(data.email)
					setLogged(true)
					setLexicon(JSON.parse(data.data))
					rendered = true
				}
			});
	}

	// ------------> VALUE
	const value = {
		name,
		setName,
		addMode,
		setAddMode,
		theme,
		setTheme,
		lexicon,
		setLexicon,
		sortCounter,
		setSortCounter,
		email,
		setEmail,
		logged,
		setLogged,
		info,
		setInfo,
		API_URL,
		triggerAlert: (alert_type, head, msg) => {
			const alertBox = document.getElementsByClassName('alert')[0]
			try{
				['success', 'info', 'primary', 'danger', 'warning'].forEach((i)=>{
					try {alertBox.classList.remove("alert-"+i)} catch {}
				})
				alertBox.classList.add("alert-"+alert_type.toLowerCase())
				alertBox.innerHTML = `<strong>${head}! </strong>${msg}`
				alertBox.classList.add("animate")
				setTimeout(() => {
					alertBox.classList.remove("animate")
				}, 3000);
			} catch {}
		}
	}

	return (
		<Context.Provider value={value} >
			<div className={`bg-${theme[0].j} text-${theme[0].i}`} style={{ minHeight: "100vh" }} >
				{props.children}
			</div>
		</Context.Provider>
	)
}
