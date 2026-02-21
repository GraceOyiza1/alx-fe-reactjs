import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';

describe('TodoList Component', () => {
    test('renders TodoList correctly with initial todos', () => {
        render(<TodoList />);
        expect(screen.getByText('Todo List')).toBeInTheDocument();
        expect(screen.getByText('Learn React')).toBeInTheDocument();
    });

    test('adds a new todo item', () => {
        render(<TodoList />);
        const input = screen.getByPlaceholderText('Add a new todo');
        const addButton = screen.getByText('Add Todo');

        fireEvent.change(input, { target: { value: 'New ALX Todo' } });
        fireEvent.click(addButton);

        expect(screen.getByText('New ALX Todo')).toBeInTheDocument();
    });

    test('toggles todo completion status', () => {
        render(<TodoList />);
        const todoItem = screen.getByText('Learn React');

        fireEvent.click(todoItem);
        expect(todoItem).toHaveStyle('text-decoration: line-through');

        fireEvent.click(todoItem);
        expect(todoItem).not.toHaveStyle('text-decoration: line-through');
    });

    test('deletes a todo item', () => {
        render(<TodoList />);
        const todoToDelete = screen.getByText('Build Todo List');
        // Get the delete button associated with this specific todo
        const deleteButton = todoToDelete.nextSibling;

        fireEvent.click(deleteButton);
        expect(todoToDelete).not.toBeInTheDocument();
    });
});