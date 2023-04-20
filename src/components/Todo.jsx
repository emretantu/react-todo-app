import { Fragment, useRef, useState } from "react";
import TodoStatus from "./TodoStatus";
import classes from "./Todo.module.css"

const Todo = ({ list }) => {

  const [dataList, setDataList] = useState(list);

  const handleDone = (itemData) => {
    setDataList(
      dataList.map(
        (item) => item === itemData ? {...item, isDone: !item.isDone} : item
      )
    )
  }

  const addListItem = (order, title) => {
    setDataList(() => {
      const list = [...dataList]
      list.splice(order, 0, {title: title, isDone: false});
      return list;
    });
  }

  const status = {
    size: dataList.length,
    completed: dataList.reduce((acc, item) => item.isDone ? ++acc : acc, 0),
  }

  console.log(dataList);

  return (
    <ul className={classes.todo}>
      <TodoStatus status={status} />
      {dataList.map((item, index) => {
        return <Fragment key={index}>
          <Placeholder order={index} addListItem={addListItem} />
          <ListItem itemData={item} onChangingDone={handleDone} order={index} />
        </Fragment>
      })}
      <Placeholder key={200} order={dataList.length} addListItem={addListItem} />
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

const Placeholder = ({ order, addListItem }) => {

  const phRef = useRef();
  const addBtnRef = useRef();
  const inputRef = useRef();
  
  const config = {
    mouseStillHere: false, /*this should always initialize to false*/
    stillInput: false, /*this should always initialize to false*/
    appearanceDelay: 250,
    hideDelay: 1000
  } 

  const handleMouseEnter = () => {
    config.mouseStillHere = true;
    setTimeout(() => {
      if(!config.mouseStillHere || config.stillInput) {
        return;
      }
      phRef.current.classList.add(classes["placeholder--show"]);
      addBtnRef.current.classList.add(classes["placeholder__button--show"]);
    }, config.appearanceDelay)
  }

  const handleMouseLeave = () => {
    config.mouseStillHere = false;
    setTimeout(() => {
      if (config.mouseStillHere || config.stillInput) return;
      addBtnRef.current.classList.remove(classes["placeholder__button--show"]);
      phRef.current.classList.remove(classes["placeholder--show"]);
    }, config.hideDelay)
  }

  const handleClickCreateBtn = () => {
    addBtnRef.current.classList.remove(classes["placeholder__button--show"]);
    inputRef.current.classList.add(classes["placeholder__input--show"]);
    inputRef.current.focus();
  }

  const onFocusInput = () => {
    config.stillInput = true;
  }

  const onBlurInput = () => {
    config.stillInput = false;
    inputRef.current.classList.remove(classes["placeholder__input--show"]);
    phRef.current.classList.remove(classes["placeholder--show"]);
    const inputValue = inputRef.current.value;
    if (inputValue) {
      addListItem(order, inputRef.current.value);
    }
  }

  const onKeyDownInput = (e) => {
    if (e.code === "Enter") {
      inputRef.current.blur();
    } else if (e.code === "Escape") {
      inputRef.current.value = "";
      inputRef.current.blur();
    }
  }

  return (
    <div ref={phRef} className={ `${classes["placeholder"]}` } onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button ref={addBtnRef} className={ `${classes["placeholder__button"]}` } onClick={handleClickCreateBtn}>+</button>
      <input ref={inputRef} className={ `${classes["placeholder__input"]}` } type="text" onFocus={onFocusInput} onBlur={onBlurInput} onKeyDown={onKeyDownInput} />
    </div>
  );

}

export default Todo;