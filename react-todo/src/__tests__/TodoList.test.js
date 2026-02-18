import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from '../components/TodoList';
import '@testing-library/jest-dom';

describe('TodoList Component', () => {
    test('renders TodoList component', () => {
        render(<TodoList />);
        expect(screen.getByText('Todo List')).toBeInTheDocument();
    });

    test('adds a new todo', () => {
        render(<TodoList />);
        const input = screen.getByPlaceholderText('Add a todo');
        const button = screen.getByText('Add Todo');
        fireEvent.change(input, { target: { value: 'New Todo' } });
        fireEvent.click(button);
        expect(screen.getByText('New Todo')).toBeInTheDocument();
    });

    // Add tests for toggle and delete here as well
});