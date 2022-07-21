import React from 'react'
import { Lexicon } from './Lexicon'
import AddWord from './AddWord'
import ButtomNav from "./BottomNav"

export default function MyDict({ state, changeState }) {

	return (
		<div className="container">
			<h1 className='my-5 text-center'>Your Words are listed here</h1>

			<div>
				{(state.addMode || state.lexicon.length === 0) &&
					<AddWord state={state} changeState={changeState} />
				}
				{state.lexicon.length !== 0 &&
					<Lexicon state={state} changeState={changeState} />
				}
				{!state.addMode && state.lexicon.length !== 0 &&
					<ButtomNav state={state} changeState={changeState} />
				}
			</div>

		</div>
	)
}