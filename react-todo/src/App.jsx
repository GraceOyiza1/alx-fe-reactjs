import React from 'react';
// string
import TodoList from './components/TodoList';

function App() {
  return (
    <div className="App">
      <h1>My Todo Application</h1>
      {/*TodoList component tag */}
      <TodoList />
    </div>
  );
}

export default App;