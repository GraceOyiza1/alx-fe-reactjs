/** @jest-environment jsdom */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';

describe('TodoList Component Tests', () => {
    test('renders correctly and shows initial todo', () => {
        render(<TodoList />);
        // Checks for the header
        expect(screen.getByText('Todo List')).toBeInTheDocument();
        // Checks for your specific initial state text
        expect(screen.getByText('Initial Todo')).toBeInTheDocument();
    });

    test('adds a new todo item', () => {
        render(<TodoList />);
        const input = screen.getByPlaceholderText('Add a new todo');
        const addButton = screen.getByText('Add Todo');

        fireEvent.change(input, { target: { value: 'New Task' } });
        fireEvent.click(addButton);

        expect(screen.getByText('New Task')).toBeInTheDocument();
    });

    test('toggles a todo completion status (line-through)', () => {
        render(<TodoList />);
        const todoText = screen.getByText('Initial Todo');

        // Check initial state (no line-through)
        expect(todoText).toHaveStyle('text-decoration: none');

        // Click to toggle
        fireEvent.click(todoText);
        expect(todoText).toHaveStyle('text-decoration: line-through');

        // Click again to toggle back
        fireEvent.click(todoText);
        expect(todoText).toHaveStyle('text-decoration: none');
    });

    test('deletes a todo item', () => {
        render(<TodoList />);
        const deleteButton = screen.getByText('Delete');

        fireEvent.click(deleteButton);

        // Verify 'Initial Todo' is no longer in the document
        expect(screen.queryByText('Initial Todo')).not.toBeInTheDocument();
    });
});