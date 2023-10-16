import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Footer = () => {

    const {user} = useSelector((state) => state.auth)

  return (
    <section className="w-full py-4">
        <section className="mx-12 md:mx-24 lg:mx-24 xl:mx-24 flex flex-row-reverse justify-between items-center">
        <div>
            <h4 className="py-3 text-center">Have a question?</h4>
            <a href="https://sashamarshall.dev/" target="_blank" rel="noopener noreferrer" className="btn btn-accent">Send us a Message</a>
        </div>
        <div>
            <h5 style={{fontSize: '1.2rem'}}>Site Map</h5>
            {user ? <ul className="flex flex-col">
                <Link to='/'><li>Home</li></Link>
                <Link to='/profile'><li>Profile</li></Link>
            </ul> : 
            <ul className="flex flex-col gap-4">
                <Link to='/'><li>Home</li></Link>
                <Link to='/register'><li>Register</li></Link>
                <Link to='/login'><li>Login</li></Link>
            </ul>}
        </div>
        </section>
    </section>
  )
}

export default Footer