import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {register, reset} from '../features/auth/authSlice'

const Register = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const {name, email, password, password2} = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user, isError, isSuccess, message} = useSelector(state => state.auth)

    useEffect(() => {
        if(isError){
            alert(message)
        }

        if(isSuccess || user){
            navigate('/profile')
            console.log(user)
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

        if(password !== password2){
            alert('Passwords do not match.')
        }else{
            const userData = {
                name,
                email,
                password
            }
            dispatch(register(userData))
        }
    }


  return (
    <section className="">
            <h1 className="heading-font text-4xl p-6 text-center">Register</h1>
            <p className="accent-font text-2xl p-6 text-center">Fill out the form below to create an account.</p>

            <form className="form-control pb-48 text-base-100">
                <input label="Name" placeholder="Name" className="input bg-white w-10/12 md:w-9/12 lgw-:5/12 xl:w-4/12 m-auto my-3" required type="text" id="name" name="name" value={name} onChange={onChange}>
                </input>
                <input label="Email" placeholder="Email" className="input bg-white w-10/12 md:w-9/12 lgw-:5/12 xl:w-4/12 m-auto my-3" required type="text" id="email" name="email" value={email} onChange={onChange}>
                </input>
                <input label="Password" placeholder="Create Password" className="input bg-white w-10/12 md:w-9/12 lgw-:5/12 xl:w-4/12 m-auto my-3" required type="password" id="password" name="password" value={password} onChange={onChange}>
                </input>
                <input variant="filled" placeholder="Confirm Password" label="Confirm Password" className="input bg-white w-10/12 md:w-9/12 lgw-:5/12 xl:w-4/12 m-auto my-3" required type="password" id="password2" name="password2" value={password2} onChange={onChange}>
                </input>
                    <button variant='outlined ' onClick={onSubmit} className="btn btn-secondary w-2/12 m-auto my-6" >Submit</button>
            </form>
    </section>
  )
}

export default Register
