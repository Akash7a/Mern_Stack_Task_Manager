import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TodoItem } from '../Index';
import { fetchTasks } from '../../features/Task/TaskSlice';

function AllTasks() {
    const dispatch = useDispatch();
    const { items: tasks, status, error } = useSelector(state => state.tasks);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchTasks());
        }
    }, [dispatch, status]);

    if (status === 'loading') return <p>Loading tasks...</p>
    if (status === 'failed') return <p>Error:{error}</p>

    return (
        <div>
            {
                tasks.length > 0 ? (
                    tasks.map(task => (
                        <div key={task._id} >
                            <TodoItem task={task} />
                        </div>
                    ))
                ) : (
                    <li className='w-11/12 p-3 font-black mx-auto mt-4 bg-red-300 list-none text-center rounded-sm shadow-md shadow-gray-500'>!No Tasks Available Add First Task.</li>
                )
            }
        </div>
    )
}

export default AllTasks