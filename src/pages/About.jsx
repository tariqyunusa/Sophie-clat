import Nav from '../components/Nav'
import Footer from '../components/Footer'
import '../styles/About.css'

const About = () => {
  return (
    <section className='about__section'>
        <Nav />
        <main className='about__main_section'>
          <div className='about__headline'>
            <div className='about__headline_first'>
              <div className='about__mask'><h1 className='about__italics '>Curating</h1></div>
              <div className='about__mask'><h1 className='about__header'>Luxury</h1></div>
            </div>
            <div className='about__headline_second'>
              <div className='about__mask'><h1 className='about__header'>Treasures from</h1></div>
            </div>
            <div className='about__headline_third'>
              <div className='about__mask'>
                <h1 className='about__italics'>(Doha, Qatar)</h1>
              </div>
            </div>
          </div>
          <div className="about__personal">
            
          </div>
        </main>
        <Footer />
    </section>
  )
}

export default About
