import { useState, useEffect } from "react";
import TodoInput from "./Components/TodoInput";
import TodoList from "./Components/TodoList";

function App() {

  const [todos, setTodos] = useState([]);
  const [todoValue, setTodoValue] = useState("");
  let [idCounter, setIdCounter] = useState(1);

  const saveData = (newList) => {
    localStorage.setItem('todos', JSON.stringify({ todos: newList }))
  }


  useEffect(() => {
    if (!localStorage) {
      return
    }

    let localTodos = localStorage.getItem('todos')
    if (!localTodos) { return }

    localTodos = JSON.parse(localTodos).todos;
    setTodos(localTodos);

  }, [])

  const handleAddTodos = (newTodoText) => {
    const newTodo = {
      id: idCounter,
      text: newTodoText,
    };

    // console.log(idCounter);
    if (newTodo.text !== "") {
      const newTodoList = [...todos, newTodo];
      setTodos(newTodoList);
      saveData(newTodoList);
      setIdCounter(idCounter + 1);
    }
    else {
      return
    }
  };

  const handleDeleteTodo = (id) => {
    const newTodoList = todos.filter((todo) => todo.id !== id);

    // let maxId = 0;

    // for (let i = 0; i < newTodoList.length; i++) {
    //   if (newTodoList[i].id > maxId) {
    //     maxId = newTodoList[i].id;
    //   }
    // }

    // const idCounter = maxId + 1;
    // setIdCounter(idCounter);

    idCounter = newTodoList.length > 0 ? Math.max(...newTodoList.map(todo => todo.id)) + 1 : 1;
    setIdCounter(idCounter);
    // console.log(idCounter);

    saveData(newTodoList);
    setTodos(newTodoList);
  };

  // const handleEditTodo = (id) => {
  //   const valueToBeEdited = todos.id ? todos.id : "";

  //   setTodoValue(valueToBeEdited);

  //   if (valueToBeEdited !== "") {
  //     saveData(valueToBeEdited);
  //   }
  //   handleDeleteTodo(id);
  // }

  const handleEditTodo = (id) => {
    // Find the todo by id in the todos array
    const todoToEdit = todos.find(todo => todo.id === id);
  
    // If the todo is found, set its text as the value to be edited
    if (todoToEdit) {
      setTodoValue(todoToEdit.text); // Set the text for editing
    } else {
      setTodoValue(""); // Optionally set to empty if not found
    }
  
    // You may not want to save immediately when editing
    saveData(todoToEdit); // This line may not be necessary here
  
    // If you want to delete it after setting the edit, you can call this
    handleDeleteTodo(id);
  };
  

  const handleUpdateTodos = (updatedTodos) => {
    setTodos(updatedTodos);
  };


  return (
    <>
      <TodoInput todoValue={todoValue} setTodoValue={setTodoValue} handleAddTodos={handleAddTodos} />
      <TodoList todos={todos} handleDeleteTodo={handleDeleteTodo} handleEditTodo={handleEditTodo} onUpdateTodos={handleUpdateTodos} />
    </>
  );
}

export default App;
