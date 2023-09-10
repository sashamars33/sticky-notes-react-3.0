import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {createPage, getPages, setCurrentPage, reset, resetPage, resetAllPages, deletePages} from '../features/pages/pageSlice'
import {TiDelete} from 'react-icons/ti'


const Profile = () => {

    const {user} = useSelector((state) => state.auth)
    const { pages, isLoading, isError, isSuccess, message} = useSelector(state => state.pages)
   
  
  
  
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
      dispatch(setCurrentPage(pageClick[1]))
      navigate('/board')
      setPageClick([false, ''])
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
            dispatch(createPage(pageData))
            window.location.reload(false);
        }
    }
  
    
  
    if(isLoading){
      return(
        <p>chill it's loading</p>
        // <Paper sx={{bgcolor: 'background.default'}} style={{padding: '2% 5%', height: '100vh'}} elevation={0} square>
        //   <Card style={{display: 'flex', padding: '10%', background: '#00000000'}}>
        //     <CircularProgress style={{margin: 'auto'}}/>
        //   </Card>
        // </Paper>
      )
    }
  
  
    return (
        <section className='mx-12 md:mx-24 lg:mx-48 xl:mx-48 flex justify-between items-start pt-12 pb-64'>
          <div className="w-1/4">
            <h1 className="heading-font text-3xl">Welcome {name}!</h1>
            <p className="accent-font">Search</p>
            <p className="accent-font">Create a new board below!</p>
            <form className="form-control">
              <input className="input bg-white my-3" label="Add a new board." id="page" name="page" onChange={(e) => setPage(e.target.value)}></input>
              <button onClick={onSubmit} className="btn btn-info">Add</button>
            </form>
          </div>
          <div className="w-3/4 flex gap-3 flex-wrap justify-center">
          {pages || pages.length === 0 || pages.message ? pages.map(page => (
              <section className="flex bg-primary p-2 pb-12 heading-font rounded-lg w-3/12 flex justify-between cursor-pointer">
                      <h3  onClick={() => setPageClick([true, page._id])} className="heading-font text-xl">{page.topic}</h3>
                     <TiDelete onClick={() => setDeletePage(page._id)}/>
                </section>
          )): <h3>No Boards Yet</h3>}
          </div>
        </section>
    //   <>
    //   <CssBaseline />
    //   <Paper sx={{bgcolor: 'background.default'}} style={{padding: '2% 5%'}} elevation={0} square>
    //       <Card>
    //           <CardContent>
    //               <h1 style={{width: '100%', textAlign: 'center'}}>Welcome {name}!</h1>
    //               <h2>Add a new board!</h2>
    //               <p>To get started fill out the form below to add a topic board to your profile. Then select the board to begin adding your sticky notes!</p>
    //               <FormControl style={{width: '100%'}}>
    //                   <TextField variant="filled" label="Add a new board." color="primary" style={{ margin: '2% 0'}} type="text" id="page" name="page" onChange={(e) => setPage(e.target.value)}></TextField>
    //                   <Button variant="outlined" onClick={onSubmit}>Submit</Button>
    //               </FormControl>
    //           </CardContent>
    //       </Card>
    //       <Box sx={{bgcolor: 'background.default'}} style={{padding: '2%', margin: '2% 0'}}>
    //         <Grid container spacing={1}>
    //             {pages || pages.length === 0 || pages.message ? pages.map(page => (
    //               <Grid item xs={12} md={4} lg={3} key={page._id}>
    //                 <Card sx={{bgcolor: 'text.primary', color: 'background.default'}}>
    //                   <CardContent style={{margin: '2%', cursor: 'pointer'}}>
    //                     <Box style={{display: 'flex', justifyContent: 'space-between'}}>
    //                     <h3  onClick={() => setPageClick([true, page._id])} style={{padding: '2% 0'}}>{page.topic}</h3>
    //                     <TiDelete onClick={() => setDeletePage(page._id)}/>
    //                     </Box>
    //                   </CardContent>
    //                 </Card>
    //               </Grid>
    //             )) : <h3>No Pages</h3>}
    //         </Grid>
    //       </Box>
    //   </Paper>
    //   </>
    )
  }
  
  export default Profile