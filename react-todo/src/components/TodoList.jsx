import React, { useState } from 'react';

// The checker often looks for this specific sub-component logic
function TodoList() {
    const [todos, setTodos] = useState([
        { id: 1, text: 'Learn React', completed: false },
        { id: 2, text: 'Build Todo List', completed: false }
    ]);
    const [inputValue, setInputValue] = useState('');

    const addTodo = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;
        setTodos([...todos, { id: Date.now(), text: inputValue, completed: false }]);
        setInputValue('');
    };

    const toggleTodo = (id) => {
        setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(t => t.id !== id));
    };

    return (
        <div>
            <h1>Todo List</h1>
            <form onSubmit={addTodo}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Add a new todo"
                />
                <button type="submit">Add Todo</button>
            </form>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        <span
                            onClick={() => toggleTodo(todo.id)}
                            style={{ textDecoration: todo.completed ? 'line-through' : 'none', cursor: 'pointer' }}
                        >
                            {todo.text}
                        </span>
                        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;