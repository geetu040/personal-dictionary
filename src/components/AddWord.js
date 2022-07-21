import React from "react"

export default function AddWord({ state, changeState }) {
	function moreKey() {
		let tbody = document.querySelector("#add_tbody")
		let row_contetn_to_add = `<th scope="col"><input type="text" style="width: 60%;"></th><td ><input type="text" style="width: 100%;"></td>`
		let row = document.createElement("tr")
		row.innerHTML = row_contetn_to_add
		tbody.insertBefore(row, tbody.children[tbody.children.length - 1]);
	}
	function lessKey() {
		let tbody = document.querySelector("#add_tbody")
		let row_to_remove = tbody.children[tbody.children.length - 2]
		if (tbody.children.length >= 4) { tbody.removeChild(row_to_remove) }
	}
	function addWord() {
		let new_word = {}

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

		let add_tbody = document.getElementById("add_tbody")

		let word = document.querySelector("#add_tbody>tr:nth-child(1)>td>input").value
		if (!check_entry(word, "Enter a Valid Word")) { return }
		let meaning = document.querySelector("#add_tbody>tr:nth-child(2)>td>input").value
		if (!check_entry(meaning, "Enter a Valid Meaning")) { return }
		new_word['word'] = word
		new_word['meaning'] = meaning


		let key;
		let value;
		for (let i = 3; i < add_tbody.children.length; i++) {
			key = document.querySelector(`#add_tbody>tr:nth-child(${i})>th>input`).value;
			if (!check_entry(key, `Invalid Key ${i - 2}`)) { return }
			value = document.querySelector(`#add_tbody>tr:nth-child(${i})>td>input`).value;
			if (!check_entry(value, `Invalid Value ${i - 2}`)) { return }
			document.querySelector(`#add_tbody>tr:nth-child(${i})>th>input`).value = ""
			document.querySelector(`#add_tbody>tr:nth-child(${i})>td>input`).value = ""
			new_word[key] = value
		}
		new_word["time"] = Date.now()
		new_word["connections"] = []
		document.querySelector("#add_tbody>tr:nth-child(1)>td>input").value = ""
		document.querySelector("#add_tbody>tr:nth-child(2)>td>input").value = ""
		changeState({ lexicon: state.lexicon.concat([new_word]) })

		document.querySelector("#mainCont").style.setProperty("border-width", "1px 3px")
		setTimeout(() => {
			document.querySelector("#mainCont").style.setProperty("border-width", "1px 1px")
		}, 500);



	}
	return (
		// <div id="mainCont" className="container text-center my-5 py-5" style={{border: "1px solid grey", backgroundColor: "#dbdbdb73", borderRadius: "5%" }}>
		<div id="mainCont" className="container text-center my-5 py-5" style={{border: `1px solid`, borderRadius: "5%", backgroundColor: `rgba(0, 0, 0, ${state.theme[0].k})` }}>

			<h3 className="text-center my-4">Add Word</h3>
			{/* <table className={`table table-responsive text-${state.theme[0].i}`} style={{ width: "85%", margin: "auto", backgroundColor: "#dbdbdb73" }}> */}
			<table className={`table table-responsive text-${state.theme[0].i}`} style={{ width: "85%", margin: "auto" }}>
				<tbody id="add_tbody" style={{width: "70vw"}}>
					<tr >
						<th scope="col">Word</th>
						<td ><input type="text" style={{ width: "100%" }} /></td>
					</tr>
					<tr >
						<th scope="col">Meaning</th>
						<td ><input type="text" style={{ width: "100%" }} /></td>
					</tr>
					<tr >
						<th scope="col"><input placeholder="Key (e.g Synonyms)" type="text" style={{ width: "60%" }} /></th>
						<td ><input placeholder="Add Value" type="text" style={{ width: "100%" }} /></td>
					</tr>
					<tr ><td colSpan={2}>
						<button onClick={() => { lessKey() }} className={`mx-1 btn btn-sm btn bg-${state.theme[0].i} text-${state.theme[0].j}`} style={{  fontSize: "100%" }} ><strong>-</strong></button>
						<button onClick={() => { moreKey() }} className={`mx-1 btn btn-sm btn bg-${state.theme[0].i} text-${state.theme[0].j}`} style={{  fontSize: "100%" }} ><strong>+</strong></button>
					</td></tr>
				</tbody>
			</table>
			<div className="container">
				<button onClick={() => { changeState({ addMode: false }) }} className={`m-4 btn bg-${state.theme[0].i} text-${state.theme[0].j}`}>Cancel</button>
				<button onClick={() => { addWord() }} className={`m-4 btn bg-${state.theme[0].i} text-${state.theme[0].j}`}>Add</button>
			</div>


		</div>
	)
}