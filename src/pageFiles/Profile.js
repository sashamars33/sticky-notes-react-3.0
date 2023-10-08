import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {createPage, getPages, setCurrentPage, reset, resetPage, resetAllPages, deletePages} from '../features/pages/pageSlice'
import {TiDelete} from 'react-icons/ti'


const Profile = () => {

    const {user} = useSelector((state) => state.auth)
    const {pages, isLoading, isError, isSuccess, message} = useSelector(state => state.pages)
    const {notes} = useSelector(state => state.notes)
    const [name, setName] = useState(user.name)
    const [page, setPage] = useState('')
    const [pageClick, setPageClick] = useState([false, '']);
    const [deletePage, setDeletePage] = useState('')
  
    const dispatch = useDispatch()
    const navigate = useNavigate()
  
    useEffect(() => {
      if(isError){
        alert(message)
      }
  
      if(isSuccess){
        dispatch(reset())
        navigate('/profile')
      }
  
      dispatch(reset())
    }, [ isError, message, dispatch, isSuccess, navigate ])
  
    useEffect(() => {
      dispatch(getPages())
      dispatch(resetPage())
      dispatch(resetAllPages())
  }, [dispatch])
  
  useEffect(() => {
    if(pageClick[0] === true){
      navigate('/board')
      dispatch(setCurrentPage(pageClick[1]))
      setPageClick([false, ''])
      window.location.reload(false)
    }
    if(deletePage.length > 0){
      dispatch(deletePages(deletePage))
      setDeletePage('')
      window.location.reload(false)

    }
    
  }, [dispatch, navigate, setPageClick, pageClick, setDeletePage, deletePage])
  
  
    const onSubmit = (e) => {
  
        e.preventDefault()
        if(page === ''){
            alert('Please enter a board name.')
        }else{
            const pageData = {
                page,
                user: user._id
            }
            console.log(pageData)
            dispatch(createPage(pageData))

        }
    }
  
  console.log(pages)
  
  
    return (
        <section className='mx-12 md:mx-24 lg:mx-48 xl:mx-48 flex justify-between items-start pt-12 pb-64'>
          <div className="w-1/4 bg-secondary text-white p-4 rounded-xl">
            <h1 className="heading-font text-2xl">{user.name}'s Boards</h1>
            <p className="accent-font">Create a new board below!</p>
            <form className="form-control">
              <input className="input bg-white my-3 text-base-100" placeholder="Add a new board." id="page" name="page" onChange={(e) => setPage(e.target.value)}></input>
              <button onClick={onSubmit} className="btn btn-info">Add</button>

            </form>
          </div>
          <div className="w-3/4 flex gap-3 flex-wrap justify-center">
          {isLoading ? <p>loading...</p> : pages && !pages.message ? pages.map(it => (
              <section key={it.reactID} className="flex bg-primary p-2 pb-12 heading-font rounded-lg w-3/12 justify-between flex-wrap  cursor-pointer">
                      <h3  onClick={() => {setPageClick([true, it._id]);} } className="heading-font text-xl text-base-100">{it.topic ? it.topic : it.page}</h3>
                     <TiDelete className="text-base-100 w-1/12" onClick={() => setDeletePage(it._id)}/>
                     <p className="w-full text-base-100">notes: {notes && !notes.message ? notes.filter( item => item.reactPageID === it.reactID).length : 0}</p>
                     <p className="w-full text-base-100">completed: {notes && !notes.message ? notes.filter( item => item.reactPageID === it.reactID && it.checked === true).length : 0}</p>

                </section>
          )): <h3 className="text-white">No Boards Yet</h3>}
          </div>
        </section>
    )
  }
  
  export default Profile