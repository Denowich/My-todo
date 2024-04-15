import React, { ChangeEvent, KeyboardEvent, MouseEvent, useState } from 'react';
import { ValuesFilterType } from './App';

export type TaskType = {
      id: string;
      title: string;
      isDone: boolean;
};

type PropsType = {
      title: string;
      tasks: Array<TaskType>;
      removeTask: (id: string) => void;
      changeFilter: (value: ValuesFilterType, todolistId: string) => void;
      addTask: (title: string) => void;
      changeTaskStatus: (taskId: string, isDone: boolean) => void;
      filter: ValuesFilterType;
      id: string;
};

export function Todolist(props: PropsType) {
      const [newTitleTask, setNewTitleTask] = useState('');
      const [error, setError] = useState<string | null>(null);

      const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            setNewTitleTask(e.currentTarget.value);
      };
      const addTask = () => {
            if (newTitleTask.trim() !== '') {
                  props.addTask(newTitleTask.trim());
                  setNewTitleTask('');
            } else {
                  setError('Title is required');
            }
      };
      const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
            setError(null);
            if (e.key === 'Enter') {
                  if (newTitleTask.trim() !== '') {
                        props.addTask(newTitleTask.trim());
                        setNewTitleTask('');
                  } else {
                        setError('Title is required');
                  }
            }
      };

      const onAllClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
            props.changeFilter('all', props.id);
      };
      const onActiveClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
            props.changeFilter('active', props.id);
      };
      const onCompletedClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
            props.changeFilter('completed', props.id);
      };

      return (
            <div>
                  <h3>{props.title}</h3>
                  <div>
                        <input
                              value={newTitleTask}
                              onChange={onNewTitleChangeHandler}
                              onKeyDown={onKeyDownHandler}
                              className={error ? 'error' : ''}
                        />
                        <button onClick={addTask}>+</button>
                        {error && <div className='error-message'>{error}</div>}
                  </div>
                  <ul>
                        {props.tasks.map((t) => {
                              const onRemoveTaskHandler = () => {
                                    props.removeTask(t.id);
                              };

                              const onChangeStatus = (
                                    e: ChangeEvent<HTMLInputElement>
                              ) => {
                                    props.changeTaskStatus(
                                          t.id,
                                          e.currentTarget.checked
                                    );
                              };

                              return (
                                    <li
                                          key={t.id}
                                          className={t.isDone ? 'is-done' : ''}
                                    >
                                          <input
                                                type='checkbox'
                                                checked={t.isDone}
                                                onChange={onChangeStatus}
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
                        <button
                              className={
                                    props.filter === 'all'
                                          ? 'active-filter'
                                          : ''
                              }
                              onClick={onAllClickHandler}
                        >
                              All
                        </button>
                        <button
                              className={
                                    props.filter === 'active'
                                          ? 'active-filter'
                                          : ''
                              }
                              onClick={onActiveClickHandler}
                        >
                              Active
                        </button>
                        <button
                              className={
                                    props.filter === 'completed'
                                          ? 'active-filter'
                                          : ''
                              }
                              onClick={onCompletedClickHandler}
                        >
                              Completed
                        </button>
                  </div>
            </div>
      );
}
