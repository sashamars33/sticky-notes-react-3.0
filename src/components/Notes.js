import {useState, useEffect} from 'react'
import {checkNote, deleteNotes} from '../features/notes/noteSlice'
import {useDispatch} from 'react-redux'
import {MdOutlineCheckBoxOutlineBlank} from 'react-icons/md'
import {MdOutlineCheckBox} from 'react-icons/md'
import {TiDelete} from 'react-icons/ti'


const Notes = ({notes}) => {

    const dispatch = useDispatch()
    const [notesArr, setNotesArr] = useState(notes)
    const [note, setNote] = useState('')
    const [deleteNote, setDeleteNote] = useState('')

    useEffect(() => {
        
        if(note.length > 0){
            dispatch(checkNote(note[0]))
            const updatedNotesArr = notesArr.map((n) =>
            n._id === note[0] ? { ...n, checked: !n.checked } : n
          )
            setNotesArr(updatedNotesArr)
            setNote('')
        }
        if(deleteNote.length > 0){
            dispatch(deleteNotes(deleteNote))
            const updatedNotesArr = notesArr.filter((n) => n._id !== deleteNote);
            setNotesArr(updatedNotesArr);

            setDeleteNote('')
        }
    }, [dispatch, note, setNote, setDeleteNote, deleteNote, notesArr])



    if(notesArr.length == 0 || notes.message){
        return (
            <h3 style={{width: '100%', textAlign: 'center'}}>No Notes Yet!</h3>
        )
    };



  return (
    <>
    {notesArr.map((note, ix) => (
                <section key={note._id} className="w-1/4">
                  <div>
                    <div className={`flex flex-wrap bg-primary rounded p-2`}>
                      <div className="flex w-full justify-between text-base-100">
                        {note.checked ? <MdOutlineCheckBox onClick={() => {setNote([note._id, note.checked]);}}/> : <MdOutlineCheckBoxOutlineBlank onClick={() => {setNote([note._id, note.checked]);}} />}
                        <TiDelete onClick={() => {setDeleteNote(note._id); }}/>
                      </div>
                      <p className="text-base-100">{note.note || note}</p>
                      </div>
                  </div>
                </section>
              ))}
              </>
  )
}

export default Notes