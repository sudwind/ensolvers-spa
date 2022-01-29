import React, { useState, useEffect, useRef } from 'react';

const TasksForm = (props) => {
	const [input, setInput] = useState(props.edit ? props.edit.taskText : '')

	const inputRef = useRef(null)

	useEffect(() => {
		inputRef.current.focus()
	})

	const handleChange = e => {
		setInput(e.target.value)
	}

	const handleSubmit = e => {
		e.preventDefault()

		props.onSubmit({
			taskText: input,
			completed: false
		})
		setInput('')
	}

	return (
		<form onSubmit={handleSubmit} >
			{props.edit ? (
				<>
					<input
						placeholder='Add a new Task...'
						value={input}
						onChange={handleChange}
						name='text'
						ref={inputRef}
						maxLength="26"
					/>
					<button onClick={handleSubmit} >
						Update
					</button>
				</>
			) : (
				<>
					<input
						placeholder='Add a new Task...'
						value={input}
						onChange={handleChange}
						name='text'
						ref={inputRef}
						maxLength="26"
					/>
					<button onClick={handleSubmit}>
						Add
					</button>
				</>
			)}
		</form>
	)
}

export default TasksForm