import './App.css';
import Todo from './components/Todo';
import TodoStatus from './components/TodoStatus';
import { useState } from "react"

function App() {

  const INITIAL_LIST = [
    {id: 1, title: "Todo 1", isDone: false},
    {id: 2, title: "Todo 2", isDone: false},
    {id: 3, title: "Todo 3", isDone: true},
    {id: 4, title: "Todo 4", isDone: false},
  ];

  const [dataList, setDataList] = useState(INITIAL_LIST);

  const handleDone = (itemData) => {
    setDataList(
      dataList.map(
        (item) => item === itemData ? {...item, isDone: !item.isDone} : item
      )
    )
  }

  const status = {
    size: dataList.length,
    completed: dataList.reduce((acc, item) => item.isDone ? ++acc : acc, 0),
  }

  return (
    <>
      <TodoStatus status={status} />
      <Todo list={dataList} onChangingDone={handleDone} />
    </>
  );
}

export default App;