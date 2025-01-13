import { useState, useEffect } from "react"
import { Header } from "./components/Header"
import { Tabs } from "./components/Tabs"
import { TodoInput } from "./components/TodoInput"
import { TodoList } from "./components/TodoList"


function App() {  const [todos, setTodos] = useState([
    { input: 'Hello! Add your first todo!', complete: true }
  ])

  const [selectedTab, setSelecdtedTab] = useState('Open')

  function handleAddTodo(newTodo) {
    const newTodoList = [...todos, { input: newTodo, complete: false }]
    setTodos(newTodoList)
    handleSaveData(newTodoList)
  }

  function handleCompleteTodo(index) {
    // update/edit/modify
    let newTodoList = [...todos]
    let completedTodo = todos[index]
    completedTodo['complete'] = true
    newTodoList[index] = completedTodo
    setTodos(newTodoList)
    handleSaveData(newTodoList)
  }

  function handleDeleteTodo(index) {
    let newTodoList = todos.filter((val, valIndex) => {
      return valIndex !== index
    })
    setTodos(newTodoList)
    handleSaveData(newTodoList)
    }
    
    function handleSaveData(curenTodos) {
      localStorage.setItem('todo-app', JSON.stringify({todos : curenTodos}))

    }

    function handleEditData(index, updateInput) {
      let newTodoList = [...todos];
      newTodoList[index].input = updateInput;
      setTodos(newTodoList)
      handleSaveData(newTodoList)
    }

  useEffect(() => {
    if(!localStorage || !localStorage.getItem('todo-app')) 
      { return }
     let db = JSON.parse(localStorage.getItem('todo-app'))
     setTodos(db.todos)
  }, [])

  return (
    <>
      <Header todos={todos}/>
      <Tabs  selectedTab={selectedTab} setSelecdtedTab={setSelecdtedTab} todos={todos}/>
      <TodoList handleEditData={handleEditData} handleCompleteTodo = {handleCompleteTodo}
       handleDeleteTodo={handleDeleteTodo} 
       selectedTab={selectedTab} todos={todos}/>
      <TodoInput handleAddTodo= {handleAddTodo} />
    </>
  )
}

export default App