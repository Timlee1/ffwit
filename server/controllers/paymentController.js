const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

const createCheckoutSession = async (req, res) => {
  try {
    const domainURL = process.env.CLIENT; //fix this?
    const { priceId } = req.body;
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1
        },
      ],
      // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
      success_url: `${domainURL}/payment?session_id={CHECKOUT_SESSION_ID}`, //fix this?
      cancel_url: `${domainURL}/payment?session_id={CHECKOUT_SESSION_ID}`, //fix this?
      // automatic_tax: { enabled: true } //fix this?
    });
    return res.status(201).json({ url: session.url })
  } catch (err) {
    return res.status(400).json({ message: 'Unable to Go to Checkout' })
  }
}

module.exports = { createCheckoutSession }