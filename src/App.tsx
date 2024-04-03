import React from 'react';
import './App.css';
import { Todolist } from './Todolist';
import { TaskType } from './Todolist';


function App() {
      let tasks1: Array<TaskType> = [
            { id: 1, title: 'Go to school', isDone: false },
            { id: 2, title: 'Go to shop', isDone: true },
            { id: 3, title: 'Go to posyolok', isDone: true },
      ];

      let tasks2: Array<TaskType> = [
            { id: 1, title: 'HTML', isDone: true },
            { id: 2, title: 'JS', isDone: false },
            { id: 3, title: 'React', isDone: false },
      ];

      return (
            <div className='App'>
                  <Todolist title='What to do:' tasks={tasks1} />
                  <Todolist title='What to learn:' tasks={tasks2} />
            </div>
      );
}
export default App;
