import React, { useState } from 'react';

const TodoList = () => {
    const [todos, setTodos] = useState([
        { id: 1, text: 'Initial Todo', completed: false }
    ]);

    const addTodo = (text) => setTodos([...todos, { id: Date.now(), text, completed: false }]);
    const toggleTodo = (id) => setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    const deleteTodo = (id) => setTodos(todos.filter(t => t.id !== id));

    return (
        <div>
            <h1>Todo List</h1>
            <button onClick={() => addTodo('New Todo')}>Add Todo</button>
            {todos.map(todo => (
                <div key={todo.id}>
                    <span onClick={() => toggleTodo(todo.id)}>{todo.text}</span>
                    <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};
export default TodoList;