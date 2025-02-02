'use client'

import { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import Loading from './components/Loading';

// Definir la interfaz para las tareas (todos)
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const Home = () => {
  const [todos, setTodos] = useState<Todo[]>([]);  // Usar el tipo Todo
  const [loading, setLoading] = useState(false);

  const fetchTodos = async () => {
    setLoading(true); // Empieza a cargar
    const response = await fetch('/api/todos');
    const data = await response.json();

    // Simula un retraso de 2 segundos antes de mostrar los datos
    setTimeout(() => {
      setTodos(data); // Asignar los datos de la API
      setLoading(false); // Deja de cargar
    }, 2000); // 2000 ms = 2 segundos
  };

  const addTodo = async (title: string) => {
    const response = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    const newTodo: Todo = await response.json();  // Aseguramos que newTodo sea del tipo Todo
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = async (id: number, completed: boolean) => {
    setLoading(true);
    const response = await fetch('/api/todos', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, completed: !completed }),
    });
    const updatedTodo: Todo = await response.json();  // Aseguramos que updatedTodo sea del tipo Todo
    setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
    setLoading(false);
  };

  const deleteTodo = async (id: number) => {
    const response = await fetch('/api/todos', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    const deletedTodo: Todo = await response.json();  // Aseguramos que deletedTodo sea del tipo Todo
    setTodos(todos.filter((todo) => todo.id !== deletedTodo.id));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center py-16">
      <h1 className="text-4xl font-bold mb-6">Todo List</h1>
      <TodoForm onAdd={addTodo} />
      {loading ? (
        <Loading /> // Muestra el componente Loading mientras se carga
      ) : (
        <TodoList todos={todos} onToggleComplete={toggleTodo} onDelete={deleteTodo} />
      )}
    </div>
  );
};

export default Home;
