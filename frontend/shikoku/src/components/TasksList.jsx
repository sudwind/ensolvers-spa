import React, { useEffect, useState } from 'react';
import TasksForm from './TasksForm';
import Task from './Task';

const TasksList = () => {
	const [tasks, setTasks] = useState([]);

	const fetchTasks = async () => {
		await fetch('http://localhost:5000/api/tasks', {
			method: "GET"
		})
			.then(async (res) => {
				const text = await res.text();
				return text === "" ? [] : JSON.parse(text)
			})
			.then((res) => {
				console.log(res)
				setTasks(res)
			}).catch((e) => console.error(e))
	}

	const addTasks = async task => {
		if (!task.taskText || /^\s*$/.test(task.taskText)) {
			return;
		}
		await fetch(`http://localhost:5000/api/tasks/`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(task)
		})

		fetchTasks()
	}

	useEffect(() => {
		fetchTasks()
	}, [])

	return (
		<div className='tasks-list'>
			<h1 className='tasks-list-header'>To-Do List</h1>
			<TasksForm onSubmit={addTasks} />
			{
				tasks.map((task, index) => {
					return (
						<Task taskData={task} key={index} tasks={tasks} fetchTodos={fetchTasks} />
					)
				})
			}
			
		</div>
	)
}

export default TasksList
