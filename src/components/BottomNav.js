import React, { useContext } from 'react'
import { Context } from './ContextTag'

export default function BottomNav() {
	const state = useContext(Context)

	function select_all() {
		let checks = document.getElementsByClassName("checks")
		for (let i = 0; i < checks.length; i++) { checks[i].checked = true }
	}
	function unselect_all() {
		let checks = document.getElementsByClassName("checks")
		for (let i = 0; i < checks.length; i++) { checks[i].checked = false }

		let datas = document.querySelectorAll("#table_body>tr:nth-child(even)")
		for (let i = 0; i < datas.length; i++) {
			datas[i].style.setProperty("display", "none")
		}
	}
	function remove() {
		let checks = document.getElementsByClassName("checks")
		let new_lexicon = []
		let connections_to_remove = []
		for (let i = 0; i < checks.length; i++) {
			if (!checks[i].checked) {
				new_lexicon = new_lexicon.concat(state.lexicon[i])
			} else {
				connections_to_remove = connections_to_remove.concat(state.lexicon[i].time)
			}
		}
		for (let i in new_lexicon) {
			new_lexicon[i].connections = new_lexicon[i].connections.filter((item) => {
				// if (!connections_to_remove.includes(item)) { return item }
				if (!connections_to_remove.includes(item)) { return true }
				else {return false}
			})
		}
		state.setLexicon(new_lexicon)
		unselect_all()
	}
	function connect() {
		let checks = document.getElementsByClassName("checks")
		let connection_list = []
		for (let i = 0; i < checks.length; i++) {
			if (checks[i].checked) {
				connection_list = connection_list.concat(state.lexicon[i].connections)
				connection_list = connection_list.concat(state.lexicon[i].time)
			}
		}
		let refined_connection_list = []
		for (let i in connection_list) {
			if (!refined_connection_list.includes(i)) {
				refined_connection_list = refined_connection_list.concat(connection_list[i])
			}
		}
		let new_lexicon = Object.assign([], state.lexicon)
		for (let i = 0; i < checks.length; i++) {
			if (checks[i].checked) {
				new_lexicon[i].connections = refined_connection_list.filter((connection) => {
					if (connection !== new_lexicon[i].time) { return true }
					else {return false}
				})
			}
		}
		state.setLexicon(new_lexicon)
		unselect_all()
	}
	function disconnect() {
		let checks = document.getElementsByClassName("checks")
		let connections_to_remove = []
		let new_lexicon = Object.assign([], state.lexicon)
		for (let i = 0; i < checks.length; i++) {
			if (checks[i].checked) {
				connections_to_remove = connections_to_remove.concat(state.lexicon[i].time)
				new_lexicon[i].connections = []
			}
		}
		for (let i in new_lexicon) {
			new_lexicon[i].connections = new_lexicon[i].connections.filter((item) => {
				// if (!connections_to_remove.includes(item)) { return item }
				if (!connections_to_remove.includes(item)) { return true }
				else {return false}
			})
		}
		state.setLexicon(new_lexicon)
		unselect_all()
	}
	function sort() {
		state.setSortCounter( (1 + state.sortCounter) % 4 )
		let schema;
		if (state.sortCounter <= 1) { schema = "word" }
		else if (state.sortCounter > 1) { schema = "time" }

		let new_lexicon = [state.lexicon[0]]
		for (let i = 1; i < state.lexicon.length; i++) {
			for (let j in new_lexicon) {
				if (state.lexicon[i][schema] < new_lexicon[j][schema]) {
					new_lexicon = [].concat(new_lexicon.slice(0, j), state.lexicon[i], new_lexicon.slice(j))
					break
				}
				if (parseInt(j) === new_lexicon.length - 1) { new_lexicon = new_lexicon.concat(state.lexicon[i]) }
			}
		}

		if (state.sortCounter === 1 || state.sortCounter === 2) { new_lexicon = new_lexicon.reverse() }
		state.setLexicon(new_lexicon)
		unselect_all()
	}

	return (
		<nav className={`navbar sticky-bottom navbar-expand-lg my-4 `} style={{backgroundColor: "#d8d8d880"}} >
			<div className="d-flex flex-row flex-wrap justify-content-evenly" style={{ width: "100%" }}>
				<button onClick={() => { state.setAddMode(true) }} className={`my-1 btn btn-sm bg-${state.theme[0].i} text-${state.theme[0].j}`}>Add Word</button>
				<button onClick={() => connect()} className={`my-1 btn btn-sm bg-${state.theme[0].i} text-${state.theme[0].j}`}>Connect</button>
				<button onClick={() => disconnect()} className={`my-1 btn btn-sm bg-${state.theme[0].i} text-${state.theme[0].j}`}>Disconnect</button>
				<button onClick={() => remove()} className={`my-1 btn btn-sm bg-${state.theme[0].i} text-${state.theme[0].j}`}>Remove</button>
				<button onClick={() => select_all()} className={`my-1 btn btn-sm bg-${state.theme[0].i} text-${state.theme[0].j}`}>Select All</button>
				<button onClick={() => unselect_all()} className={`my-1 btn btn-sm bg-${state.theme[0].i} text-${state.theme[0].j}`}>Unselect</button>
				<button onClick={() => sort()} className={`my-1 btn btn-sm bg-${state.theme[0].i} text-${state.theme[0].j}`}>Sort</button>
			</div>
		</nav>
	)
}
