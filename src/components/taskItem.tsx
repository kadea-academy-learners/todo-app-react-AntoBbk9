import React from "react";
import { FiCheck } from 'react-icons/fi';
import { Task } from './types/task';

const creationdDateOfTask = (createdAt: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - createdAt.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffMs / (1000 * 60));


    if (diffDays === 0) {
        if(diffHours === 0){
            return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
        }else{
            return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
        }
    }else {
        return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    }
};

interface TaskItemProps {
  task: Task;
  toggleComplete: (id: string) => void;
  onUpdate: (id: string, newName: string) => void;
  deleteTask: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, toggleComplete, onUpdate, deleteTask }) => {
  const handleUpdate = () => {
    const newTaskName = prompt("Enter the new task name", task.title);
    if (newTaskName) {
      onUpdate(task.id, newTaskName);
    }
  };

  return (
    <div className="task-item">
      <div className="task-left">
        <button 
          onClick={() => toggleComplete(task.id)}
          className={`task-button ${task.completed ? 'completed' : 'not-completed'}`}>
          {task.completed && <FiCheck className="icon"/>}
        </button>
        <div className="flex flex-col">
          <span className={`task-title ${task.completed ? 'completed' : 'not-completed'}`}>
            {task.title}
          </span><br />
          <span className="task-date">{creationdDateOfTask(task.createdAt)}</span>
        </div>
      </div>
      <button onClick={handleUpdate} className="edit-button">
        Modifier
      </button>
      <button 
        onClick={() => deleteTask(task.id)}
        className="delete-button">
        Supprimer
      </button>
    </div>
  );
};

export default TaskItem;
