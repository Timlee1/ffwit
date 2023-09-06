import './Home.css'

function Home() {
  return (
    <>
      <div className="hero-section">
        <div className="hero-section-text">
          <h2>Find the right lineup, everytime</h2>
          <p>Fantasy Wit is no regular fantasy football linuep optimizer</p>
          <ul>
            <li>Uses Monte Carlo method to simulate thousands of matches</li>
            <li>Depends on the variability of the player and correlation of the teams</li>
            <li>Optimize against an opponent team or a point total</li>
          </ul>
          <div className="hero-section-button">
            <button>Sign Up</button>
          </div>
        </div>
        <div className="hero-section-image">
          <img src="/hero.png"></img>
        </div>
      </div>
    </>
  )
}

export default Home
