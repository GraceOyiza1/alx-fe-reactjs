/** @jest-environment jsdom */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';

describe('TodoList', () => {
    test('renders correctly', () => {
        render(<TodoList />);
        expect(screen.getByText('Todo List')).toBeInTheDocument();
    });

    test('renders the initial todos', () => {
        render(<TodoList />);
        expect(screen.getByText('Initial Todo')).toBeInTheDocument();
    });

    test('adds a new todo', () => {
        render(<TodoList />);
        const input = screen.getByPlaceholderText('Add a new todo');
        const addButton = screen.getByText('Add Todo');

        fireEvent.change(input, { target: { value: 'New Task' } });
        fireEvent.click(addButton);

        expect(screen.getByText('New Task')).toBeInTheDocument();
    });

    test('toggles a todo', () => {
        render(<TodoList />);
        const todo = screen.getByText('Initial Todo');
        fireEvent.click(todo);
        expect(todo).toHaveStyle('text-decoration: line-through');
    });

    test('deletes a todo', () => {
        render(<TodoList />);
        const deleteBtn = screen.getByText('Delete');
        fireEvent.click(deleteBtn);
        expect(screen.queryByText('Initial Todo')).not.toBeInTheDocument();
    });
});