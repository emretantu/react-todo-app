import './App.css';
import Todo from './components/Todo';

function App() {

  const INITIAL_LIST = [
    {title: "Creating basic todo list", isDone: true},
    {title: "Dynamic status message", isDone: true},
    {title: "Item placeholders", isDone: true},
    {title: "To-do list item creation feature", isDone: true},
    {title: "Some functionallities (delete item button, delete all and delete completed items button, sort button, item status badge, quick edit, accordion for long titles like this) Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta, voluptate. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta, voluptate. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta, voluptate.", isDone: true},
    {title: "Styles of buttons", isDone: false},
    {title: "Undo and redo buttons", isDone: false},
    {title: "Custom scrollbar when there are too many list items", isDone: false},
    {title: "Drag and drop reordering feature", isDone: false},
    {title: "Mobile compatibility issues", isDone: false},
    {title: "Storing data in client-side local storage", isDone: false},
    {title: "Register and login", isDone: false},
    {title: "Storing data in server-side database with Node.js and possibly Postgres", isDone: false},
    {title: "Themes (custom animated status bars included)", isDone: false},
  ];

  return (
    <>
      <Todo list={INITIAL_LIST} />
    </>
  );
}

export default App;