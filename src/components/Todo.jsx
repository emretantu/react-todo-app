import { useState } from "react"
import classes from "./Todo.module.css"

const Todo = ({ list }) => {

  const [listData, setListData] = useState(list);

  return (
    <ul className={classes.todo}>
      {listData.map(item => <ListItem key={item.id} itemData={item} />)}
    </ul>
  );

}

const ListItem = ({ itemData }) => {

  const [isDone, setIsDone] = useState(itemData.isDone);
  const handlerIsDone = setIsDone.bind(null, (prevIsDone) => !prevIsDone);

  return (
    <li
      className={ `${classes["todo__list-item"]} ${isDone ? classes["todo__list-item--done"] : ""}` }
      draggable = {true}
      onClick={handlerIsDone}
    >
        {itemData.title}
    </li>
  );

}

export default Todo;