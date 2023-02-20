import "../css/style.css";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { deleteTodos, changeTodos } from "../reducers/user/todoAction";
import { ITodos } from "../types/ITodos";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ru";

const TodosBlock: React.FC = () => {
  dayjs.locale("ru");
  dayjs.extend(relativeTime);
  const { todos, isDelLoading } = useAppSelector((state) => state.todos);
  const dispatch = useAppDispatch();
  const delTodo = (id: string) => {
    dispatch(deleteTodos(id));
  };
  const changeClick = (todo: ITodos) => {
    dispatch(changeTodos(todo));
  };

  const time = (created_at: number) => {
    console.log(dayjs(created_at).fromNow());
    return dayjs(created_at).fromNow();
  };
  return (
    <div className="todos-block-wrapper">
      {todos.map((todo) => (
        <div key={todo._id}>
          <div className="map-block">
            <div className="display-block">
              <label className="checkbox style-d">
                <input
                  onClick={() => {
                    changeClick(todo);
                  }}
                  type="checkbox"
                  defaultChecked={todo.completed}
                />
                <div className="checkbox__checkmark"></div>
              </label>
              {!todo.completed ? (
                <p className="map-title">{todo.title}</p>
              ) : (
                <s className="overthrow">{todo.title}</s>
              )}
              <p className="time">{time(+todo.created_at - 60000)}</p>
            </div>
            <FontAwesomeIcon
              onClick={() => delTodo(todo._id)}
              className={`${isDelLoading ? "disable-icon" : "icon"}`}
              icon={faTrashAlt}
            />
            <div className={`${isDelLoading ? "load" : "disable-load"}`}></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodosBlock;
