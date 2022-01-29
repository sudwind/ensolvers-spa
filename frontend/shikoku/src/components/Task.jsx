import React, { useState } from 'react';
import TasksForm from './TasksForm';

const Task = ( props ) => {
  const [edit, setEdit] = useState({
    id: null,
    taskText: '',
    completed: false
  })

  const [checkBox, setCheckBox] = useState(props.taskData.completed)

  const handleCheckboxChange = (e) => {
    console.log(e)
    setCheckBox(e.target.value)
    e.target.checked = e.target.value
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
  }

  if (edit.id) {
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
    console.log("checkTodo")
    await fetch(`http://localhost:5000/api/tasks/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({taskText: task.taskText, completed: !task.completed})
    })
    .then((res) => console.log(res))
  }

  return (
    
    <div key={props.index}>
      <div>
        <div>
         <input type="checkbox" onChange={ (e) => { handleCheckboxChange(e) } } checked={checkBox}  onClick={() => setCompletedTask(props.taskData)}></input> 
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
          onClick={() => setEdit({ id: props.taskData.id, taskText: props.taskData.taskText })}
          >
        Edit
        </div>
      </div>
    </div>
  )
}

export default Task