import { React } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

export const Word  = ({ state, changeState, API_URL }) => {
	let navigate = useNavigate()
	let {word} = useParams()
	function fetch_data() {
		fetch(API_URL + `lexicon/dictionary-${word}`)
		// fetch(API_URL + `lexicon/abamdom-${word}`)
		.then(response => response.json())
		.then(data => {
			if (state.info === null) { changeState({ info: data }); } 
			else if (state.info.word !== data.word) { changeState({ info: data }); }
		});
	}
	if (state.info === null) {
		fetch_data()
	} else if (state.info.word !== word){
		fetch_data()
	}
	return (
		<div>
			{state.info === null || (state.info === false ?
				<div className="container text-center">
					<h3>Word Not Found</h3>
					<p>Make sure you spelled the word right</p>
				</div>
				:
				<div className='container mb-5 pb-5 text-center'>
					<h1 className='mt-4'><strong> {state.info.word}</strong></h1>
					{state.info.audio_link && <>
						<img className='' onClick={() => { document.getElementById("sound").play() }} src="/speaker.png" alt="Hear" width="30px" />
						<audio id='sound' controls src={state.info.audio_link} style={{ display: "none" }}></audio>
					</>} <br />
					<div onClick={() => { state.info.lexicon.time = Date.now(); changeState({ lexicon: state.lexicon.concat(state.info.lexicon) }) }} className={`btn mt-3 btn-sm bg-${state.theme[0].j} text-${state.theme[0].i}`} style={{ border: "2px solid" }}>Save to My Dictionary</div>
					{state.info.partOfSpeech.length !== 0 &&
						<div className='my-3'><h4> Part of Speech:</h4><div className='d-flex flex-row flex-wrap justify-content-center'>
							{state.info.partOfSpeech.map((e) => {
								return <div key={e} className={`m-1 px-3`} style={{ border: "0.01px solid", borderRadius: "10px" }}>{e}</div>
							})}</div></div>
					}
					{state.info.synonyms.length !== 0 &&
						<div className='my-3'><h4> Synonyms:</h4><div className='d-flex flex-row flex-wrap justify-content-center'>
							{state.info.synonyms.map((e) => {
								return <div key={e} className={`m-1 px-3`} style={{ border: "0.01px solid", borderRadius: "10px", cursor: "pointer" }} onClick={() => { navigate(`/word/${e}`) }}>{e}</div>
							})}</div></div>
					}
					{state.info.antonyms.length !== 0 &&
						<div className='my-3'><h4> Antonyms:</h4><div className='d-flex flex-row flex-wrap justify-content-center'>
							{state.info.antonyms.map((e) => {
								return <div key={e} className={`m-1 px-3`} style={{ border: "0.01px solid", borderRadius: "10px", cursor: "pointer" }} onClick={() => { navigate(`/word/${e}`) }}>{e}</div>
							})}</div></div>
					}
					{state.info.definitions.length !== 0 && <>
						<h4 className='mt-4'>Definitions</h4>
						<ul className="mx-5" style={{ border: "" }}>
							{Array.from({ length: state.info.definitions.length }, (v, i) => i).map((i) => {
								return <li className='text-start' key={i}>{state.info.definitions[i]}</li>
							})}
						</ul>
					</>}
					{state.info.sources.length !== 0 &&
						<div className='my-3'><h4> Sources:</h4><div className='d-flex flex-row flex-wrap justify-content-center'>
							{state.info.sources.map((e) => {
								return <div key={e} className={`m-1 px-3`} style={{ border: "0.01px solid", borderRadius: "10px" }}><a target="_source" className='nav-link' href={e}>{e}</a></div>
							})}</div></div>
					}
				</div>
			)}</div>
	)
}
