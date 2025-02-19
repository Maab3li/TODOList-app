import { useEffect, useState } from "react"
import { DragDropContext,Droppable, Draggable } from "react-beautiful-dnd"
import "./App.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faCircleXmark, faSquare } from "@fortawesome/free-regular-svg-icons"

function TODOList() {

  function themeToggler() {
    
  }

  const [newTask,setNewTask] = useState('')
  const[taskList,setTaskList] = useState([])
  const [taskId,setTaskId] = useState(1)

  useEffect(()=> {
    const data = localStorage.getItem('tasks')
    if(data) {
      setTaskList(JSON.parse(data))
    }
    },[])

    useEffect(()=> {
      localStorage.setItem('tasks', JSON.stringify(taskList))
    },[taskList])

  function handleInputChange(e) {
    setNewTask(e.target.value)
    }

    function addTask() {
      if(newTask.trim() !== '') {
        const task = {
          id:taskId,
          text:newTask,
          isCompleted:false
        }
        setTaskList(t => [...t, task])
        setNewTask('')
        setTaskId(taskId + 1)
      }
    }
  
    function deleteTask(index) {
      const updatedTaskList = taskList.filter((__,i) => i !== index)
      setTaskList(updatedTaskList)
    }

   /* 
    useEffect(() => {
      const uncompletedTasks = []
      const completedTasks =[]
      for(let i =0;i<=taskList.length -1;i++) {
        if(taskList[i].isCompleted === false) {
          uncompletedTasks.push(taskList[i])
        }
        else {
          completedTasks.push(taskList[i])
        }
      }
     
      const orderedTasksList = uncompletedTasks.concat(completedTasks)
      setTaskList(orderedTasksList)
      },[taskList])
      */
    
      function handleThemeChange(e) {
        document.querySelector('html').setAttribute('data-theme',`${e.target.value}`)
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

    function completeTask(index) {
      const updatedTaskList = [...taskList]
      updatedTaskList[index].isCompleted = true
      setTaskList(updatedTaskList)
    }

    
    return (
      <div>
      <div className="mytodo-list">
        <div className="flex">
        <h1 className="dark:text-white dark:bg-black flex-1">TODO List 
          <select className="theme-select" title="select theme" onChange={handleThemeChange}>
        <option value='default'></option>
        <option value='default'>default</option>
        <option value='cupcake'>cupcake</option>
        <option value='dark'>dark</option>
        <option value='winter'>winter</option>
      </select></h1>
        
        </div>
        <div className="input-div">
        <input type="text" className="input-text" maxLength={40} placeholder="Enter a task..." onChange={handleInputChange} value={newTask} />
        <button type="button" className="btn add-btn" onClick={addTask}>Add Task</button>
        <button type="reset" className="btn reset-btn" onClick={resetTasks}>Reset Tasks</button>
        </div>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="tasks">
            {(provided) => (
              <ol {...provided.droppableProps} ref={provided.innerRef}>
                {taskList.map((task,index) => 
                <Draggable key={task.id} draggableId={task.text} index={index} completeTask ={completeTask}>
                  {(provided) => (
                    <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} >
                    <span className="text" style={{textDecoration:task.isCompleted?'line-through':''}}>{task.text}</span>
                    <button className="btn complete-btn" disabled ={task.isCompleted} onClick={() => completeTask(index)}>
                     <FontAwesomeIcon icon={faCheckCircle} />
                    </button>
                    <button className="btn delete-btn" onClick={() => deleteTask(index)}>
                    <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
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
        </div>
      )
    }

    


  export default TODOList
  
  /*
  <ol>
  {taskList.filter((task) => 
    task.isCompleted === true
  ).map((task,index) => 
    <li key={task.id} text={task.text} completeTask={completeTask}>
      <span className="text" style={{textDecoration:'line-through'}}> {task.text}{index} </span>
      <button className="btn delete-btn" onClick={() => deleteTask(index)}>X</button>
    </li>
  )}
</ol>
*/