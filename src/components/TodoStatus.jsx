import { useEffect, useRef } from "react";
import classes from "./TodoStatus.module.css"

const TodoStatus = ({ status }) => {

  useEffect(() => {
    let newPersentage = status.completed * 100 / status.size;
    newPersentage = newPersentage || 6;
    setTimeout(() => {
      statusRef.current.style.width = `${newPersentage}%`;
    }, 100)
  });

  const statusRef = useRef();

  return (
    <div className={classes["status-bar"]}>
      <div ref={statusRef} className={classes["status-progress"]} style={{width: `${6}%`}}>{`${status.completed} / ${status.size}`}</div>
    </div>
  );

}

export default TodoStatus;