import {useState, useEffect} from 'react'
import {checkNote, deleteNotes} from '../features/notes/noteSlice'
import {useDispatch} from 'react-redux'
import {MdOutlineCheckBoxOutlineBlank} from 'react-icons/md'
import {MdOutlineCheckBox} from 'react-icons/md'
import {TiDelete} from 'react-icons/ti'


const Notes = ({notes}) => {

    const dispatch = useDispatch()
    const [note, setNote] = useState('')
    const [deleteNote, setDeleteNote] = useState('')


    useEffect(() => {
        if(note.length > 0){
            dispatch(checkNote(note[0]))
            setNote('')
        }
        if(deleteNote.length > 0){
            dispatch(deleteNotes(deleteNote))
            setDeleteNote('')
        }
    }, [dispatch, note, setNote, setDeleteNote, deleteNote])



    if(notes.length === 0 || notes.message){
        return (
            <h3 style={{width: '100%', textAlign: 'center'}}>No Notes Yet!</h3>
        )
    };


  return (
    <>
    {notes && !notes.message ? notes.map((note, ix) => (
                <section key={note._id} className="w-full md:w-1/2 lg:w-1/4 xl:w-1/4">
                  <div>
                    <div className={`flex flex-wrap bg-primary rounded p-2`}>
                      <div className="flex w-full justify-between">
                        {note.checked ? <MdOutlineCheckBox onClick={() => {setNote([note._id, note.checked]);}}/> : <MdOutlineCheckBoxOutlineBlank onClick={() => {setNote([note._id, note.checked]);}} />}
                        <TiDelete onClick={() => {setDeleteNote(note._id); }} className="cursor-pointer"/>
                      </div>
                      <div className="w-full">
                      <div dangerouslySetInnerHTML={{ __html: note.note }} />
                        {/* {parser.parseFromString(note.note, 'text/html').body.innerHTML && parser.parseFromString(note.note, 'text/html').body.innerHTML} */}
                      </div>
                      </div>
                  </div>
                </section>
              )) : <p>No Notes Yet!</p>}
              </>
  )
}

export default Notes