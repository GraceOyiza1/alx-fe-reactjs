import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';

describe('TodoList Component', () => {
    test('renders the initial render of TodoList and demo todos', () => {
        render(<TodoList />);
        expect(screen.getByText('Todo List')).toBeInTheDocument();
        expect(screen.getByText('Learn React')).toBeInTheDocument();
    });

    test('allows users to add a new todo', () => {
        render(<TodoList />);
        const input = screen.getByPlaceholderText('Add a todo');
        const button = screen.getByText('Add Todo');

        fireEvent.change(input, { target: { value: 'New Test Todo' } });
        fireEvent.click(button);

        expect(screen.getByText('New Test Todo')).toBeInTheDocument();
    });

    test('allows users to toggle a todo completion status', () => {
        render(<TodoList />);
        const todoItem = screen.getByText('Learn React');

        fireEvent.click(todoItem);
        expect(todoItem.parentElement).toHaveStyle('text-decoration: line-through');

        fireEvent.click(todoItem);
        expect(todoItem.parentElement).toHaveStyle('text-decoration: none');
    });

    test('allows users to delete a todo', () => {
        render(<TodoList />);
        const todoToDelete = screen.getByText('Learn React');
        const deleteButton = screen.getAllByText('Delete')[0];

        fireEvent.click(deleteButton);
        expect(todoToDelete).not.toBeInTheDocument();
    });
});