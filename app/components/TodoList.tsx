'use client'

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
  onToggleComplete: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggleComplete, onDelete }) => {
  return (
    <ul className="space-y-4 mt-6">
      {todos.map((todo) => (
        <li key={todo.id} className="flex items-center justify-between">
          <span
            className={`cursor-pointer text-white ${todo.completed ? 'line-through' : ''}`}
            onClick={() => onToggleComplete(todo.id, todo.completed)}
          >
            {todo.title}
          </span>
          <button
            className="text-red-500 ml-4"
            onClick={() => onDelete(todo.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
