import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Obtener todos los To-Dos
export async function GET() {
  try {
    const todos = await prisma.todo.findMany();
    return new Response(JSON.stringify(todos), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error fetching todos' }), { status: 500 });
  }
}

// Crear un nuevo To-Do
export async function POST(request: Request) {
  const { title }: { title: string } = await request.json();
  try {
    const newTodo = await prisma.todo.create({
      data: { title },
    });
    return new Response(JSON.stringify(newTodo), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error creating todo' }), { status: 500 });
  }
}

// Actualizar un To-Do
export async function PATCH(request: Request) {
  const { id, completed }: { id: number; completed: boolean } = await request.json();
  try {
    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: { completed },
    });
    return new Response(JSON.stringify(updatedTodo), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error updating todo' }), { status: 500 });
  }
}

// Eliminar un To-Do
export async function DELETE(request: Request) {
  const { id }: { id: number } = await request.json();
  try {
    const deletedTodo = await prisma.todo.delete({
      where: { id },
    });
    return new Response(JSON.stringify(deletedTodo), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error deleting todo' }), { status: 500 });
  }
}
