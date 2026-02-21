import React, { useState } from 'react';
import AddTodoForm from './AddTodoForm';

const TodoList = () => {
    const [todos, setTodos] = useState([
        { id: 1, text: 'Initial Todo', completed: false }
    ]);

    const addTodo = (text) => {
        setTodos([...todos, { id: Date.now(), text, completed: false }]);
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const toggleTodo = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    return (
        <div>
            <h1>Todo List</h1>
            <AddTodoForm addTodo={addTodo} />
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