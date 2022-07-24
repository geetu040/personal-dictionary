import React, { useContext } from 'react'
import { Context } from './ContextTag'
import Row from './Row'

export const Lexicon = () => {
	const state = useContext(Context)

	return (
		// <table className={`table table-hover table-light table-responsive`} style={{width: "100%"}}>
		<table id='table-lexicon' className={`table text-${state.theme[0].i} bg-${state.theme[0].j} table-responsive`} style={{width: "100%"}}>
			<thead>
				<tr>
					<th className={`bg-${state.theme[0].i} text-${state.theme[0].j} text-warning`} scope="col">
						<label className="control control--checkbox">
							<div className="control__indicator"></div>
						</label>
					</th>
					<th className={`bg-${state.theme[0].i} text-${state.theme[0].j} text-warning`} scope="col">#</th>
					<th className={`bg-${state.theme[0].i} text-${state.theme[0].j} text-warning`} scope="col">Words</th>
					<th className={`bg-${state.theme[0].i} text-${state.theme[0].j} text-warning`} scope="col">Meanings</th>
				</tr>
			</thead>
			<tbody id='table_body'>
				{Array.from({ length: state.lexicon.length }, (v, i) => i).map((i) => {
					return (<Row key={i} sr={i+1} />)
				})}
			</tbody>
		</table>
	)
}
