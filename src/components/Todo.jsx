import { useRef } from "react";
import classes from "./Todo.module.css"

const Todo = ({ list, onChangingDone }) => {

  return (
    <ul className={classes.todo}>
      {list.map((item, index) => {
        return <>
          <Placeholder order={index} />
          <ListItem key={index} itemData={item} onChangingDone={onChangingDone} order={index} />
        </>
      })}
      <Placeholder order={list.length} />
    </ul>
  );

}

const ListItem = ({ itemData, onChangingDone }) => {

  return (
    <>
      <li
        className={ `${classes["todo__list-item"]} ${itemData.isDone ? classes["todo__list-item--done"] : ""}` }
        draggable={true}
        onClick={() => {onChangingDone(itemData)}}
      >
        {itemData.title}
      </li>
    </>
  );

}

const Placeholder = ({ order }) => {

  const phRef = useRef();
  const addBtnRef = useRef();

  const handleMouseEnter = () => {
    phRef.current.classList.add(classes["placeholder--show"]);
    addBtnRef.current.classList.add(classes["placeholder__button--show"]);
  }

  const handleMouseLeave = () => {
    phRef.current.classList.remove(classes["placeholder--show"]);
    addBtnRef.current.classList.remove(classes["placeholder__button--show"]);
  }

  return (
    <li ref={phRef} className={ `${classes["placeholder"]}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button ref={addBtnRef} className={ `${classes["placeholder__button"]}`}>+</button>
    </li>
  );

}

export default Todo;