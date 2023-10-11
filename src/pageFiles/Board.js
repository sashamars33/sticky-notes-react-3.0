import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {createNote, getNotes, reset} from '../features/notes/noteSlice'
import Notes from '../components/Notes'

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'

const Board = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user} = useSelector((state) => state.auth)
    const {notes, isLoading, isError, isSuccess, message } = useSelector(state => state.notes)
    const {page} = useSelector((state) => state.pages)
    const [note, setNote] = useState({})
    const [noteArr , setNoteArr] = useState(notes)


    const backToBoards = () => {
        navigate('/profile')
    }

    useEffect(() => {
        if(isError){
          alert(message)
        }
    
        if(isSuccess){
          dispatch(reset())
          navigate('/board')
        }
    
        dispatch(reset())
      }, [ isError, message, dispatch, isSuccess, navigate ])


    const onSubmit = (e) => {
      console.log(note, note.toString(), page.keys)
        e.preventDefault()
        if(note === ''){
            alert('Please enter a note.')
        }else{
            const noteData = {
                note: note.toString(),
                page: page._id,
                user: user._id,
            }
            // const newNoteArr = [...noteArr, noteData.note];
            // setNoteArr(newNoteArr)
            console.log(noteData)
            dispatch(createNote(noteData))
        }
    }

    useEffect(() => {
        if(page){
            dispatch(getNotes())
        }
    }, [dispatch, page])



  return (
    <section className='mx-12 md:mx-24 lg:mx-48 xl:mx-48 flex justify-between items-start pt-12 pb-64 '>
          <div className="w-1/4 flex flex-col gap-3 bg-secondary p-4 rounded-xl text-white">
            <button className="btn btn-accent w-2/3" onClick={backToBoards}>Back to Boards</button>
            <h2 className="heading-font text-3xl">{page.topic}</h2>
            <p className="accent-font text-white">Create a new note below!</p>
            <form className="form-control">
            <ReactQuill className= "bg-white text-base-100 rounded-xl border-none mb-4 rich-text-form" theme="snow" placeholder="Add a new note." id="note" name="note" value={note} onChange={setNote} style={{border: 'none'}} />
              {/* <textarea className="input bg-white my-3 h-36 text-base-100" placeholder="Add a new note." id="note" name="note" onChange={(e) => setNote(e.target.value)}></textarea> */}
              <button onClick={onSubmit} className="btn btn-info">Add</button>
            </form>
          </div>
          <div className="w-3/4 flex gap-3 flex-wrap justify-center w-full">
          {isLoading ? <p>loading...</p> : <Notes notes = {notes}/>}
          </div>
        </section>


  )
}

export default Board