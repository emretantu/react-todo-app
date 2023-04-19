import classes from "./Todo.module.css"

const Todo = ({ list, onChangingDone }) => {

  return (
    <ul className={classes.todo}>
      {list.map(item => <ListItem key={item.id} itemData={item} onChangingDone={onChangingDone} />)}
    </ul>
  );

}

const ListItem = ({ itemData, onChangingDone }) => {

  return (
    <li
      className={ `${classes["todo__list-item"]} ${itemData.isDone ? classes["todo__list-item--done"] : ""}` }
      draggable={true}
      onClick={() => {onChangingDone(itemData)}}
    >
      {itemData.title}
    </li>
  );

}

export default Todo;