// 오늘 할 일 컴포넌트
import React from 'react';
import { useDemoStore } from '../../store/demoStore';

const TodayTasks: React.FC = () => {
  const { todayTasks, completeTask } = useDemoStore();

  const getIcon = (type: string) => {
    switch (type) {
      case 'grading':
        return '📝';
      case 'progress':
        return '📊';
      case 'communication':
        return '💬';
      default:
        return '✅';
    }
  };

  const incompleteTasks = todayTasks.filter(task => !task.completed);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          🔥 오늘 할 일 ({incompleteTasks.length})
        </h2>
        {incompleteTasks.length === 0 && (
          <span className="text-sm text-green-600 font-medium">모두 완료!</span>
        )}
      </div>

      <div className="space-y-3">
        {todayTasks.map(task => (
          <div
            key={task.id}
            className={`flex items-center p-3 rounded-lg border transition-all ${
              task.completed
                ? 'bg-gray-50 border-gray-200 opacity-60'
                : 'bg-blue-50 border-blue-200 hover:bg-blue-100'
            }`}
          >
            <button
              onClick={() => completeTask(task.id)}
              className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center mr-3 transition-all ${
                task.completed
                  ? 'bg-green-500 border-green-500'
                  : 'border-gray-300 hover:border-blue-500'
              }`}
            >
              {task.completed && (
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </button>

            <div className="flex-grow">
              <div className="flex items-center gap-2">
                <span className="text-lg">{getIcon(task.type)}</span>
                <span
                  className={`font-medium ${
                    task.completed ? 'text-gray-500 line-through' : 'text-gray-800'
                  }`}
                >
                  {task.title}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{task.description}</p>
            </div>
          </div>
        ))}

        {incompleteTasks.length === 0 && todayTasks.length > 0 && (
          <div className="text-center py-4 text-gray-500 text-sm">
            오늘 할 일을 모두 완료했습니다! 👏
          </div>
        )}

        {todayTasks.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            오늘 할 일이 없습니다.
          </div>
        )}
      </div>

      {incompleteTasks.length > 0 && (
        <button
          onClick={() => {
            incompleteTasks.forEach(task => completeTask(task.id));
          }}
          className="mt-4 w-full py-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          모두 완료하기 →
        </button>
      )}
    </div>
  );
};

export default TodayTasks;
