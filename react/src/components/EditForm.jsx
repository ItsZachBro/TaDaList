import { useEffect, useState } from "react";

const EditForm = ({editedTask, updateTask, closeEditMode}) => {
    const [updatedTaskName, setUpdatedTaskName] = useState(editedTask.name);

    useEffect(()=> {
        const closeModalIfEscaped = (e) => {
          e.key === "Escape" && closeEditMode();
        }
    
        window.addEventListener('keydown', closeModalIfEscaped)
    
        return () => {
          window.removeEventListener('keydown', closeModalIfEscaped)
        }
      }, [closeEditMode])
    
      const handleFormSubmit = (e) => {
        e.preventDefault();
        updateTask({...editedTask, name: updatedTaskName})
      }


    return (
        <div 
        role="dialog" 
        aria-labelledby="editTask" 
        onClick={(e) => {e.target === e.currentTarget && closeEditMode()}}
        >
        <form className="todo"
            onSubmit={handleFormSubmit}
        >

            <div 
            className="wrapper">
                <input
                    type="text"
                    id="task"
                    className="input"
                    value={updatedTaskName}
                    onInput={(e) => setUpdatedTaskName(e.target.value)}
                    required
                    autoFocus
                    maxLength={60}
                    placeholder="Edit Task"
                />
                <label
                    htmlFor="editTask"
                    className="label"
                >Edit Task</label>
            </div>
            <button
                className="btn"
                aria-label="Edit Preexisting Task"
                type="submit">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
</svg>

            </button>

        </form>
        </div>
    )
}

export default EditForm