import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, toggleTask } from '../../features/Task/TaskSlice';
import TodoForm from './TodoForm';

const TodoItem = ({ task }) => {
  const [editingTask, setEditingTask] = useState(null);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTask(task._id));
  };

  const handleToggle = () => {
    dispatch(toggleTask(task._id));
  };

  return (
    <>
      {editingTask ? (
        <TodoForm editingTask={editingTask} setEditingTask={setEditingTask} />
      ) : (
        <div className='bg-orange-600 flex gap-2 w-11/12 mx-auto mt-4 p-3 rounded-sm'>
          <div className='flex flex-col gap-5 w-full pt-16 relative'>
            <h3 className={`bg-yellow-300 p-3 text-xl ${task.completed ? "bg-yellow-400 font-bold line-through" : ""}`}>
              {task.title}
            </h3>
            <p className={`bg-yellow-300 p-3 text-xl ${task.completed ? "bg-yellow-400 font-bold line-through" : ""}`}>
              {task.description}
            </p>

            <div className='flex bg-orange-800 p-2 gap-2 items-center absolute -top-2 -right-2'>
              <button className='text-4xl p-1 bg-white' onClick={handleDelete}>❌</button>
              <button
                className='text-4xl p-1 bg-white'
                onClick={() => {
                  if (!task.completed) setEditingTask(task);
                }}
              >
                📝
              </button>
              <input
                type="checkbox"
                className='w-12 h-12'
                checked={task.completed}
                onChange={handleToggle}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TodoItem;