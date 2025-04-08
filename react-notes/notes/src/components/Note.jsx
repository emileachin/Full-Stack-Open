const Note = ({ note, toggleImportance, removed }) => {
  const label = note.important
    ? 'make not important' : 'make important'

    const removeNote = async () => {
      const id = note.id
  
      removed(id)    
    }
    
  return (
    <li className='note'>
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
      <button onClick={removeNote}>delete</button>
    </li>
  )
}

export default Note