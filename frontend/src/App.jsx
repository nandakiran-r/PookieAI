import './App.css'
import Navbar from './components/navbar/Navbar'
import ribbon from './assets/hero-ribbon.png'
import HairBow from './components/vectors/HairBow'
import ArrowRight from './components/vectors/ArrowRight'
import { useState } from 'react'

function App() {

  const [name, setName] = useState("");

  return (
    <>
      <Navbar />
      <section class="hero-ribbon-section"><img src={ribbon} loading="lazy" sizes="100vw" alt="" class="ribbon-image" />
        <div class="center-content center-text">
          <div class="tag-flex">
            <div class="title">EXPECT THE UNEXPECTED WITH POOKIE AI</div>
          </div>
          <h1 class="large-heading">
            Welcome Pookies
            <HairBow />
          </h1>
          <div className='hero-input-container'>
            <input placeholder='ENTER YOUR NAME' onChange={(e)=> {
              setName(e.target.value);
            }} className='hero-input' />
            {name.length !== 0 && <button><ArrowRight/></button>}
          </div>
        </div>
      </section>
    </>
  )
}

export default App
