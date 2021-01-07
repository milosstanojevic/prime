import React from 'react'
import { useDispatch } from 'react-redux'
import { addWarehouse } from "./actions";

export default function AddWarehouse(): JSX.Element {
  const dispatch = useDispatch();
  const [text, setText] = React.useState('');

  function handleChange(e: { target: HTMLInputElement; }) {
    setText(e.target.value);
  }

  function handleSubmit(e: any) {
    e.preventDefault()

    if (!text.trim()) {
      return
    }
    dispatch(addWarehouse(text))

    setText('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={text} onChange={handleChange} />
      <button type="submit">Add Warehouse</button>
    </form>
  )
}
