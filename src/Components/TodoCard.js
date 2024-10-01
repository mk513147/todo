import React,{useState} from 'react'

export default function TodoCard(props) {
  const {children, handleDeleteTodo, index, handleEditTodo} = props
  const [isCollapsing, setIsCollapsing] = useState(false);

  const handleDeleteClick = () => {
    // Trigger collapsing animation
    setIsCollapsing(true);

    // Wait for the animation to complete before deleting the todo
    setTimeout(() => {
      handleDeleteTodo(index);
    }, 300);
  };

  return (
    <div>
      <li className={`todoItem ${isCollapsing ? 'collapsing' : 'slide-up'}`}>
        {children}
        <div className="actionsContainer">
          <button onClick={()=>{
            handleEditTodo(index);
          }}>
          <i className="fa-solid fa-pen-to-square"></i></button>
          <button onClick={handleDeleteClick}>
          <i className="fa-solid fa-trash"></i></button>
          </div>
      </li>
    </div>
  )
}
