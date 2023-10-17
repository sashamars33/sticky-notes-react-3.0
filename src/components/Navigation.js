import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {logout, reset} from '../features/auth/authSlice'


const Navigation = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector((state) => state.auth)
  
    const onLogout = () => {
      dispatch(logout())
      dispatch(reset())
      navigate('/')
    }
  
    return (
      <section className=" py-8">
        <section className="mx-12 md:mx-24 lg:mx-24 xl:mx-24">
          <div className="flex justify-between items-center">
            <Link to='/' className="heading-font text-3xl">Sticky Notes</Link>
  
            {user ? (
            <div className="flex gap-6">
              <Link to='/' className="btn btn-primary">Home</Link>
              <button className="btn btn-secondary" onClick={onLogout}>Logout</button>
            </div>
            ) : (
              <div className="flex gap-6">
                <Link to='/login' className="btn btn-primary">Login</Link>
                <Link to='/register' className="btn btn-secondary">Register</Link>
              </div>
              ) } 
          </div>
        </section>
      </section>
    )
  }
  
  export default Navigation