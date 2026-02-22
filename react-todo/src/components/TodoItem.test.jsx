import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoItem from './TodoItem';

describe('TodoItem Component', () => {
    test('renders todo text', () => {
        const mockToggle = jest.fn();
        const mockDelete = jest.fn();
        const todo = { id: 1, text: 'Test Todo', completed: false };

        render(<TodoItem todo={todo} onToggle={mockToggle} onDelete={mockDelete} />);

        expect(screen.getByText('Test Todo')).toBeInTheDocument();
    });

    test('renders delete button', () => {
        const mockToggle = jest.fn();
        const mockDelete = jest.fn();
        const todo = { id: 1, text: 'Test Todo', completed: false };

        render(<TodoItem todo={todo} onToggle={mockToggle} onDelete={mockDelete} />);

        const deleteButton = screen.getByRole('button', { name: /delete/i });
        expect(deleteButton).toBeInTheDocument();
    });

    test('calls onToggle with todo id when text is clicked', () => {
        const mockToggle = jest.fn();
        const mockDelete = jest.fn();
        const todo = { id: 1, text: 'Test Todo', completed: false };

        render(<TodoItem todo={todo} onToggle={mockToggle} onDelete={mockDelete} />);

        const todoText = screen.getByText('Test Todo');
        fireEvent.click(todoText);

        expect(mockToggle).toHaveBeenCalledWith(1);
    });

    test('calls onDelete with todo id when delete button is clicked', () => {
        const mockToggle = jest.fn();
        const mockDelete = jest.fn();
        const todo = { id: 1, text: 'Test Todo', completed: false };

        render(<TodoItem todo={todo} onToggle={mockToggle} onDelete={mockDelete} />);

        const deleteButton = screen.getByRole('button', { name: /delete/i });
        fireEvent.click(deleteButton);

        expect(mockDelete).toHaveBeenCalledWith(1);
    });

    test('applies line-through style when todo is completed', () => {
        const mockToggle = jest.fn();
        const mockDelete = jest.fn();
        const completedTodo = { id: 1, text: 'Completed Todo', completed: true };

        render(<TodoItem todo={completedTodo} onToggle={mockToggle} onDelete={mockDelete} />);

        const todoText = screen.getByText('Completed Todo');
        expect(todoText).toHaveStyle({ textDecoration: 'line-through' });
    });

    test('does not apply line-through style when todo is not completed', () => {
        const mockToggle = jest.fn();
        const mockDelete = jest.fn();
        const incompleteTodo = { id: 1, text: 'Incomplete Todo', completed: false };

        render(<TodoItem todo={incompleteTodo} onToggle={mockToggle} onDelete={mockDelete} />);

        const todoText = screen.getByText('Incomplete Todo');
        expect(todoText).toHaveStyle({ textDecoration: 'none' });
    });

    test('renders span with cursor pointer style', () => {
        const mockToggle = jest.fn();
        const mockDelete = jest.fn();
        const todo = { id: 1, text: 'Test Todo', completed: false };

        render(<TodoItem todo={todo} onToggle={mockToggle} onDelete={mockDelete} />);

        const todoText = screen.getByText('Test Todo');
        expect(todoText).toHaveStyle({ cursor: 'pointer' });
    });
});
