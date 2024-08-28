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
  deleteTask: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, toggleComplete, deleteTask }) => (
  <div>
      <div>
          <button onClick={() => toggleComplete(task.id)}>
              {task.completed && <FiCheck />}
          </button>
          <div>
              <span>
                  {task.title}
              </span><br></br>
              <span>{creationdDateOfTask(task.createdAt)}</span>
          </div>
      </div>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
  </div>
);

export default TaskItem;