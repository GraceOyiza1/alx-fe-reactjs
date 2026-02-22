import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from './TodoList';

describe('TodoList Component', () => {
    // Test Initial Render
    test('renders TodoList component correctly', () => {
        render(<TodoList />);

        // Check that the heading is rendered
        const heading = screen.getByRole('heading', { name: /todo list/i });
        expect(heading).toBeInTheDocument();

        // Check that the form elements are rendered
        const input = screen.getByPlaceholderText(/add a new todo/i);
        expect(input).toBeInTheDocument();

        const addButton = screen.getByRole('button', { name: /add todo/i });
        expect(addButton).toBeInTheDocument();
    });

    test('renders initial demo todos on first render', () => {
        render(<TodoList />);

        // Check that the demo todos are rendered
        expect(screen.getByText('Learn React')).toBeInTheDocument();
        expect(screen.getByText('Build Todo List')).toBeInTheDocument();

        // Verify that there are at least 2 todo items
        const listItems = screen.getAllByRole('listitem');
        expect(listItems).toHaveLength(2);
    });

    // Test Adding Todos
    test('adds a new todo when form is submitted', () => {
        render(<TodoList />);

        const input = screen.getByPlaceholderText(/add a new todo/i);
        const addButton = screen.getByRole('button', { name: /add todo/i });

        // Type a new todo
        fireEvent.change(input, { target: { value: 'Write Tests' } });
        expect(input.value).toBe('Write Tests');

        // Submit the form
        fireEvent.click(addButton);

        // Check that the new todo is rendered
        expect(screen.getByText('Write Tests')).toBeInTheDocument();

        // Check that the input is cleared
        expect(input.value).toBe('');
    });

    test('does not add a todo with empty input', () => {
        render(<TodoList />);

        const input = screen.getByPlaceholderText(/add a new todo/i);
        const addButton = screen.getByRole('button', { name: /add todo/i });

        // Get initial todo count
        let listItems = screen.getAllByRole('listitem');
        const initialCount = listItems.length;

        // Try to add an empty todo
        fireEvent.click(addButton);

        // Verify the count hasn't changed
        listItems = screen.getAllByRole('listitem');
        expect(listItems).toHaveLength(initialCount);
    });

    test('does not add a todo with only whitespace', () => {
        render(<TodoList />);

        const input = screen.getByPlaceholderText(/add a new todo/i);
        const addButton = screen.getByRole('button', { name: /add todo/i });

        // Get initial todo count
        let listItems = screen.getAllByRole('listitem');
        const initialCount = listItems.length;

        // Try to add a todo with only whitespace
        fireEvent.change(input, { target: { value: '   ' } });
        fireEvent.click(addButton);

        // Verify the count hasn't changed
        listItems = screen.getAllByRole('listitem');
        expect(listItems).toHaveLength(initialCount);
    });

    test('adds multiple todos in sequence', () => {
        render(<TodoList />);

        const input = screen.getByPlaceholderText(/add a new todo/i);
        const addButton = screen.getByRole('button', { name: /add todo/i });

        // Add first todo
        fireEvent.change(input, { target: { value: 'First Todo' } });
        fireEvent.click(addButton);

        // Add second todo
        fireEvent.change(input, { target: { value: 'Second Todo' } });
        fireEvent.click(addButton);

        // Verify both todos are rendered
        expect(screen.getByText('First Todo')).toBeInTheDocument();
        expect(screen.getByText('Second Todo')).toBeInTheDocument();

        // Should have 4 todos (2 initial + 2 added)
        const listItems = screen.getAllByRole('listitem');
        expect(listItems).toHaveLength(4);
    });

    // Test Toggling Todos
    test('toggles todo completion status when text is clicked', () => {
        render(<TodoList />);

        const todoText = screen.getByText('Learn React');

        // Initially, the todo should not have a line-through style
        expect(todoText).toHaveStyle({ textDecoration: 'none' });

        // Click on the todo text to toggle
        fireEvent.click(todoText);

        // After toggling, the todo should have a line-through style
        expect(todoText).toHaveStyle({ textDecoration: 'line-through' });

        // Click again to toggle back
        fireEvent.click(todoText);

        // Should be back to no line-through
        expect(todoText).toHaveStyle({ textDecoration: 'none' });
    });

    test('toggles different todos independently', () => {
        render(<TodoList />);

        const todoText1 = screen.getByText('Learn React');
        const todoText2 = screen.getByText('Build Todo List');

        // Toggle first todo
        fireEvent.click(todoText1);
        expect(todoText1).toHaveStyle({ textDecoration: 'line-through' });
        expect(todoText2).toHaveStyle({ textDecoration: 'none' });

        // Toggle second todo
        fireEvent.click(todoText2);
        expect(todoText1).toHaveStyle({ textDecoration: 'line-through' });
        expect(todoText2).toHaveStyle({ textDecoration: 'line-through' });

        // Toggle first todo back
        fireEvent.click(todoText1);
        expect(todoText1).toHaveStyle({ textDecoration: 'none' });
        expect(todoText2).toHaveStyle({ textDecoration: 'line-through' });
    });

    // Test Deleting Todos
    test('deletes a todo when delete button is clicked', () => {
        render(<TodoList />);

        // Verify initial todo is present
        expect(screen.getByText('Learn React')).toBeInTheDocument();

        // Get the delete button for 'Learn React'
        const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
        const firstDeleteButton = deleteButtons[0];

        // Click the delete button
        fireEvent.click(firstDeleteButton);

        // Verify the todo is removed
        expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
    });

    test('deletes the correct todo among multiple todos', () => {
        render(<TodoList />);

        // Verify both todos exist
        expect(screen.getByText('Learn React')).toBeInTheDocument();
        expect(screen.getByText('Build Todo List')).toBeInTheDocument();

        // Get delete buttons
        const deleteButtons = screen.getAllByRole('button', { name: /delete/i });

        // Delete the second todo
        fireEvent.click(deleteButtons[1]);

        // Verify only 'Learn React' remains
        expect(screen.getByText('Learn React')).toBeInTheDocument();
        expect(screen.queryByText('Build Todo List')).not.toBeInTheDocument();
    });

    test('deletes a newly added todo', () => {
        render(<TodoList />);

        const input = screen.getByPlaceholderText(/add a new todo/i);
        const addButton = screen.getByRole('button', { name: /add todo/i });

        // Add a new todo
        fireEvent.change(input, { target: { value: 'Delete Me' } });
        fireEvent.click(addButton);

        // Verify the todo was added
        expect(screen.getByText('Delete Me')).toBeInTheDocument();

        // Get the delete button for the new todo
        const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
        const lastDeleteButton = deleteButtons[deleteButtons.length - 1];

        // Delete the new todo
        fireEvent.click(lastDeleteButton);

        // Verify the todo was deleted
        expect(screen.queryByText('Delete Me')).not.toBeInTheDocument();
    });

    test('maintains correct todo count after multiple add and delete operations', () => {
        render(<TodoList />);

        const input = screen.getByPlaceholderText(/add a new todo/i);
        const addButton = screen.getByRole('button', { name: /add todo/i });

        // Initial: 2 todos
        let listItems = screen.getAllByRole('listitem');
        expect(listItems).toHaveLength(2);

        // Add 3 todos
        for (let i = 1; i <= 3; i++) {
            fireEvent.change(input, { target: { value: `Todo ${i}` } });
            fireEvent.click(addButton);
        }

        // Should have 5 todos (2 + 3)
        listItems = screen.getAllByRole('listitem');
        expect(listItems).toHaveLength(5);

        // Delete 2 todos by getting fresh delete buttons each time
        let deleteButtons = screen.getAllByRole('button', { name: /delete/i });
        fireEvent.click(deleteButtons[0]);

        // After first deletion, get the buttons again since the DOM has changed
        deleteButtons = screen.getAllByRole('button', { name: /delete/i });
        fireEvent.click(deleteButtons[0]);

        // Should have 3 todos (5 - 2)
        listItems = screen.getAllByRole('listitem');
        expect(listItems).toHaveLength(3);
    });
});
