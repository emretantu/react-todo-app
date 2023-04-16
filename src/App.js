import './App.css';
import Todo from './components/Todo';

function App() {

  const INITIAL_LIST = [
    {id: 1, title: "Todo 1", isDone: false},
    {id: 2, title: "Todo 2", isDone: false},
    {id: 3, title: "Todo 3", isDone: true},
    {id: 4, title: "Todo 4", isDone: false},
  ];

  return (
    <Todo list={INITIAL_LIST} />
  );
}

export default App;