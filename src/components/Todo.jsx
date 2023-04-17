import { useState } from "react"
import classes from "./Todo.module.css"

const Todo = ({ list }) => {

  const [dataList, setDataList] = useState(list);

  const handlerDone = (itemData) => {
    setDataList(
      dataList.map(
        (item) => item === itemData ? {...item, isDone: !item.isDone} : item
      )
    )
  }

  console.log(dataList);  

  return (
    <ul className={classes.todo}>
      {dataList.map(item => <ListItem key={item.id} itemData={item} onChangingDone={handlerDone} />)}
    </ul>
  );

}

const ListItem = ({ itemData, onChangingDone }) => {

  const clicked = () => {
    onChangingDone(itemData);
  }

  return (
    <li
      className={ `${classes["todo__list-item"]} ${itemData.isDone ? classes["todo__list-item--done"] : ""}` }
      draggable = {true}
      onClick={clicked}
    >
        {itemData.title}
    </li>
  );

}

export default Todo;