import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createTask, updateTask } from '../../features/Task/TaskSlice';

const TodoForm = ({ editingTask, setEditingTask }) => {
  const [titleInput, setTitle] = useState("");
  const [descInput, setDesc] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDesc(editingTask.description);
    } else {
      setTitle("");
      setDesc("");
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingTask) {
      dispatch(updateTask({ taskId: editingTask._id, taskData: { title: titleInput, description: descInput } }));
      setEditingTask(null);
    } else if (titleInput.trim() && descInput.trim()) {
      const newTask = { title: titleInput, description: descInput };
      dispatch(createTask(newTask));
    }

    setTitle("");
    setDesc("");
  };

  return (
    <div className='w-11/12 bg-yellow-300 mx-auto p-3 mt-5 shadow-lg shadow-gray-500'>
      <form onSubmit={handleSubmit} className='flex flex-col items-center gap-3'>
        <input
          type="text"
          placeholder='Enter your title here...'
          className='bg-gray-100 p-3 w-11/12 outline-none shadow-sm shadow-gray-500'
          value={titleInput}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder='Enter your description here...'
          className='bg-gray-100 resize-none p-3 w-11/12 outline-none shadow-sm shadow-gray-500'
          value={descInput}
          onChange={(e) => setDesc(e.target.value)}
        />

        <input
          type="submit"
          value={editingTask ? "Update Task" : "Add Task"}
          className='bg-lime-500 font-bold p-3 text-white shadow-sm shadow-gray-500 hover:-translate-y-1 duration-200 hover:bg-lime-600 w-11/12'
        />
      </form>
    </div>
  );
};

export default TodoForm;