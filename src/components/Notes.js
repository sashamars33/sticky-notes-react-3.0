import {useState, useEffect} from 'react'
import {checkNote, deleteNotes} from '../features/notes/noteSlice'
import {useDispatch} from 'react-redux'
import {MdOutlineCheckBoxOutlineBlank} from 'react-icons/md'
import {MdOutlineCheckBox} from 'react-icons/md'
import {TiDelete} from 'react-icons/ti'


const Notes = ({notes}) => {

    const dispatch = useDispatch()
    const [hidden, setHidden] = useState('')
    const [checked, setCheck] = useState(false)
    const [note, setNote] = useState('')
    const [deleteNote, setDeleteNote] = useState('')

    useEffect(() => {
        if(note.length > 0){
            dispatch(checkNote(note))
            setNote('')
        }
        if(deleteNote.length > 0){
            console.log(deleteNote)
            dispatch(deleteNotes(deleteNote))
            setDeleteNote('')
        }
    }, [dispatch, note, setNote, setDeleteNote, deleteNote])



    if(!notes || notes.message){
        return (
            <h3 style={{width: '100%', textAlign: 'center'}}>No Notes Yet!</h3>
        )
    };


  return (
    <>
    {notes.map(note => (
                <section key={note._id} className="w-1/4">
                  <div>
                    <div className={`flex flex-wrap bg-primary rounded p-2 ${hidden}`}>
                      <div className="flex w-full justify-between">
                        {checked ? <MdOutlineCheckBox onClick={() => {setNote(note._id); setCheck(!checked)}}/> : <MdOutlineCheckBoxOutlineBlank onClick={() => {setNote(note._id); setCheck(!checked)}} />}
                        <TiDelete onClick={() => {setDeleteNote(note._id); setHidden('hidden')}}/>
                      </div>
                      <p >{note.note}</p>
                      </div>
                  </div>
                </section>
              ))}
              </>
  )
}

export default Notes