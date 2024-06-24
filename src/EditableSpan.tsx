import React, { ChangeEvent, useState } from 'react';

type EditableSpanPropsType = {
      title: string;
      onChangeTitle: (newValue: string) => void;
};
export function EditableSpan(props: EditableSpanPropsType) {
      let [editMode, setEditMode] = useState(false);
      let [newTitle, setNewTitle] = useState('');

      const activateEditeMode = () => {
            setEditMode(true);
            setNewTitle(props.title);
      };
      const activateViewMode = () => {
            setEditMode(false);
            props.onChangeTitle(newTitle);
      };

      const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
            setNewTitle(e.currentTarget.value);
      };

      return editMode ? (
            <input
                  value={newTitle}
                  onBlur={activateViewMode}
                  autoFocus
                  onChange={onChangeTitleHandler}
            />
      ) : (
            <span onClick={activateEditeMode}>{props.title}</span>
      );
}
