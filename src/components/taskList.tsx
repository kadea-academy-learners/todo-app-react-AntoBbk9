import React, { useState } from 'react';
import { Task } from './types/task';
import TaskItem from './taskItem';
import { useLocalStorage } from './hooks/localstorage';

const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);

    const [newTaskTitle, setNewTaskTitle] = useState('');

    const addTask = () => {
        if (!newTaskTitle.trim()) return;

        const newTask: Task = {
            id: generateId(),
            title: newTaskTitle, 
            completed: false,
            createdAt: new Date(),
        };
        setTasks((prevTasks) => [...prevTasks, newTask]);
        setNewTaskTitle('');
    };

    const toggleComplete = (id: string) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const deleteTask = (id: string) => {
        const confirmed = window.confirm('Vouz-vous supprimer la tâche ?');
        if (confirmed) {
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
        }
    };

    const updateTask = (taskId: string, newName: string) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? { ...task, title: newName } : task
            )
        );
    };

    return (
        <div className="container">
            <h1 className="title">Listes de tâches</h1>
            <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Ajoutez une tâche..."
            />
            <button onClick={addTask}>Ajouter</button>
            <div>
                {tasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        toggleComplete={toggleComplete}
                        deleteTask={deleteTask}
                        onUpdate={updateTask}
                    />
                ))}
            </div>
        </div>
    );
};

export default TaskList;
