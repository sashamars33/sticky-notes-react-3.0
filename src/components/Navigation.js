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
      <section className=" py-8 text-white">
        <section className="mx-12 md:mx-24 lg:mx-48 xl:mx-48">
          <div className="flex justify-between">
            <Link to='/' className="heading-font text-3xl">Stickys</Link>
  
            {user ? (
            <button className="btn btn-ghost" onClick={onLogout}>Logout</button>
            ) : (
              <div className="flex gap-6">
                <Link to='/login' className="btn btn-ghost">Login</Link>
                <Link to='/register' className="btn btn-ghost">Register</Link>
              </div>
              ) } 
          </div>
        </section>
      </section>
    )
  }
  
  export default Navigation