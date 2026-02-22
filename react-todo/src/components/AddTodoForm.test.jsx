import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddTodoForm from './AddTodoForm';

describe('AddTodoForm Component', () => {
    test('renders input field and add button', () => {
        const mockAddTodo = jest.fn();
        render(<AddTodoForm onAddTodo={mockAddTodo} />);

        const input = screen.getByPlaceholderText(/add a new todo/i);
        const button = screen.getByRole('button', { name: /add todo/i });

        expect(input).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    });

    test('calls onAddTodo with input value when form is submitted', () => {
        const mockAddTodo = jest.fn();
        render(<AddTodoForm onAddTodo={mockAddTodo} />);

        const input = screen.getByPlaceholderText(/add a new todo/i);
        const button = screen.getByRole('button', { name: /add todo/i });

        fireEvent.change(input, { target: { value: 'Test Todo' } });
        fireEvent.click(button);

        expect(mockAddTodo).toHaveBeenCalledWith('Test Todo');
    });

    test('clears input field after submission', () => {
        const mockAddTodo = jest.fn();
        render(<AddTodoForm onAddTodo={mockAddTodo} />);

        const input = screen.getByPlaceholderText(/add a new todo/i);
        const button = screen.getByRole('button', { name: /add todo/i });

        fireEvent.change(input, { target: { value: 'Test Todo' } });
        fireEvent.click(button);

        expect(input.value).toBe('');
    });

    test('does not call onAddTodo with empty input', () => {
        const mockAddTodo = jest.fn();
        render(<AddTodoForm onAddTodo={mockAddTodo} />);

        const button = screen.getByRole('button', { name: /add todo/i });
        fireEvent.click(button);

        expect(mockAddTodo).not.toHaveBeenCalled();
    });

    test('does not call onAddTodo with whitespace only input', () => {
        const mockAddTodo = jest.fn();
        render(<AddTodoForm onAddTodo={mockAddTodo} />);

        const input = screen.getByPlaceholderText(/add a new todo/i);
        const button = screen.getByRole('button', { name: /add todo/i });

        fireEvent.change(input, { target: { value: '   ' } });
        fireEvent.click(button);

        expect(mockAddTodo).not.toHaveBeenCalled();
    });

    test('updates input value on change', () => {
        const mockAddTodo = jest.fn();
        render(<AddTodoForm onAddTodo={mockAddTodo} />);

        const input = screen.getByPlaceholderText(/add a new todo/i);

        fireEvent.change(input, { target: { value: 'New Todo' } });

        expect(input.value).toBe('New Todo');
    });
});
