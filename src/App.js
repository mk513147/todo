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

  // let idCounter = 1;  // Initialize the counter outside the component

  const handleAddTodos = (newTodoText) => {
    const newTodo = {
      id: idCounter,  // Increment idCounter each time a new todo is added
      text: newTodoText,
    };

    console.log(idCounter);
    setIdCounter(idCounter+1);

    const newTodoList = [...todos, newTodo];
    setTodos(newTodoList);
    saveData(newTodoList);
  };

  const handleDeleteTodo = (id) => {
    const newTodoList = todos.filter((todo) => todo.id !== id);

    // Reset idCounter based on the remaining todos
    idCounter = newTodoList.length > 0 ? Math.max(...newTodoList.map(todo => todo.id)) + 1 : 1;
    setIdCounter(idCounter);
    console.log(idCounter);

    saveData(newTodoList);
    setTodos(newTodoList);
  };

  const handleEditTodo = (id) => {
    const valueToBeEdited = todos[id];
    setTodoValue(valueToBeEdited);
    saveData(valueToBeEdited);
    handleDeleteTodo(id);
  }

  const handleUpdateTodos = (updatedTodos) => {
    setTodos(updatedTodos);
  };

  useEffect(() => {
    if (!localStorage) {
      return
    }

    let localTodos = localStorage.getItem('todos')
    if (!localTodos) { return }

    localTodos = JSON.parse(localTodos).todos;
    setTodos(localTodos);

  }, [])

  return (
    <>
      <TodoInput todoValue={todoValue} setTodoValue={setTodoValue} handleAddTodos={handleAddTodos} />
      <TodoList todos={todos} handleDeleteTodo={handleDeleteTodo} handleEditTodo={handleEditTodo} onUpdateTodos={handleUpdateTodos}/>
    </>
  );
}

export default App;
