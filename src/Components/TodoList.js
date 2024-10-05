import React from 'react'
import TodoCard from './TodoCard';

export default function TodoList(props) {
  const { todos } = props

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('text/plain', index); // Store the index of the dragged item
  };

  const handleDrop = (e, index) => {
    const draggedIndex = e.dataTransfer.getData('text/plain'); // Get the dragged index
    const draggedTodo = todos[draggedIndex]; // Get the dragged todo item

    // Create a new array with the reordered items
    const updatedTodos = Array.from(todos);
    updatedTodos.splice(draggedIndex, 1); // Remove the dragged item from the original position
    updatedTodos.splice(index, 0, draggedTodo); // Insert the dragged item at the new position

    // Call the function to update the todos in the parent component
    props.onUpdateTodos(updatedTodos);
  };

  return (
    <div className='main'>
      {todos.map((todo, index) => (
        <div
          key={todo.id}
          draggable
          onDragStart={(e) => handleDragStart(e, index)} // Set the drag start event
          onDrop={(e) => handleDrop(e, index)} // Handle the drop event
          onDragOver={(e) => e.preventDefault()} // Prevent default to allow drop
        >
          <TodoCard {...props} id={todo.id}>
            <p>{todo.text}</p>
          </TodoCard>
        </div>
      ))}
    </div>
  )
}
