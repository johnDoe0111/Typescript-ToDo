import React, { useState, useEffect } from "react";
import Rocket from "../images/rocket.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { getTodos, addTodos } from "../reducers/user/todoAction";

const TodoInput: React.FC = () => {
  const dispatch = useAppDispatch();
  const { todos, isAddLoading } = useAppSelector((state) => state.todos);
  const [change, setChange] = useState("");
  const completed = todos.filter((i) => i.completed);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setChange(event.target.value);
  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  const handleClick = () => {
    if (change === "" || !change) {
      return setChange("");
    }
    dispatch(addTodos(change));
    setChange("");
  };

  return (
    <>
      <div className="todo-input-wrapper">
        <div className="img-block">
          <img src={Rocket} alt="error" />
          <h1>
            <span>to</span>do
          </h1>
          <p>
            <span>by</span>unicode<span>{}</span>
          </p>
        </div>
        <div className="input-item">
          <input
            onKeyDown={(event) => {
              if (event.key === "Enter") handleClick();
            }}
            type="text"
            value={change}
            placeholder="Что вы планируете сделать ?"
            onChange={handleChange}
          />
          <button onClick={handleClick}>
            <span>Добавить</span>{" "}
            <FontAwesomeIcon
              icon={faCirclePlus}
              className={`${isAddLoading ? "disable" : "icon"}`}
            />
            <div className={`${isAddLoading ? "load" : "disable-load"}`}></div>{" "}
          </button>
        </div>
      </div>
      <div className="text-wrapper">
        <div className="second-text-wrapper">
          <span>Всего задач</span>
          <div className="first">
            <span>{todos.length}</span>
          </div>
        </div>
        <div className="third-text-wrapper">
          <span>Выполнено</span>
          <div className="first">
            <span>
              {" "}
              {completed.length} из {todos.length}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoInput;
