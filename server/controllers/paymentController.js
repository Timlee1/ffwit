const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)
const postgres = require('../database/postgres');

const createCheckoutSession = async (req, res) => {
  try {
    const baseURL = process.env.CLIENT;
    const { priceId } = req.body;
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1
        },
      ],
      success_url: `${baseURL}/profile`, //fix this
      cancel_url: `${baseURL}/payment`, //fix this
      // automatic_tax: { enabled: true } 
    });
    return res.status(201).json({ url: session.url })
  } catch (err) {
    return res.status(400).json({ message: 'Unable to Go to Checkout' })
  }
}

const createCustomerPortalSession = async (req, res) => {
  try {
    const baseURL = process.env.CLIENT
    const email = req.email
    const find_user_query = {
      text: 'SELECT * FROM users WHERE email = $1',
      values: [email]
    }
    const user = await postgres.query(find_user_query)
    if (!user.rows.length) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
    const stripeId = user.rows[0].stripe_id
    const returnURL = baseURL + '/profile'
    console.log("here")
    const session = await stripe.billingPortal.sessions.create({
      customer: stripeId,
      return_url: returnURL,
    });
    return res.status(201).json({ url: session.url })
  } catch (err) {
    return res.status(400).json({ message: 'Unable to Go to Customer Portal' })
  }
}

module.exports = { createCheckoutSession, createCustomerPortalSession }