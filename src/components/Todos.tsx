import "../css/style.css";
import { useAppSelector } from "../hooks/hooks";
import Clipboard from "../images/Clipboard.png";
import TodosBlock from "./TodosBlock";

const Todos: React.FC = () => {
  const { todos } = useAppSelector((state) => state.todos);

  return (
    <div className="todo-wrapper">
      <div
        className={`${!todos || !todos.length ? "default" : "default-none"}`}
      >
        <img src={Clipboard} alt="error" />
        <p className="default-text">У вас пока нет добавленных задач</p>
      </div>
      <TodosBlock />
    </div>
  );
};

export default Todos;
