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
                  <input
                        value={newTitleTask}
                        onChange={onNewTitleChangeHandler}
                        onKeyDown={onKeyDownHandler}
                        className={error ? 'error' : ''}
                  />
                  <button onClick={addTask}>+</button>
                  {error && <div className='error-message'>{error}</div>}
            </div>
      );
}
