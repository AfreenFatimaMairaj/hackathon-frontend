import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';

const EditTask = () => {
  const { id } = useParams(); // Get task ID from URL
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('todo');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTask();
  }, []);

  const fetchTask = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await API.get(`/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const { title, description, status } = res.data;
      setTitle(title);
      setDescription(description);
      setStatus(status);
    } catch (err) {
      console.error(err);
      setError('Failed to load task');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await API.patch(`/tasks/${id}`, { title, description, status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/your-tasks'); // Go back to tasks after editing
    } catch (err) {
      console.error(err);
      setError('Failed to update task');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pastel-blue p-6">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-pastel-purple mb-6">Edit Task</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full border border-gray-300 p-2 rounded"
              rows="4"
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
            >
              <option value="todo">Todo</option>
              <option value="inprogress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-pastel-yellow text-pastel-purple font-semibold py-2 px-4 rounded hover:bg-yellow-400 transition duration-200"
          >
            Update Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
