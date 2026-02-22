import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoList from '../components/TodoList';

describe('TodoList Component', () => {
    describe('Initial Render', () => {
        test('renders the TodoList component with title', () => {
            render(<TodoList />);
            const title = screen.getByRole('heading', { level: 1, name: /todo list/i });
            expect(title).toBeInTheDocument();
        });

        test('renders initial todos from state', () => {
            render(<TodoList />);
            const todosList = screen.getByTestId('todos-list');
            expect(todosList).toBeInTheDocument();

            expect(screen.getByText('Learn React')).toBeInTheDocument();
            expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
            expect(screen.getByText('Master Testing')).toBeInTheDocument();
        });

        test('renders the AddTodoForm component', () => {
            render(<TodoList />);
            const input = screen.getByTestId('todo-input');
            const addButton = screen.getByTestId('add-button');

            expect(input).toBeInTheDocument();
            expect(addButton).toBeInTheDocument();
        });

        test('initial todos have correct structure', () => {
            render(<TodoList />);
            const checkboxes = screen.getAllByRole('checkbox');

            expect(checkboxes).toHaveLength(3);
            checkboxes.forEach(checkbox => {
                expect(checkbox.checked).toBe(false);
            });
        });
    });

    describe('Adding Todos', () => {
        test('adds a new todo when form is submitted', async () => {
            const user = userEvent.setup();
            render(<TodoList />);

            const input = screen.getByTestId('todo-input');
            const addButton = screen.getByTestId('add-button');

            await user.type(input, 'Buy groceries');
            await user.click(addButton);

            expect(screen.getByText('Buy groceries')).toBeInTheDocument();
        });

        test('clears input field after adding a todo', async () => {
            const user = userEvent.setup();
            render(<TodoList />);

            const input = screen.getByTestId('todo-input');
            const addButton = screen.getByTestId('add-button');

            await user.type(input, 'New todo');
            await user.click(addButton);

            expect(input.value).toBe('');
        });

        test('does not add empty todos', async () => {
            const user = userEvent.setup();
            render(<TodoList />);

            const input = screen.getByTestId('todo-input');
            const addButton = screen.getByTestId('add-button');

            // Initially 3 todos
            let todoItems = screen.getAllByRole('checkbox');
            expect(todoItems).toHaveLength(3);

            // Try to add empty todo
            await user.click(addButton);

            // Should still be 3 todos
            todoItems = screen.getAllByRole('checkbox');
            expect(todoItems).toHaveLength(3);
        });

        test('does not add todos with only whitespace', async () => {
            const user = userEvent.setup();
            render(<TodoList />);

            const input = screen.getByTestId('todo-input');
            const addButton = screen.getByTestId('add-button');

            let todoItems = screen.getAllByRole('checkbox');
            expect(todoItems).toHaveLength(3);

            await user.type(input, '   ');
            await user.click(addButton);

            todoItems = screen.getAllByRole('checkbox');
            expect(todoItems).toHaveLength(3);
            // Input still contains the whitespace since the todo wasn't added
            expect(input.value).toBe('   ');
        });

        test('can add multiple todos sequentially', async () => {
            const user = userEvent.setup();
            render(<TodoList />);

            const input = screen.getByTestId('todo-input');
            const addButton = screen.getByTestId('add-button');

            await user.type(input, 'First todo');
            await user.click(addButton);

            await user.type(input, 'Second todo');
            await user.click(addButton);

            expect(screen.getByText('First todo')).toBeInTheDocument();
            expect(screen.getByText('Second todo')).toBeInTheDocument();

            const todoItems = screen.getAllByRole('checkbox');
            expect(todoItems).toHaveLength(5); // 3 initial + 2 new
        });

        test('submits form when Enter key is pressed', async () => {
            const user = userEvent.setup();
            render(<TodoList />);

            const input = screen.getByTestId('todo-input');

            await user.type(input, 'Submit with Enter');
            await user.keyboard('{Enter}');

            expect(screen.getByText('Submit with Enter')).toBeInTheDocument();
            expect(input.value).toBe('');
        });
    });

    describe('Toggling Todos', () => {
        test('toggles todo completion status when checkbox is clicked', async () => {
            const user = userEvent.setup();
            render(<TodoList />);

            const checkbox = screen.getByRole('checkbox', { name: /mark "learn react"/i });
            expect(checkbox.checked).toBe(false);

            await user.click(checkbox);
            expect(checkbox.checked).toBe(true);

            await user.click(checkbox);
            expect(checkbox.checked).toBe(false);
        });

        test('marks todo text as completed with strikethrough style', async () => {
            const user = userEvent.setup();
            render(<TodoList />);

            const checkbox = screen.getByRole('checkbox', { name: /mark "learn react"/i });
            const todoText = screen.getByText('Learn React');

            expect(todoText).not.toHaveClass('completed');

            await user.click(checkbox);
            expect(todoText).toHaveClass('completed');

            await user.click(checkbox);
            expect(todoText).not.toHaveClass('completed');
        });

        test('multiple todos can be toggled independently', async () => {
            const user = userEvent.setup();
            render(<TodoList />);

            const checkboxes = screen.getAllByRole('checkbox');

            await user.click(checkboxes[0]);
            expect(checkboxes[0].checked).toBe(true);
            expect(checkboxes[1].checked).toBe(false);
            expect(checkboxes[2].checked).toBe(false);

            await user.click(checkboxes[2]);
            expect(checkboxes[0].checked).toBe(true);
            expect(checkboxes[1].checked).toBe(false);
            expect(checkboxes[2].checked).toBe(true);
        });

        test('newly added todo is not marked as completed', async () => {
            const user = userEvent.setup();
            render(<TodoList />);

            const input = screen.getByTestId('todo-input');
            const addButton = screen.getByTestId('add-button');

            await user.type(input, 'New incomplete todo');
            await user.click(addButton);

            const checkbox = screen.getByRole('checkbox', { name: /mark "new incomplete todo"/i });
            expect(checkbox.checked).toBe(false);
        });
    });

    describe('Deleting Todos', () => {
        test('deletes a todo when delete button is clicked', async () => {
            const user = userEvent.setup();
            render(<TodoList />);

            expect(screen.getByText('Learn React')).toBeInTheDocument();

            const deleteButton = screen.getByRole('button', { name: /delete "learn react"/i });
            await user.click(deleteButton);

            expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
        });

        test('removes correct todo when multiple delete buttons are present', async () => {
            const user = userEvent.setup();
            render(<TodoList />);

            expect(screen.getByText('Learn React')).toBeInTheDocument();
            expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
            expect(screen.getByText('Master Testing')).toBeInTheDocument();

            const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
            // Delete the second todo
            await user.click(deleteButtons[1]);

            expect(screen.getByText('Learn React')).toBeInTheDocument();
            expect(screen.queryByText('Build a Todo App')).not.toBeInTheDocument();
            expect(screen.getByText('Master Testing')).toBeInTheDocument();
        });

        test('can delete all todos', async () => {
            const user = userEvent.setup();
            render(<TodoList />);

            const deleteButtons = screen.getAllByRole('button', { name: /delete/i });

            // Delete all todos (we have 3 initial todos)
            for (let i = 0; i < 3; i++) {
                const buttons = screen.getAllByRole('button', { name: /delete/i });
                await user.click(buttons[0]);
            }

            expect(screen.getByText(/no todos yet/i)).toBeInTheDocument();
        });

        test('displays empty state message when all todos are deleted', async () => {
            const user = userEvent.setup();
            render(<TodoList />);

            let todoItems = screen.getAllByRole('checkbox');
            const initialCount = todoItems.length;

            for (let i = 0; i < initialCount; i++) {
                const buttons = screen.getAllByRole('button', { name: /delete/i });
                await user.click(buttons[0]);
            }

            expect(screen.getByText('No todos yet. Add one to get started!')).toBeInTheDocument();
        });

        test('can delete a completed todo', async () => {
            const user = userEvent.setup();
            render(<TodoList />);

            const checkbox = screen.getByRole('checkbox', { name: /mark "learn react"/i });
            await user.click(checkbox);

            const deleteButton = screen.getByRole('button', { name: /delete "learn react"/i });
            await user.click(deleteButton);

            expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
        });

        test('deleted todo is completely removed from the DOM', async () => {
            const user = userEvent.setup();
            render(<TodoList />);

            const todosBefore = screen.getAllByRole('checkbox');
            const initialCount = todosBefore.length;

            const deleteButton = screen.getByRole('button', { name: /delete "learn react"/i });
            await user.click(deleteButton);

            const todosAfter = screen.getAllByRole('checkbox');
            expect(todosAfter).toHaveLength(initialCount - 1);
        });
    });

    describe('Integration Tests', () => {
        test('add, toggle, and delete work together seamlessly', async () => {
            const user = userEvent.setup();
            render(<TodoList />);

            // Add a new todo
            const input = screen.getByTestId('todo-input');
            const addButton = screen.getByTestId('add-button');

            await user.type(input, 'Integration test todo');
            await user.click(addButton);

            expect(screen.getByText('Integration test todo')).toBeInTheDocument();

            // Toggle it
            const checkbox = screen.getByRole('checkbox', { name: /mark "integration test todo"/i });
            await user.click(checkbox);
            expect(checkbox.checked).toBe(true);

            // Delete it
            const deleteButton = screen.getByRole('button', { name: /delete "integration test todo"/i });
            await user.click(deleteButton);

            expect(screen.queryByText('Integration test todo')).not.toBeInTheDocument();
        });

        test('complete workflow with multiple operations', async () => {
            const user = userEvent.setup();
            render(<TodoList />);

            // Add two new todos
            const input = screen.getByTestId('todo-input');
            const addButton = screen.getByTestId('add-button');

            await user.type(input, 'Task 1');
            await user.click(addButton);

            await user.type(input, 'Task 2');
            await user.click(addButton);

            // Toggle first new task
            const checkboxes = screen.getAllByRole('checkbox');
            await user.click(checkboxes[3]); // Fourth checkbox (Task 1)

            // Delete second initial task
            const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
            await user.click(deleteButtons[1]);

            // Verify state
            expect(screen.getByText('Learn React')).toBeInTheDocument();
            expect(screen.queryByText('Build a Todo App')).not.toBeInTheDocument();
            expect(screen.getByText('Master Testing')).toBeInTheDocument();
            expect(screen.getByText('Task 1')).toBeInTheDocument();
            expect(screen.getByText('Task 2')).toBeInTheDocument();

            const task1Checkbox = screen.getByRole('checkbox', { name: /mark "task 1"/i });
            expect(task1Checkbox.checked).toBe(true);
        });
    });
});
