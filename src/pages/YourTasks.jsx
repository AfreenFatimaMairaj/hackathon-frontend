
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

const YourTasks = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      fetchTasks();
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const fetchTasks = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await API.get('/tasks', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(res.data);
    } catch (err) {
      console.error('Fetch Tasks Error:', err.response?.data || err.message);
      setError('Failed to load tasks');
    }
  };

  const updateStatus = async (id, status) => {
    const token = localStorage.getItem('token');
    try {
      const res = await API.patch(`/tasks/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Status Updated:', res.data);
      fetchTasks();
    } catch (err) {
      console.error('Update Status Error:', err.response?.data || err.message);
      setError('Failed to update status');
    }
  };

  const deleteTask = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const res = await API.delete(`/tasks/:id${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Task Deleted:', res.data);
      fetchTasks();
    } catch (err) {
      console.error('Delete Task Error:', err.response?.data || err.message);
      setError('Failed to delete task');
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-task/${id}`);
  };

  const stages = ['todo', 'inprogress', 'done'];

  return (
    <div className="min-h-screen flex flex-col bg-pastel-blue">
      <div className="p-6 bg-pastel-yellow text-center">
        <h1 className="text-4xl font-bold text-pastel-purple mb-6">
          Your Tasks
        </h1>
        {error && <p className="text-red-500">{error}</p>}
      </div>

      <div className="flex flex-col md:flex-row gap-6 p-6 flex-grow bg-gray-100">
        {stages.map((stage) => (
          <div key={stage} className="flex-1 bg-white rounded-lg shadow-md p-4">
            <h2 className="text-2xl font-bold capitalize mb-4 text-center">
              {stage === 'todo' ? 'Todo' : stage === 'inprogress' ? 'In Progress' : 'Done'}
            </h2>

            {tasks.filter(task => task.status === stage).length === 0 ? (
              <p className="text-gray-500 text-center">No tasks</p>
            ) : (
              tasks.filter(task => task.status === stage).map(task => (
                <div key={task._id} className="border p-4 rounded mb-4 shadow-sm">
                  <h3 className="text-lg font-semibold">{task.title}</h3>
                  <p className="text-gray-600 mb-2">{task.description}</p>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleEdit(task._id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTask(task._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm"
                    >
                      Delete
                    </button>
                    {stages.map(s => (
                      s !== task.status && (
                        <button
                          key={s}
                          onClick={() => updateStatus(task._id, s)}
                          className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-sm"
                        >
                          Mark as {s === 'todo' ? 'Todo' : s === 'inprogress' ? 'In Progress' : 'Done'}
                        </button>
                      )
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default YourTasks;
