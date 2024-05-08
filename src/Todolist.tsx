import React, { ChangeEvent, MouseEvent } from 'react';
import { ValuesFilterType } from './App';
import { AddItemForm } from './AddItemForm';

export type TaskType = {
      id: string;
      title: string;
      isDone: boolean;
};

type PropsType = {
      title: string;
      tasks: Array<TaskType>;
      removeTask: (taskId: string, todolistId: string) => void;
      changeFilter: (value: ValuesFilterType, todolistId: string) => void;
      addTask: (title: string, todolistId: string) => void;
      changeTaskStatus: (
            taskId: string,
            isDone: boolean,
            todolistId: string
      ) => void;
      filter: ValuesFilterType;
      id: string;
      removeTodolist: (todolistId: string) => void;
};

export function Todolist(props: PropsType) {
      const onAllClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
            props.changeFilter('all', props.id);
      };
      const onActiveClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
            props.changeFilter('active', props.id);
      };
      const onCompletedClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
            props.changeFilter('completed', props.id);
      };

      const removeTodolist = () => {
            props.removeTodolist(props.id);
      };

      const addTask = (title: string) => {
            props.addTask(title, props.id);
      }

      return (
            <div>
                  <h3>
                        {props.title}
                        <button onClick={removeTodolist}>x</button>
                  </h3>
                  <AddItemForm addItem={addTask} />
                  <ul>
                        {props.tasks.map((t) => {
                              const onRemoveTaskHandler = () => {
                                    props.removeTask(t.id, props.id);
                              };

                              const onChangeStatus = (
                                    e: ChangeEvent<HTMLInputElement>
                              ) => {
                                    props.changeTaskStatus(
                                          t.id,
                                          e.currentTarget.checked,
                                          props.id
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
