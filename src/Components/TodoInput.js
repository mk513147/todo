import React from 'react'

export default function TodoInput(props) {
    const { handleAddTodos, todoValue, setTodoValue } = props


    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAddTodos(todoValue);
            setTodoValue("");
        }
    };

    return (
        <header>
            <input type="text" value={todoValue} onChange={(e) => {
                setTodoValue(e.target.value)
            }} onKeyDown={handleKeyPress} placeholder='Enter todo' />
            <button onClick={() => { handleAddTodos(todoValue)
                setTodoValue("");
             }}>Add</button>
        </header>
    )
}