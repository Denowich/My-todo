import React, { useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';
import { TaskType } from './Todolist';
import { v1 } from 'uuid';

export type ValuesFilterType = 'all' | 'active' | 'completed';
type TodolistType = {
      id: string;
      title: string;
      filter: ValuesFilterType;
};
function App() {
      let [tasks1, setTasks1] = useState<Array<TaskType>>([
            { id: v1(), title: 'Go to school', isDone: false },
            { id: v1(), title: 'Go to shop', isDone: true },
            { id: v1(), title: 'Go to posyolok', isDone: true },
            { id: v1(), title: 'Drink beer', isDone: false },
      ]);

      function removeTask(id: string) {
            let filteredTasks = tasks1.filter((t) => t.id !== id);
            setTasks1(filteredTasks);
      }

      function changeFilter(value: ValuesFilterType, todolistId: string) {
            let todolist = todolists.find((tl) => tl.id === todolistId);
            if (todolist) {
                  todolist.filter = value;
                  setTodolists([...todolists]);
            }
      }

      function addTask(title: string) {
            let newTask = { id: v1(), title: title, isDone: false };
            let newTasks = [newTask, ...tasks1];
            setTasks1(newTasks);
      }

      function changeStatus(taskId: string, isDone: boolean) {
            let task = tasks1.find((t) => t.id === taskId);
            if (task) {
                  task.isDone = isDone;
            }
            setTasks1([...tasks1]);
      }

      let [todolists, setTodolists] = useState<Array<TodolistType>>([
            { id: v1(), title: 'What to do:', filter: 'active' },
            { id: v1(), title: 'What to learn:', filter: 'completed' },
      ]);
      // let tasks2: Array<TaskType> = [
      //       { id: 1, title: 'HTML', isDone: true },
      //       { id: 2, title: 'JS', isDone: false },
      //       { id: 3, title: 'React', isDone: false },
      // ];

      return (
            <div className='App'>
                  {todolists.map((tl) => {
                        let tasksForTodolist = tasks1;
                        if (tl.filter === 'active') {
                              tasksForTodolist = tasks1.filter(
                                    (t) => t.isDone === false
                              );
                        }
                        if (tl.filter === 'completed') {
                              tasksForTodolist = tasks1.filter(
                                    (t) => t.isDone === true
                              );
                        }
                        return (
                              <Todolist
                                    title={tl.title}
                                    tasks={tasksForTodolist}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeStatus}
                                    filter={tl.filter}
                                    key={tl.id}
                                    id={tl.id}
                              />
                        );
                  })}
            </div>
      );
}
export default App;
