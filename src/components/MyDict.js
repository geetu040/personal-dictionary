import React, { useContext } from 'react'
import { Lexicon } from './Lexicon'
import AddWord from './AddWord'
import ButtomNav from "./BottomNav"
import { Context } from './ContextTag'

export default function MyDict() {
	const state = useContext(Context)
	return (
		state.lexicon && <div className="container">
			<h1 className='my-5 text-center'>Your Words are listed here</h1>

			<div>
				{(state.addMode || state.lexicon.length === 0) &&
					<AddWord />
				}
				{state.lexicon.length !== 0 &&
					<Lexicon />
				}
				{!state.addMode && state.lexicon.length !== 0 &&
					<ButtomNav />
				}
			</div>

		</div>
	)
}