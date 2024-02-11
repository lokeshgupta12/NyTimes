import './App.css';
import AppRouter from './utils/appRouter';
import ListDataProvider from './utils/context';

function App() {
  return (
    <div className="App">
      <ListDataProvider>
        <AppRouter />
      </ListDataProvider>
    </div>
  );
}

export default App;
