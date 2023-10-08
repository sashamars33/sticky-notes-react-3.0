import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {login, reset} from '../features/auth/authSlice'


const Login = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const {email, password} = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user, isError, isSuccess, message} = useSelector(state => state.auth)

    useEffect(() => {
        if(isError){
            alert(message)
        }

        if(isSuccess || user){
            navigate('/profile')
        }

        dispatch(reset()) 
        
    }, [isError, isSuccess, user, message, dispatch, navigate])


    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const userData = {
            email,
            password
        }
        dispatch(login(userData))
    }




  return (
    <>
    <section className="">
            <h1 className="heading-font text-4xl p-6 text-center">Login</h1>
            <p className="accent-font text-2xl p-6 text-center">Enter your account email and password to login.</p>

            <form className="form-control pb-64">
                <input className="input bg-white w-10/12 md:w-9/12 lgw-:5/12 xl:w-4/12 m-auto my-3" placeholder="Email" label="Email" required type="text"  id="email" name="email" value={email} onChange={onChange}>
                </input>
                <input className="input bg-white w-10/12 md:w-9/12 lgw-:5/12 xl:w-4/12 m-auto my-3" placeholder="Password" label="Password" required type="password"  id="password" name="password" value={password} onChange={onChange}>
                </input>
                <button variant='outlined' onClick={onSubmit} className="btn btn-secondary w-2/12 m-auto my-6">Submit</button>
            </form>
    </section>
    </>
  )
}

export default Login