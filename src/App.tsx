import React, { useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';
import { TaskType } from './Todolist';

export type ValuesFilterType = 'all' | 'active' | 'completed';

function App() {
      let [tasks1, setTasks1] = useState<Array<TaskType>>([
            { id: 1, title: 'Go to school', isDone: false },
            { id: 2, title: 'Go to shop', isDone: true },
            { id: 3, title: 'Go to posyolok', isDone: true },
            { id: 4, title: 'Drink beer', isDone: false },
      ]);

      let [filter, setFilter] = useState<ValuesFilterType>('all');

      function removeTask(id: number) {
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
                  />
                  {/* <Todolist title='What to learn:' tasks={tasks2} /> */}
            </div>
      );
}
export default App;
