import React, { useState } from 'react';

const TodoList = () => {
    const [todos, setTodos] = useState([
        { id: 1, text: 'Initial Todo', completed: false }
    ]);
    const [newTodo, setNewTodo] = useState('');

    const addTodo = (e) => {
        e.preventDefault();
        if (!newTodo.trim()) return;
        setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
        setNewTodo('');
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
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add a new todo"
                />
                <button type="submit">Add Todo</button>
            </form>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        <span
                            onClick={() => toggleTodo(todo.id)}
                            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                        >
                            {todo.text}
                        </span>
                        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;