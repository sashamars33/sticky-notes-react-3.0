import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {createNote, getNotes, reset} from '../features/notes/noteSlice'
import Notes from '../components/Notes'


const Board = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user} = useSelector((state) => state.auth)
    const {notes, isLoading, isError, isSuccess, message } = useSelector(state => state.notes)
    const {page} = useSelector((state) => state.pages)
    const [note, setNote] = useState({})
    const [notesArr , setNotesArr] = useState(notes)


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

        e.preventDefault()
        if(note === ''){
            alert('Please enter a note.')
        }else{
            const noteData = {
                note,
                page: page._id,
                user: user._id
            }
            dispatch(createNote(noteData))
            const newNotesArr = [...notesArr, noteData]
            setNotesArr(newNotesArr)
            // window.location.reload(false);
        }
    }

    useEffect(() => {
        if(page){
            dispatch(getNotes())
        }
    }, [dispatch, page])




  return (
    <section className='mx-12 md:mx-24 lg:mx-48 xl:mx-48 flex justify-between items-start pt-12 pb-64'>
          <div className="w-1/4 flex flex-col gap-3">
            <button className="btn btn-accent" onClick={backToBoards}>Back to Boards</button>
            <h2 className="heading-font text-3xl">{page.topic}</h2>
            <p className="accent-font">Search Notes</p>
            <p className="accent-font">Create a new note below!</p>
            <form className="form-control">
              <textarea className="input bg-white my-3" label="Add a new note." id="note" name="note" onChange={(e) => setNote(e.target.value)}></textarea>
              <button onClick={onSubmit} className="btn btn-info">Add</button>
            </form>
          </div>
          <div className="w-3/4 flex gap-3 flex-wrap justify-center">
          {isLoading ? <p>loading...</p> : <Notes notes = {notes}/>}
          </div>
        </section>
    // <>
    //  <CssBaseline />
    //     <Paper sx={{bgcolor: 'background.default'}} style={{padding: '2% 5%'}} elevation={0} square>
    //     <Card>
    //         <CardContent>
    //             <Button variant='outlined' onClick={backToBoards}>Back to Boards</Button>
    //             <h2 style={{width: '100%', textAlign: 'center'}}>{page.topic}</h2>
    //             <FormControl style={{width: '100%'}}>
    //                 <TextField variant="filled" label="Add a new note." multiline color="primary" style={{ margin: '1.5% 0'}} type="text" id="note" name="note" onChange={(e) => setNote(e.target.value)}></TextField>
    //                 <Button variant="outlined" onClick={onSubmit}>Submit</Button>
    //             </FormControl>
    //         </CardContent>
    //     </Card>
    //     <Notes notes = {notes}/>
    //     </Paper>
    // </>

  )
}

export default Board