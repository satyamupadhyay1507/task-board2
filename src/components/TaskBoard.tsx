'use client';

import TaskCard, { TaskItem, TaskStatus } from './TaskCard';

interface TaskBoardProps {
  tasks: TaskItem[];
  loading: boolean;
  onStatusUpdated: (taskId: string, newStatus: TaskStatus) => void;
}

export default function TaskBoard({ tasks, loading, onStatusUpdated }: TaskBoardProps) {
  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-xl border border-slate-200 animate-pulse flex items-center justify-between"
          >
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-slate-200 rounded-md w-1/2"></div>
              <div className="h-3 bg-slate-100 rounded-md w-1/4"></div>
            </div>
            <div className="h-8 bg-slate-100 rounded-lg w-28"></div>
          </div>
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="bg-white border border-slate-200 border-dashed rounded-xl p-8 text-center">
        <h3 className="text-sm font-semibold text-slate-900 mb-1">No tasks created yet</h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Get started by entering a task title in the form above and clicking Add Task.
        </p>
      </div>
    );
  }

  const todoTasks = tasks.filter((t) => t.status === 'TODO');
  const inProgressTasks = tasks.filter((t) => t.status === 'IN_PROGRESS');
  const doneTasks = tasks.filter((t) => t.status === 'DONE');

  return (
    <div className="space-y-6">
      {/* Overview Metrics */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block"></span>
            <span className="text-xs font-medium text-slate-600">Todo</span>
          </div>
          <span className="text-sm font-bold text-slate-900">{todoTasks.length}</span>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block"></span>
            <span className="text-xs font-medium text-slate-600">In Progress</span>
          </div>
          <span className="text-sm font-bold text-slate-900">{inProgressTasks.length}</span>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
            <span className="text-xs font-medium text-slate-600">Done</span>
          </div>
          <span className="text-sm font-bold text-slate-900">{doneTasks.length}</span>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        <h2 className="text-base font-semibold text-slate-800">Your Tasks ({tasks.length})</h2>
        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onStatusUpdated={onStatusUpdated} />
          ))}
        </div>
      </div>
    </div>
  );
}
