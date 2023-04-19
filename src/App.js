import './App.css';
import Todo from './components/Todo';
import TodoStatus from './components/TodoStatus';
import { useState } from "react"

function App() {

  const INITIAL_LIST = [
    {title: "Creating basic todo list", isDone: true},
    {title: "Dynamic status message", isDone: true},
    {title: "Item placeholders", isDone: true},
    {title: "Creating todo list item feature", isDone: false},
    {title: "Custom scrollbar when there are too many list items", isDone: false},
    {title: "Drag and drop reordering feature", isDone: false},
    {title: "Storing data in client-side local storage", isDone: false},
    {title: "Register and login", isDone: false},
    {title: "Storing data in server-side database with Node.js and possibly Postgres", isDone: false},
    {title: "Themes (custom animated status bars included)", isDone: false},
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