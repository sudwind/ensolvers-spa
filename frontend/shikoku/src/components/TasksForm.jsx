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
		<div className='tasks-form'>
			<form onSubmit={handleSubmit} >
				{props.edit ? (
					<>
						<input
							placeholder='Add a new Task...'
							value={input}
							onChange={handleChange}
							name='text'
							ref={inputRef}
							className='tasks-input edit'
							maxLength="26"
						/>
						<button onClick={handleSubmit} className='tasks-button' >
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
							className='tasks-input'
							ref={inputRef}
							maxLength="26"
						/>
						<button onClick={handleSubmit} className='tasks-button edit'>
							Add
						</button>
					</>
				)}
			</form>
		</div>
	)
}

export default TasksForm