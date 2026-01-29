import Search from './components/Search';

function App() {
  return (
    // 'min-h-screen' makes sure the background covers the whole page
    <div className="App min-h-screen bg-gray-50 py-10">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">
          GitHub User Search
        </h1>
      </header>

      <main>
        <Search />
      </main>
    </div>
  );
}

export default App;