import React from 'react';
import './TodoItem.css';

function TodoItem({ todo, onToggle, onDelete }) {
    return (
        <div className="todo-item">
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
                aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}
            />
            <span className={todo.completed ? 'completed' : ''}>{todo.text}</span>
            <button
                onClick={() => onDelete(todo.id)}
                className="delete-btn"
                aria-label={`Delete "${todo.text}"`}
            >
                Delete
            </button>
        </div>
    );
}

export default TodoItem;
