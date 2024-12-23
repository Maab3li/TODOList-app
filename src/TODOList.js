import { useEffect, useState } from "react"
import { DragDropContext,Droppable, Draggable } from "react-beautiful-dnd"
import "./App.css"

function TODOList() {

  const [newTask,setNewTask] = useState('')
  const[taskList,setTaskList] = useState([])
  const [nextId,setNextId] = useState(1)

  useEffect(()=> {
    const data = localStorage.getItem('goals')
    if(data) {
      setTaskList(JSON.parse(data))
    }
    },[])

  useEffect(()=> {
    localStorage.setItem('goals', JSON.stringify(taskList))
  },[taskList])

  function handleInputChange(e) {
    setNewTask(e.target.value)
    }

    function addTask() {
      if(newTask.trim() !== '') {
        const task = {
          id:nextId,
          text:newTask
        }
        setTaskList(t => [...t, task])
        setNewTask('')
        setNextId(nextId + 1)
      }
    }
  
    function deleteTask(index) {
      const updatedTaskList = taskList.filter((__,i) => i !== index)
      setTaskList(updatedTaskList)
    }
  
    function moveTaskUp(index) {
      if(index > 0) {
        const updatedTaskList = [...taskList];
        [updatedTaskList[index], updatedTaskList[index - 1]] = [updatedTaskList[index - 1], updatedTaskList[index]]
        setTaskList(updatedTaskList)
        }
      }
      
    function moveTaskDown(index) {
      const updatedTaskList = [...taskList];
      if(index < updatedTaskList.length) {
        [updatedTaskList[index], updatedTaskList[index + 1]] = [updatedTaskList[index +1], updatedTaskList[index]]
        setTaskList(updatedTaskList)
      }
    }
  
    function resetTasks() {
      setTaskList([])
    }

    function handleOnDragEnd(result) {
      if(!result.destination) {
        return;
      }
      const items = Array.from(taskList);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0 , reorderedItem)

      setTaskList(items)
    }
  
    return (
      <div className="mytodo-list">
        <h1>TODO List</h1>
        <div className="input-div">
        <input type="text" maxLength={40} placeholder="Enter a task..." onChange={handleInputChange} value={newTask} />
        <button type="button" className="btn add-btn" onClick={addTask}>Add Task</button>
        <button type="reset" className="btn reset-btn" onClick={resetTasks}>Reset Tasks</button>
        </div>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="tasks">
            {(provided) => (
              <ol {...provided.droppableProps} ref={provided.innerRef}>
                {taskList.map((task,index) => 
                <Draggable key={task.id} draggableId={task.text} index={index}>
                  {(provided) => (
                    <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} >
                    <span className="text">{task.text}</span>
                    <button className="btn delete-btn" onClick={() => deleteTask(index)}>X</button>
                    <button className="btn moveup-btn" onClick={() => moveTaskUp(index)}>⬆️</button>
                    <button className="btn movedown-btn" onClick={() => moveTaskDown(index)}>⬇️</button>
                  </li>  
                  )}
                </Draggable>
              )}
              {provided.placeholder}
              </ol>
            )}
        </Droppable>
        </DragDropContext>
        </div>
      )
    }


  export default TODOList
  
  