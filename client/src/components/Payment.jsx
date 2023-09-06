import { useState } from 'react'
import { useCreateCheckoutSessionMutation } from '../features/payment/paymentApiSlice'
import './Payment.css'

const Payment = () => {
  const [msg, setMsg] = useState('')
  const [createCheckoutSession] = useCreateCheckoutSessionMutation()

  const checkout = (priceId) => async (e) => {
    e.preventDefault()
    try {
      const { url } = await createCheckoutSession({ priceId }).unwrap()
      location.href = url;
    } catch (err) {
      if (err?.data?.message) {
        setMsg(err.data.message);
      } else {
        setMsg('No server response');
      }
    }
  }

  return (
    <main class="pricing-page-background">
      <div className="pricing-page">
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
              <button class="select-plan">Get Started</button>
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
              <button class="select-plan" onClick={checkout('price_1NgCh2BUPgZpckEJZ8KLvfDo')}>Buy Now</button>
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
              <button class="select-plan" onClick={checkout('price_1NgCfgBUPgZpckEJDHw7lxOk')}>Buy Now</button>
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
              <button class="select-plan" onClick={checkout('price_1NnQK8BUPgZpckEJ8hfQEqVR')}>Buy Now</button>
            </div>
          </section>
        </section>
      </div>
    </main>
  )
}

export default Payment