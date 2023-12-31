import { useState } from 'react'
import useLocalStorage from './hooks/useLocalStorage'
import EditForm from './components/EditForm'
import CustomForm from './components/CustomForm'
import TaskList from './components/TaskList'


function App() {
  const [tasks, setTasks] = useLocalStorage('react-tadalist.tasks', []);
  const [editedTask, setEditedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const addTask = (task) => {
    setTasks(prevState => [...prevState, task])
    console.log(task)
  }

  const deleteTask = (id) => {
    setTasks(prevState => prevState.filter(t => t.id !== id));
  }

  const toggleTask = (id) =>{
    setTasks(prevState => prevState.map(t => (
      t.id===id
       ?{ ...t, checked: !t.checked}
       : t
       )))
  }

  const updateTask = (task) =>{
    setTasks(prevState => prevState.map(t => (
      t.id===task.id
       ?{ ...t, name: task.name}
       : t
       )))
       closeEditMode()
  }

  const closeEditMode = () =>{
    setIsEditing(false)
    //previous state focus
  }

  const enterEditMode = (task) => {
    setEditedTask(task)
    setIsEditing(true)
    //setfocusback on original
  }

  return (
    <div className="container">
      <header>
        <h1>Ta-Da</h1>
        <span>The To-Do List for You!</span>
      </header>
      {isEditing && (
      <EditForm 
      editedTask={editedTask}
      updateTask={updateTask}
      closeEditMode={closeEditMode}
      />
      )
      }

      
      <CustomForm addTask={addTask}/>
      {tasks && (
      <TaskList 
      tasks = {tasks}
      deleteTask={deleteTask}
      toggleTask={toggleTask}
      enterEditMode={enterEditMode}
      />
      )
      }
    </div>
  )
}

export default App
