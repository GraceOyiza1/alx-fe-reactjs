import React from 'react';
import TodoList from './components/TodoList';

function App() {
  return (
    <div className="App">
      {/* 'Todo List' or expects the component to handle its own title */}
      <TodoList />
    </div>
  );
}

export default App;