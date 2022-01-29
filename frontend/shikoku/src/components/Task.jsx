import React, { useState } from 'react';
import TasksForm from './TasksForm';

const Task = (props) => {
	const [edit, setEdit] = useState({
		id: null,
		taskText: '',
		completed: false
	})

	const [shouldEdit, setShouldEdit] = useState(false)

	const [checked, setChecked] = useState(false)

	const handleCheckboxChange = (e) => {
		e.target.checked = !e.target.checked
		setChecked(!checked)
	}

	const updateTask = async (id, newValue) => {
		if (!newValue.taskText || /^\s*$/.test(newValue.taskText)) {
			return
		}

		await fetch(`http://localhost:5000/api/tasks/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(newValue)
		})
			.then((res) => console.log(res))

		props.fetchTodos()

	}

	const submitUpdate = value => {
		updateTask(edit.id, value)
		setEdit({
			id: null,
			taskText: ''
		})
		setShouldEdit(false)
	}


	if (shouldEdit === true) {
		return <TasksForm edit={edit} onSubmit={submitUpdate} />
	}

	console.log(props)

	const deleteTask = async task => {
		await fetch(`http://localhost:5000/api/tasks/${task.id}`, {
			method: "DELETE",
		})
			.then((res) => console.log(res))
		props.fetchTodos()
	}

	const setCompletedTask = async task => {
		const _task = { ...task, completed: !task.completed }
		setEdit(_task)
		await fetch(`http://localhost:5000/api/tasks/${_task.id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(_task)
		})
			.then((res) => console.log(res))
	}

	return (

		<div key={props.index}>
			<div>
				<div>
					<input type="checkbox" onChange={(e) => { handleCheckboxChange(e) }} checked={checked} onClick={() => setCompletedTask(props.taskData)}></input>
				</div>
				<div key={props.taskData.id}>
					{props.taskData.taskText}
				</div>
			</div>

			<div>
				<div
					onClick={() => deleteTask(props.taskData)}
				>
					Remove
				</div>
				<div
					onClick={() => {
						setEdit({ ...props.taskData, id: props.taskData.id, taskText: props.taskData.taskText })
						setShouldEdit(true)
					}}
				>
					Edit
				</div>
			</div>
		</div>
	)
}

export default Task