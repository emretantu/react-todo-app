import { Fragment, useRef, useState } from "react";
import TodoStatus from "./TodoStatus";
import classes from "./Todo.module.css"

const Todo = ({ list }) => {

  const [dataList, setDataList] = useState(list);

  const handleDone = (itemData) => {
    setDataList(
      dataList.map((item) => item === itemData ? {...item, isDone: !item.isDone} : item)
    )
  }

  const handleEdit = (itemData, newTitle) => {
    setDataList(
      dataList.map((item) => item === itemData ? {...item, title: newTitle} : item)
    )
  }

  const handleDelete = (itemData) => {
    setDataList(
      dataList.filter((item) => item !== itemData)
    )
  }

  const addListItem = (order, title) => {
    setDataList(() => {
      const list = [...dataList];
      list.splice(order, 0, {title: title, isDone: false});
      return list;
    });
  }

  const handleSort = () => {
    setDataList(() => {
      const list = [...dataList];
      list.sort((currItem, prevItem) => {
        if ((currItem.isDone && prevItem.isDone) || (!currItem.isDone && !prevItem.isDone)) {
          return 1
        }
        return -1;
      });
      return list;
    });
  }

  const handleClear = () => {
    setDataList([]);
  }

  const status = {
    size: dataList.length,
    completed: dataList.reduce((acc, item) => item.isDone ? ++acc : acc, 0),
  }

  return (
    <>
      <TodoStatus status={status} />
      <ul className={classes.todo}>
        {dataList.map((item, index) => {
          return (
            <Fragment key={index}>
              <Placeholder order={index} addListItem={addListItem} />
              <ListItem itemData={item} order={index} onChangingDone={handleDone} onEdit={handleEdit} onDelete={handleDelete} />
            </Fragment>
          )
        })}
        <Placeholder order={dataList.length} addListItem={addListItem} initial={!dataList.length} />
      </ul>
      <TodoButtons>
        <TodoButton buttonCB={handleSort}>Sort</TodoButton>
        <TodoButton buttonCB={handleClear}>Clear</TodoButton>
      </TodoButtons>
    </>
  );

}

const ListItem = ({ itemData, onChangingDone, onDelete, onEdit }) => {

  const listItemRef = useRef();
  const quickButtonsRef = useRef();
  const listContentTitleRef = useRef();
  const listContentInputRef = useRef();
  const editBtnRef = useRef();
  const deleteBtnRef = useRef();

  const config = {
    stillInput: false, /*this should always initialize to false*/
  }

  const handleOnMouseEnter = () => {
    quickButtonsRef.current.classList.add(classes["quick-buttons--show"]);
  }

  const handleOnMouseLeave = () => {
    if(config.stillInput) return;
    quickButtonsRef.current.classList.remove(classes["quick-buttons--show"]);
  }

  const handleEditTitle = () => {
    onEdit(itemData, listContentInputRef.current.value);
  }

  const handleDeleteItem = () => {
    if (config.stillInput) {
      listContentInputRef.current.value = itemData.title;
      submitInput();
    } else {
      onDelete(itemData);
    }
  }

  const handleOnClickEditBtn = () => {
    if (config.stillInput) {
      submitInput();
      return;
    }
    config.stillInput = true;
    editBtnRef.current.innerHTML = "check_circle";
    deleteBtnRef.current.innerHTML = "cancel";
    quickButtonsRef.current.classList.add(classes["quick-buttons--show"]);
    listItemRef.current.classList.add(classes["todo__list-item--edit"], classes["todo__list-item--extend"])
    listContentTitleRef.current.classList.remove(classes["list-content__title--show"]);
    listContentInputRef.current.classList.add(classes["list-content__input--show"]);
    listContentInputRef.current.value = itemData.title;
    listContentInputRef.current.focus();
  }

  const submitInput = () => {
    config.stillInput = false;
    editBtnRef.current.innerHTML = "edit";
    deleteBtnRef.current.innerHTML = "delete";
    quickButtonsRef.current.classList.remove(classes["quick-buttons--show"]);
    listItemRef.current.classList.remove(classes["todo__list-item--edit"], classes["todo__list-item--extend"])
    listContentTitleRef.current.classList.add(classes["list-content__title--show"]);
    listContentInputRef.current.classList.remove(classes["list-content__input--show"]);
    handleEditTitle();
  }

  const handleOnKeyDownInput = (e) => {
    if(e.code === "Enter") {
      submitInput();
    } else if (e.code === "Escape") {
      listContentInputRef.current.value = itemData.title;
      submitInput();
    }
  }

  const handleOnclickContentTitle = () => {
    listItemRef.current.classList.toggle(classes["todo__list-item--extend"]);
  }

  return (
    <>
      <li
        ref={listItemRef}
        className={ `${classes["todo__list-item"]}` }
        draggable={true}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
      >

        <div className={classes["list-content"]}>
          <span style={{paddingRight: "0.3em"}} className="material-symbols-outlined" onClick={() => {onChangingDone(itemData)}}>
            { itemData.isDone ? "check_box" : "check_box_outline_blank" }
          </span>
          <span ref={listContentTitleRef} className={ `${classes["list-content__title"]} ${classes["list-content__title--show"]} ${itemData.isDone ? classes["list-content__title--done"] : ""}` } onClick={handleOnclickContentTitle}>
            { itemData.title }
          </span>
          <input ref={listContentInputRef} type="text" className={classes["list-content__input"]} onKeyDown={handleOnKeyDownInput} />
        </div>

        <div ref={quickButtonsRef} className={ `${classes["quick-buttons"]}` }>
          <span ref={editBtnRef} className={ `${classes["quick-buttons__item"]} material-symbols-outlined` } onClick={handleOnClickEditBtn}>
            edit
          </span>
          <span ref={deleteBtnRef} className={ `${classes["quick-buttons__item"]} material-symbols-outlined` } onClick={handleDeleteItem}>
            delete
          </span>
        </div>

      </li>
    </>
  );

}

const Placeholder = ({ order, addListItem, initial }) => {

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
      addListItem(order, inputValue);
    }
  }

  const onBlurInitialInput = () => {
    if (!inputRef.current.value) {
      inputRef.current.placeholder = "You should write your first to do.";
      return;
    }
    onBlurInput();
  }

  const onKeyDownInput = (e) => {
    if (e.code === "Enter") {
      inputRef.current.blur();
    } else if (e.code === "Escape") {
      inputRef.current.value = "";
      inputRef.current.blur();
    }
  }

  if (initial) {
    return (
      <div ref={phRef} className={ `${classes["placeholder"]} ${classes["placeholder--show"]}` }>
        <input ref={inputRef} type="text" placeholder="Just write your first to do." className={ `${classes["placeholder__input"]} ${classes["placeholder__input--show"]}` } onFocus={onFocusInput} onBlur={onBlurInitialInput} onKeyDown={onKeyDownInput} />
      </div>
    );
  }

  return (
    <div ref={phRef} className={ `${classes["placeholder"]}` } onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button ref={addBtnRef} className={ `${classes["placeholder__button"]}` } onClick={handleClickCreateBtn}>+</button>
      <input ref={inputRef} type="text" className={ `${classes["placeholder__input"]}` } onFocus={onFocusInput} onBlur={onBlurInput} onKeyDown={onKeyDownInput} />
    </div>
  );

}

const TodoButtons = ({ children }) => {
  
  return (
    <div>
      {children}
    </div>
  );

}

const TodoButton = ({ children, buttonCB }) => {
  
  return (
    <button onClick={buttonCB}>{children}</button>
  );

}

export default Todo;