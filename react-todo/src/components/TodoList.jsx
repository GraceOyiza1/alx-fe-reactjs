import React, { useState } from 'react';
import AddTodoForm from './AddTodoForm';
import TodoItem from './TodoItem';
import './TodoList.css';

function TodoList() {
    const [todos, setTodos] = useState([
        { id: 1, text: 'Learn React', completed: false },
        { id: 2, text: 'Build a Todo App', completed: false },
        { id: 3, text: 'Master Testing', completed: false },
    ]);

    const handleAddTodo = (text) => {
        const newTodo = {
            id: Math.max(...todos.map(t => t.id), 0) + 1,
            text,
            completed: false,
        };
        setTodos([...todos, newTodo]);
    };

    const handleToggleTodo = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const handleDeleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
        <div className="todo-list-container">
            <h1>Todo List</h1>
            <AddTodoForm onAddTodo={handleAddTodo} />
            <div className="todos" data-testid="todos-list">
                {todos.length > 0 ? (
                    todos.map(todo => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onToggle={handleToggleTodo}
                            onDelete={handleDeleteTodo}
                            data-testid={`todo-item-${todo.id}`}
                        />
                    ))
                ) : (
                    <p className="no-todos">No todos yet. Add one to get started!</p>
                )}
            </div>
        </div>
    );
}

export default TodoList;
