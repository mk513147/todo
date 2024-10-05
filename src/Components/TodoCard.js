import React, { useState } from 'react'

export default function TodoCard(props) {
  const { children, handleDeleteTodo, id, handleEditTodo } = props
  const [isCollapsing, setIsCollapsing] = useState(false);
  const [isChecked, setIsChecked] = useState(false); // State to track checkbox status

  const handleDeleteClick = () => {
    // Trigger collapsing animation
    setIsCollapsing(true);

    // Wait for the animation to complete before deleting the todo
    setTimeout(() => {
      handleDeleteTodo(id);
    }, 300);
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked); // Update based on the checkbox's checked value
  };

  return (
    <div >
      <li className={`todoItem ${isCollapsing ? 'collapsing' : 'slide-up'} ${isChecked ? 'completed' : ''}`}>
        <div style={{display: 'flex',
          alignItems: 'center'
        }}>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange} // Handle checkbox change
            className='checkbox'
          />
          <span className={isChecked ? 'strikethrough' : ''}>{children}</span>
        </div>
        <div className="actionsContainer">
          <button onClick={() => {
            handleEditTodo(id);
          }}>
            <i className="fa-solid fa-pen-to-square"></i></button>
          <button onClick={handleDeleteClick}>
            <i className="fa-solid fa-trash"></i></button>
        </div>
      </li>
    </div>
  )
}

