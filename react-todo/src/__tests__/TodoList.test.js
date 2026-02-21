/** @jest-environment jsdom */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';

describe('TodoList Component', () => {
    test('renders correctly and shows initial todos', () => {
        render(<TodoList />);
        expect(screen.getByText('Todo List')).toBeInTheDocument();
        expect(screen.getByText('Learn React')).toBeInTheDocument();
        expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    });

    test('adds a new todo', () => {
        render(<TodoList />);
        const input = screen.getByPlaceholderText('Add a new todo');
        const addButton = screen.getByText('Add Todo');

        fireEvent.change(input, { target: { value: 'New Task' } });
        fireEvent.click(addButton);

        expect(screen.getByText('New Task')).toBeInTheDocument();
    });

    test('toggles a todo item', () => {
        render(<TodoList />);
        const todoItem = screen.getByText('Learn React');

        // Click to toggle
        fireEvent.click(todoItem);
        expect(todoItem).toHaveStyle('text-decoration: line-through');

        // Click again to toggle back
        fireEvent.click(todoItem);
        expect(todoItem).not.toHaveStyle('text-decoration: line-through');
    });

    test('deletes a todo item', () => {
        render(<TodoList />);
        const deleteButtons = screen.getAllByText('Delete');

        fireEvent.click(deleteButtons[0]); // Deletes the first todo (Learn React)

        expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
    });
});