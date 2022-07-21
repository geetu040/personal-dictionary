import React from 'react'

export default function Row({ state, changeState, sr }) {
	let data = state.lexicon[sr-1]
	function handleData(e) {
		let current_state = getComputedStyle(document.querySelector(".row-data-" + e.target.classList[0].slice(4))).getPropertyValue("display")
		document.querySelector(".row-data-" + e.target.classList[0].slice(4))
			.style.setProperty(
				"display",
				(current_state === "none" ? "table-row" : "none")
			)
	}

	let keys = []
	let values = []
	for (const [key, value] of Object.entries(data)) {
		if (key !== "word" && key !== "meaning" && key !== "time" && key !== "connections") {
			keys = keys.concat(key)
			values = values.concat(value)
		}
	}
	let connections = []
	if (data.connections.length >= 1){
		for (let i=0; i<state.lexicon.length; i++) {
			if (data.connections.includes( state.lexicon[i].time )) {
				connections = connections.concat({
					word: state.lexicon[i].word,
					meaning: state.lexicon[i].meaning,
				})
			}
		}
	}
	return (<>
		<tr className={`row-${sr}`}>
			<th scope="row">
				<label className="control control--checkbox">
					<input className='checks' id={`check-${sr}`} type="checkbox" />
					<div className="control!==indicator"></div>
				</label>
			</th>

			<th className={`itm-${sr}`} onClick={(e) => { handleData(e) }} scope="row" style={{wordWrap: "break-word"}}>{sr}</th>
			<td className={`itm-${sr}`} onClick={(e) => { handleData(e) }} style={{wordWrap: "break-word", maxWidth: "10vw"}}>{data.word}</td>
			<td className={`itm-${sr}`} onClick={(e) => { handleData(e) }} style={{wordWrap: "break-word", maxWidth: "55vw"}}>{data.meaning}</td>
		</tr>
		<tr className={`row-data-${sr}`} style={{ display: "none" }} ><td colSpan={4}>
			{/* <table className='table table-sm table-bordered border-secondary' style={{ width: "80%", margin: "auto" }}> */}
			{/* <table className={`text-${state.theme[0].i} table table-sm table-bordered border-secondary`} style={{ width: "80%", margin: "auto", backgroundColor: `rgba(0, 0, 0, 0.075)`  }}> */}
			<table className={`text-${state.theme[0].i} table table-sm table-bordered border-secondary`} style={{ width: "80%", margin: "auto", backgroundColor: `rgba(0, 0, 0, ${state.theme[0].k})`  }}>
				<tbody>
					{Array.from({ length: keys.length }, (v, i) => i).map((i) => {
						return (
						<tr key={i}>
							<th className='px-4'>{keys[i]}</th>
							<td className='px-4'>{values[i]}</td>
						</tr>
						)
					})}

				</tbody>
			</table>
			{(data.connections.length>0) &&
			<h5 className='text-center my-3'>Connections</h5>
			}
			{/* <table className='table table-sm table-bordered border-secondary' style={{ width: "80%", margin: "auto" }}> */}
			{/* <table className={`text-${state.theme[0].i} table table-sm table-bordered border-secondary`} style={{ width: "80%", margin: "auto", backgroundColor: `rgba(0, 0, 0, 0.075)`  }}> */}
			<table className={`text-${state.theme[0].i} table table-sm table-bordered border-secondary`} style={{ width: "80%", margin: "auto", backgroundColor: `rgba(0, 0, 0, ${state.theme[0].k})`  }}>
				<tbody>
					{Array.from({ length: connections.length }, (v, i) => i).map((i) => {
						return (
						<tr key={i}>
							<th className='px-4'>{connections[i].word}</th>
							<td className='px-4'>{connections[i].meaning}</td>
						</tr>
						)
					})}

				</tbody>
			</table>
		</td></tr>
	</>)
}