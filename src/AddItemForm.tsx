import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { IconButton, TextField } from '@mui/material';
import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

type AddItemFormPropsType = {
      addItem: (title: string) => void;
};
export function AddItemForm(props: AddItemFormPropsType) {
      const [newTitleTask, setNewTitleTask] = useState('');
      const [error, setError] = useState<string | null>(null);

      const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            setNewTitleTask(e.currentTarget.value);
      };

      const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
            setError(null);
            if (e.key === 'Enter') {
                  if (newTitleTask.trim() !== '') {
                        props.addItem(newTitleTask.trim());
                        setNewTitleTask('');
                  } else {
                        setError('Title is required');
                  }
            }
      };

      const addTask = () => {
            if (newTitleTask.trim() !== '') {
                  props.addItem(newTitleTask.trim());
                  setNewTitleTask('');
            } else {
                  setError('Title is required');
            }
      };

      return (
            <div>
                  <TextField
                        label='Type value'
                        variant='outlined'
                        error={!!error}
                        helperText={error}
                        value={newTitleTask}
                        onChange={onNewTitleChangeHandler}
                        onKeyDown={onKeyDownHandler}
                  />
                  <IconButton onClick={addTask}>
                        <ControlPointIcon />
                  </IconButton>
            </div>
      );
}
