import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
import heroImg from '../assets/sticky-hero.svg';


const Home = () => {

    const {user} = useSelector((state) => state.auth)
  
  
    return (
  <>
      <section className="mx-12 md:mx-24 lg:mx-24 xl:mx-24">
              <section className="flex items-center gap-6 justify-between ">
                <div className="w-1/2">
                  <h1 className="heading-font text-5xl ">A Wonderful World of Notes!</h1>
                  <p className="accent-font text-2xl py-6 w-9/12">Designed to help you get your notes all in one place with no sticky note left behind..</p>
                  {user ?
          <div>
            <button className="btn btn-accent btn-lg accent-font"><Link to='/profile'>Go to Profile</Link></button>
          </div>
        : <div className="flex gap-6">
            <Link to='/login'><button className="btn btn-accent btn-lg accent-font">Login</button></Link>
            <Link to='/register'><button className="btn btn-accent btn-lg accent-font">Register</button></Link>
        </div>}
                </div>
                
                <div className="w-1/2">
                    <img src={heroImg} alt="hero decoration"></img>
                </div>
              </section>

            <section className="flex flex-col justify-center items-center pb-12">
                <h2 className="heading-font text-5xl text-center py-6">About Stickys</h2>
                <p className="accent-font text-2xl pt-6 text-left">Stickys' is designed with simplicity and versatility in mind. Whether you're jotting down quick reminders, brainstorming ideas, managing tasks, or collaborating with others, Sticky's offers the flexibility and convenience of digital sticky notes.
</p><p className="accent-font text-2xl py-8 text-left">Capture your thoughts, ideas, and to-do lists in a digital format that retains the essence of traditional sticky notes while adding the benefits of digital organization and accessibility.
Join Sticky's today and experience the joy of digital sticky notes, always there when you need them, wherever you are. Say goodbye to scattered paper notes and hello to the convenience of Stickys.</p>
<Link to='/register'><button className="btn btn-accent btn-lg accent-font ">Get Started Now!</button></Link>

            </section>
      </section>
    </>
    )
  }
  
  export default Home