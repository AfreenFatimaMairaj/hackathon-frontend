import { useEffect, useState } from 'react';

const sections = [
  { key: 'todo', title: 'Todo', color: 'bg-purple-500' },
  { key: 'doing', title: 'Doing', color: 'bg-blue-500' },
  { key: 'review', title: 'Review', color: 'bg-orange-400' },
];

export default function TaskBoard() {
  const [tasks, setTasks] = useState({
    todo: [],
    doing: [],
    review: [],
  });

  // Simulate fetching tasks from backend
  useEffect(() => {
    const fetchTasks = async () => {
      // Example fetch from API
      // const response = await fetch('/api/tasks');
      // const data = await response.json();

      const data = {
        todo: [
          { id: 1, title: 'Assign tasks to team members' },
          { id: 2, title: 'Drag tasks from section to section' },
        ],
        doing: [],
        review: [
          { id: 3, title: 'Sections provide structure' },
          { id: 4, title: 'Adapt sections to match workflows' },
        ],
      };

      setTasks(data);
    };

    fetchTasks();
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 h-screen bg-gradient-to-r from-blue-300 via-blue-200 to-blue-100">
      {sections.map((section) => (
        <div key={section.key} className="flex-1 flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className={`p-4 text-white text-lg font-semibold flex justify-between items-center ${section.color}`}>
            <span>{section.title}</span>
            <span className="bg-white text-black text-sm rounded-full w-6 h-6 flex items-center justify-center">
              {tasks[section.key].length}
            </span>
          </div>

          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            {tasks[section.key].length > 0 ? (
              tasks[section.key].map((task) => (
                <div key={task.id} className="bg-gray-100 p-3 rounded-lg shadow-sm">
                  {task.title}
                </div>
              ))
            ) : (
              <div className="text-center text-gray-400 mt-10">
                No Tasks
              </div>
            )}
          </div>

          <button className="m-4 p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition">
            +
          </button>
        </div>
      ))}
    </div>
  );
}
