import React, { useState } from 'react';
import './AddTodoForm.css';

function AddTodoForm({ onAddTodo }) {
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            onAddTodo(input);
            setInput('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="add-todo-form">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Add a new todo..."
                className="todo-input"
                data-testid="todo-input"
            />
            <button type="submit" className="add-btn" data-testid="add-button">
                Add
            </button>
        </form>
    );
}

export default AddTodoForm;
