export const initialTasks = []

function tasksReducer(tasks,action) {
    switch(action.type) {
        case 'added_task' : {
            return [
                ...tasks, {
                    id:action.id,
                    text:action.text,
                    isCompleted:false
                }
            ]
        }
        case 'deleted_task' : {
            return tasks.filter((t) => t.id !== action.id)
        }
    }
}

export default tasksReducer