import React, { ChangeEvent, KeyboardEvent, MouseEvent, useState } from 'react';
import { ValuesFilterType } from './App';
import { ALL } from 'dns';

export type TaskType = {
      id: string;
      title: string;
      isDone: boolean;
};

type PropsType = {
      title: string;
      tasks: Array<TaskType>;
      removeTask: (id: string) => void;
      changeFilter: (value: ValuesFilterType) => void;
      addTask: (title: string) => void;
};

export function Todolist(props: PropsType) {
      const [newTitleTask, setNewTitleTask] = useState('');

      const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            setNewTitleTask(e.currentTarget.value);
      };
      const addTask = () => {
            props.addTask(newTitleTask);
            setNewTitleTask('');
      };
      const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
                  props.addTask(newTitleTask);
                  setNewTitleTask('');
            }
      };

      const onAllClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
            props.changeFilter('all');
      };
      const onActiveClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
            props.changeFilter('active');
      };
      const onCompletedClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
            props.changeFilter('completed');
      };

      return (
            <div>
                  <h3>{props.title}</h3>
                  <div>
                        <input
                              value={newTitleTask}
                              onChange={onNewTitleChangeHandler}
                              onKeyDown={onKeyDownHandler}
                        />
                        <button onClick={addTask}>+</button>
                  </div>
                  <ul>
                        {props.tasks.map((t) => {
                              const onRemoveTaskHandler = () => {
                                    props.removeTask(t.id);
                              };

                              return (
                                    <li key={t.id}>
                                          <input
                                                type='checkbox'
                                                checked={t.isDone}
                                          />
                                          <span>{t.title}</span>
                                          <button onClick={onRemoveTaskHandler}>
                                                x
                                          </button>
                                    </li>
                              );
                        })}
                  </ul>
                  <div>
                        <button onClick={onAllClickHandler}>All</button>
                        <button onClick={onActiveClickHandler}>Active</button>
                        <button onClick={onCompletedClickHandler}>
                              Completed
                        </button>
                  </div>
            </div>
      );
}
