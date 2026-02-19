import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';

describe('TodoList Test Suite', () => {
    test('renders TodoList component', () => {
        render(<TodoList />);
        expect(screen.getByText('Todo List')).toBeInTheDocument();
    });

    test('adds a new todo', () => {
        render(<TodoList />);
        const addButton = screen.getByText('Add Todo');
        fireEvent.click(addButton);
        expect(screen.getByText('New Todo')).toBeInTheDocument();
    });
});