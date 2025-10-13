import { useEffect, useState } from "react"
import { DragDropContext,Droppable, Draggable } from "react-beautiful-dnd"
import "../App.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons"
import Modal from "../components/Modal"
import { faTrash } from "@fortawesome/free-solid-svg-icons"

function TODOList() {

  const [newTask,setNewTask] = useState('')
  const[taskList,setTaskList] = useState([])
  const [taskId,setTaskId] = useState(1)

  const [openModal,setOpenModal] = useState(false)

  const [currentTheme,setCurrenTheme] = useState(document.querySelector('html').getAttribute('data-theme'))

  useEffect(() => {
    const newtheme = localStorage.getItem('currenttheme')
    if(newtheme) {
    setCurrenTheme(JSON.parse(newtheme))
    }
  },[])

  useEffect(() => {
    document.querySelector('html').setAttribute('data-theme',currentTheme)
    localStorage.setItem('currenttheme',JSON.stringify(currentTheme)) 
  },[currentTheme])

  console.log(currentTheme)

  

  useEffect(()=> {
    const data = localStorage.getItem('Tasks')
    if(data) {
      setTaskList(JSON.parse(data))
    }
    },[])

    useEffect(()=> {
      localStorage.setItem('Tasks', JSON.stringify(taskList))
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
        setCurrenTheme(e.target.value)
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
          <select className="theme-select" title="change theme" onChange={handleThemeChange}>
        <option value='default'></option>
        <option value='default'>Default</option>
        <option value='cupcake'>Cupcake</option>
        <option value='dark'>Dark</option>
        <option value='winter'>Winter</option>
        <option value='leaf'>Leaf</option>
        <option value='purple'>Purple</option>
      </select></h1>
        
        </div>
        <div className="input-div">
        <input type="text" className="input-text" maxLength={40} placeholder="Enter a task..." onChange={handleInputChange} value={newTask} />
        <button type="button" className="btn add-btn" onClick={addTask}>Add Task</button>
        <button type="reset" className="btn reset-btn" onClick={() => taskList.length > 0 ?setOpenModal(true):null}>Reset Tasks</button>
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <div className="text-center w-56 text-gray-600 font-bold">Are you sure you want to delete all tasks?</div>
          <div className="justify-start items-start pt-4 justify-between">
            <button className="bg-red-500 w-20 mr-2" onClick={() => {resetTasks();setOpenModal(false)}}>Yes</button>
            <button className="w-20 shadow-lg text-black ml-2" onClick={() =>setOpenModal(false)}>Cancel</button>
          </div>
        </Modal>
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
                    <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </li>  
                  )}
                </Draggable>
              )}
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