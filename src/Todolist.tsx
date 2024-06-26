import React, { ChangeEvent, MouseEvent } from 'react';
import { ValuesFilterType } from './App';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import { Button, Checkbox, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';

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
      changeTitleStatus: (
            taskId: string,
            todolistId: string,
            newTitle: string
      ) => void;
      changeTodolistTitle: (todolistId: string, newTitle: string) => void;
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
      };

      const onChangeTodolistTitle = (newTitle: string) => {
            props.changeTodolistTitle(props.id, newTitle);
      };

      return (
            <div>
                  <h3>
                        <EditableSpan
                              title={props.title}
                              onChangeTitle={onChangeTodolistTitle}
                        />

                        <IconButton
                              aria-label='delete'
                              onClick={removeTodolist}
                        >
                              <Delete />
                        </IconButton>
                  </h3>
                  <AddItemForm addItem={addTask} />
                  <ul>
                        {props.tasks.map((t) => {
                              const onRemoveTaskHandler = () => {
                                    props.removeTask(t.id, props.id);
                              };

                              const onChangeTaskStatus = (
                                    e: ChangeEvent<HTMLInputElement>
                              ) => {
                                    props.changeTaskStatus(
                                          t.id,
                                          e.currentTarget.checked,
                                          props.id
                                    );
                              };

                              const onChangeTitleStatus = (
                                    newValue: string
                              ) => {
                                    props.changeTitleStatus(
                                          t.id,
                                          props.id,
                                          newValue
                                    );
                              };

                              return (
                                    <li
                                          key={t.id}
                                          className={t.isDone ? 'is-done' : ''}
                                    >
                                          <Checkbox
                                                checked={t.isDone}
                                                onChange={onChangeTaskStatus}
                                                color='error'
                                          />
                                          <EditableSpan
                                                title={t.title}
                                                onChangeTitle={
                                                      onChangeTitleStatus
                                                }
                                          />
                                          <IconButton
                                                aria-label='delete'
                                                onClick={onRemoveTaskHandler}
                                          >
                                                <Delete />
                                          </IconButton>
                                    </li>
                              );
                        })}
                  </ul>
                  <div>
                        <Button
                              variant={
                                    props.filter === 'all'
                                          ? 'contained'
                                          : 'text'
                              }
                              onClick={onAllClickHandler}
                        >
                              All
                        </Button>
                        <Button
                              onClick={onActiveClickHandler}
                              variant={
                                    props.filter === 'active'
                                          ? 'contained'
                                          : 'text'
                              }
                              color='error'
                        >
                              Active
                        </Button>
                        <Button
                              onClick={onCompletedClickHandler}
                              variant={
                                    props.filter === 'completed'
                                          ? 'contained'
                                          : 'text'
                              }
                              color='secondary'
                        >
                              Completed
                        </Button>
                  </div>
            </div>
      );
}
