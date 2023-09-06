import './Home.css'
import { Link } from 'react-router-dom'

function Home({ auth }) {
  let content = <Link to="/signup">Get Started</Link>
  if (auth) {
    content = <Link to="/payment">Get Started</Link>
  }
  return (
    <>
      <div className="hero-section">
        <div className="hero-section-text">
          <h2>Find the right lineup, everytime</h2>
          <p>Fantasy Wit is no regular fantasy football lineup optimizer</p>
          <ul>
            <li>Uses Monte Carlo method to simulate thousands of matches</li>
            <li>Depends on the variability of the player and correlation of the teams</li>
            <li>Optimizes against an opponent team or a point total</li>
          </ul>
          <div className="hero-section-button">
            <button><Link to="/signup">Sign Up</Link></button>
          </div>
        </div>
        <div className="hero-section-image">
          <img src="/hero.png"></img>
        </div>
      </div>
      <div className="pricing-page-home">
        <div className="pricing-plan-header">
          <h2>Pricing</h2>
          <p>All purchases securely handled by Stripe.<br></br>30 day money back gurantee.</p>
        </div>
        <section className="pricing-plan-section">

          <section class="pricing-plan">
            <h2>Free</h2>
            <p>Try out the simulator for free anytime.</p>
            <div class="price"><strong>$0</strong><span>/month</span></div>
            <ul>
              <li>Runs Monte Carlo model with <strong>100</strong> simulations</li>
              <li>Model includes the variance of players </li>
              <li>Model includes the correlation between players</li>
            </ul>
            <div className="pricing-plan-button">
              <button class="select-plan">{content}</button>
            </div>
          </section>
          <section class="pricing-plan">
            <h2>Basic</h2>
            <p>Perfect for your weekend matchup.</p>
            <div class="price"><strong>$5</strong><span>/month</span></div>
            <ul>
              <li>Runs Monte Carlo model with <strong>1000</strong> simulations</li>
              <li>Model includes the variance of players </li>
              <li>Model includes the correlation between players</li>
            </ul>
            <div className="pricing-plan-button">
              <button class="select-plan">{content}</button>
            </div>
          </section>
          <section class="pricing-plan">
            <h2>Standard</h2>
            <p>For people who want a more accurate prediction.</p>
            <div class="price"><strong>$15</strong><span>/month</span></div>
            <ul>
              <li>Runs Monte Carlo model with <strong>10000</strong> simulations</li>
              <li>Model includes the variance of players </li>
              <li>Model includes the correlation between players</li>
            </ul>
            <div className="pricing-plan-button">
              <button class="select-plan">{content}</button>
            </div>
          </section>

          <section class="pricing-plan">
            <h2>Pro</h2>
            <p>For people who want the best advice.</p>
            <div class="price"><strong>$40</strong><span>/month</span></div>
            <ul>
              <li>Runs Monte Carlo model with <strong>50000</strong> simulations</li>
              <li>Model includes the variance of players </li>
              <li>Model includes the correlation between players</li>
            </ul>
            <div className="pricing-plan-button">
              <button class="select-plan">{content}</button>
            </div>
          </section>
        </section>
      </div>
    </>
  )
}

export default Home
