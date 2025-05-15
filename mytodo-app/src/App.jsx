// App.jsx
import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Tabs } from "./components/Tabs";
import { TodoInput } from "./components/TodoInput";
import { TodoList } from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const [selectedTab, setSelecdtedTab] = useState('Open');

  const [todoInputValue, setTodoInputValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodoIndex, setCurrentTodoIndex] = useState(null);

  useEffect(() => {
    let storedTodos = [];
    try {
      const item = localStorage.getItem('todo-app');
      if (item) {
        storedTodos = JSON.parse(item).todos || [];
      }
    } catch (e) {
      console.error("Failed to parse todos from localStorage", e);
      storedTodos = [];
    }
    
    if (storedTodos.length === 0) {
        setTodos([{ input: 'Hello! Add your first todo!', complete: true, id: Date.now() }]);
    } else {
        setTodos(storedTodos.map((todo, index) => ({ ...todo, id: todo.id || Date.now() + index })));
    }
  }, []);

  function handleSaveData(currentTodos) {
    localStorage.setItem('todo-app', JSON.stringify({ todos: currentTodos }));
  }

  function handleAddOrUpdateTodo(text) {
    const newText = text.trim();
    if (newText === "") {
        if (isEditing) { // If editing and input is cleared, effectively cancel edit
            setIsEditing(false);
            setCurrentTodoIndex(null);
            setTodoInputValue("");
        }
        return;
    }

    let newTodoList;
    if (isEditing && currentTodoIndex !== null) {
      newTodoList = todos.map((todo, index) =>
        index === currentTodoIndex ? { ...todo, input: newText } : todo
      );
      setIsEditing(false);
      setCurrentTodoIndex(null);
    } else {
      const newTodo = { input: newText, complete: false, id: Date.now() };
      newTodoList = [...todos, newTodo];
    }
    setTodos(newTodoList);
    handleSaveData(newTodoList);
    setTodoInputValue("");
  }

  function handleCompleteTodo(index) {
    let newTodoList = [...todos];
    if (newTodoList[index]) {
        newTodoList[index].complete = !newTodoList[index].complete;
        setTodos(newTodoList);
        handleSaveData(newTodoList);
    }
  }

  function handleDeleteTodo(indexToDelete) {
    let newTodoList = todos.filter((_, index) => index !== indexToDelete);
    setTodos(newTodoList);
    handleSaveData(newTodoList);
    if (isEditing && currentTodoIndex === indexToDelete) {
      setIsEditing(false);
      setCurrentTodoIndex(null);
      setTodoInputValue("");
    }
  }
  
  function handleInitiateEdit(indexToEdit, currentText) {
    setIsEditing(true);
    setCurrentTodoIndex(indexToEdit);
    setTodoInputValue(currentText);
  }

  function handleCancelEdit() {
    setIsEditing(false);
    setCurrentTodoIndex(null);
    setTodoInputValue("");
  }
  
  // The old handleEditData is no longer primary for card edits if using handleInitiateEdit
  // Keep it if it's used for other purposes, or remove if fully replaced.
  // For now, we'll assume the card edit uses handleInitiateEdit.
  /*
  function handleEditData(index, updateInput) {
    let newTodoList = [...todos];
    if (newTodoList[index]) {
        newTodoList[index].input = updateInput;
        setTodos(newTodoList);
        handleSaveData(newTodoList);
    }
  }
  */

  return (
    <>
      <Header todos={todos} />
      <Tabs selectedTab={selectedTab} setSelecdtedTab={setSelecdtedTab} todos={todos} />
      <TodoList
        // handleEditData={handleEditData} // Pass this if it's still used for other edit types
        handleCompleteTodo={handleCompleteTodo}
        handleDeleteTodo={handleDeleteTodo}
        handleInitiateEdit={handleInitiateEdit}
        selectedTab={selectedTab}
        todos={todos}
      />
      <TodoInput
         onFormSubmit={handleAddOrUpdateTodo}
         inputValue={todoInputValue}
         setInputValue={setTodoInputValue}
         isEditing={isEditing}
         onCancelEdit={handleCancelEdit}
      />
    </>
  );
}

export default App;