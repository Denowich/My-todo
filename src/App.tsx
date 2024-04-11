import React, { useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';
import { TaskType } from './Todolist';
import { v1 } from 'uuid';

export type ValuesFilterType = 'all' | 'active' | 'completed';

function App() {
      let [tasks1, setTasks1] = useState<Array<TaskType>>([
            { id: v1(), title: 'Go to school', isDone: false },
            { id: v1(), title: 'Go to shop', isDone: true },
            { id: v1(), title: 'Go to posyolok', isDone: true },
            { id: v1(), title: 'Drink beer', isDone: false },
      ]);

      let [filter, setFilter] = useState<ValuesFilterType>('all');

      function removeTask(id: string) {
            let filteredTasks = tasks1.filter((t) => t.id !== id);
            setTasks1(filteredTasks);
      }

      let tasksForTodolist = tasks1;
      if (filter === 'active') {
            tasksForTodolist = tasks1.filter((t) => t.isDone === false);
      }
      if (filter === 'completed') {
            tasksForTodolist = tasks1.filter((t) => t.isDone === true);
      }

      function changeFilter(value: ValuesFilterType) {
            setFilter(value);
      }

      function addTask(title: string) {
            let newTask = { id: v1(), title: title, isDone: false };
            let newTasks = [newTask, ...tasks1];
            setTasks1(newTasks);
      }
      // let tasks2: Array<TaskType> = [
      //       { id: 1, title: 'HTML', isDone: true },
      //       { id: 2, title: 'JS', isDone: false },
      //       { id: 3, title: 'React', isDone: false },
      // ];

      return (
            <div className='App'>
                  <Todolist
                        title='What to do:'
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                  />
                  {/* <Todolist title='What to learn:' tasks={tasks2} /> */}
            </div>
      );
}
export default App;
