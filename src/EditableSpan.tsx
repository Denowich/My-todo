import React, { ChangeEvent, useState } from "react";

type EditableSpanPropsType = {
      title: string;
}
export function EditableSpan (props: EditableSpanPropsType) {
      let [editMode, setEditMode] = useState(false);
      let [title, setTitle] = useState('');

      const activateEditeMode = () => {
            setEditMode(true);
            setTitle(props.title);
      }
      const activateViewMode = () => {
            setEditMode(false);
      }


      const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
            setTitle(e.currentTarget.value);
      }

      return editMode 
      ? <input value={title} onBlur={activateViewMode} autoFocus onChange={onChangeTitleHandler} /> 
      : <span onClick={activateEditeMode}>{props.title}___</span>
}