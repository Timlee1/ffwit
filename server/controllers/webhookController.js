const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const postgres = require('../database/postgres')

const stripeWebhook = async (req, res) => {
  let data;
  let eventType;
  // Check if webhook signing is configured.
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (webhookSecret) {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event;
    let signature = req.headers["stripe-signature"];

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        webhookSecret
      );
    } catch (err) {
      return res.status(400).json({ message: 'Webhook signature verification failed' });
    }
    // Extract the object from the event.
    data = event.data;
    eventType = event.type;
  } else {
    // Webhook signing is recommended, but if the secret is not configured in `config.js`,
    // retrieve the event data directly from the request body.
    data = req.body.data;
    eventType = req.body.type;
  }

  switch (eventType) {
    case 'customer.created':
      try {
        data = data.object
        console.log(data)
        const email = data.email
        const find_user_query = {
          text: "SELECT * FROM USERS WHERE email = $1",
          values: [email]
        }
        const user = await postgres.query(find_user_query)
        if (!user.rows.length) {
          return res.status(409).json({ message: 'User not found' })
        }
        const stripe_id = data.id
        const add_user_stripe_id_query = {
          text: "UPDATE users SET stripe_id = $2 WHERE email = $1",
          values: [email, stripe_id]
        }
        await postgres.query(add_user_stripe_id_query)
      } catch (err) {
        return res.status(403).json({ message: 'Unable to create Stripe customer' })
      }
      break;
    case 'customer.updated':
      try {
        data = data.object
        const email = data.email
        const find_user_query = {
          text: "SELECT * FROM USERS WHERE email = $1",
          values: [email]
        }
        const user = await postgres.query(find_user_query)
        if (!user.rows.length) {
          return res.status(409).json({ message: 'User not found' })
        }
        const stripe_id = data.id
        const update_user_stripe_id_query = {
          text: "UPDATE users SET stripe_id = $2 WHERE email = $1",
          values: [email, stripe_id]
        }
        await postgres.query(update_user_stripe_id_query)

      } catch (err) {
        return res.status(403).json({ message: 'Unable to update Stripe customer' })
      }
      break;
    case 'invoice.paid':
      // Continue to provision the subscription as payments continue to be made.
      // Store the status in your database and check when a user accesses your service.
      // This approach helps you avoid hitting rate limits.
      try {
        data = data.object
        const stripe_id = data.customer
        const find_user_query = {
          text: "SELECT * FROM USERS WHERE stripe_id = $1",
          values: [stripe_id]
        }
        const user = await postgres.query(find_user_query)
        if (!user.rows.length) {
          return res.status(409).json({ message: 'User not found' })
        }
        const plan_id = data.lines.data[0].plan.id
        let plan;
        if (plan_id == 'price_1NgCh2BUPgZpckEJZ8KLvfDo') {
          plan = 'basic'
        }
        else if (plan_id == 'price_1NgCfgBUPgZpckEJDHw7lxOk') {
          plan = 'premium'
        }
        const plan_end = data.lines.data[0].period.end
        const add_plan_query = {
          text: "UPDATE users SET plan = $2, plan_end = $3 WHERE stripe_id = $1",
          values: [stripe_id, plan, plan_end]
        }
        await postgres.query(add_plan_query)
      } catch (err) {
        return res.status(403).json({ message: 'Unable to record paid invoice' })
      }
      break;
    case 'checkout.session.completed':
      //payment status is unpaid then void subsciption

      // Payment is successful and the subscription is created.
      // You should provision the subscription and save the customer ID to your database.
      try {
        data = data.object
        if (data.payment_status == 'unpaid') {
          stripe_id = data.customer
          const find_user_query = {
            text: "SELECT * FROM USERS WHERE stripe_id = $1",
            values: [stripe_id]
          }
          const user = await postgres.query(find_user_query)
          if (!user.rows.length) {
            return res.status(409).json({ message: 'User not found' })
          }
          const remove_plan_query = {
            text: "UPDATE users SET plan = $2, plan_end = $3 WHERE email = $1",
            values: [email, null, null]
          }
          await postgres.query(remove_plan_query)
        }
      } catch (err) {
        return res.status(403).json({ message: 'Unable to complete session' })
      }
      break;
    case 'customer.subscription.updated':
      try {
        data = data.object
        const stripe_id = data.customer
        const find_user_query = {
          text: "SELECT * FROM USERS WHERE stripe_id = $1",
          values: [stripe_id]
        }
        const user = await postgres.query(find_user_query)
        if (!user.rows.length) {
          return res.status(409).json({ message: 'User not found' })
        }
        const plan_id = data.items.data[0].price.id
        let plan;
        if (plan_id == 'price_1NgCh2BUPgZpckEJZ8KLvfDo') {
          plan = 'basic'
        }
        else if (plan_id == 'price_1NgCfgBUPgZpckEJDHw7lxOk') {
          plan = 'premium'
        }
        const plan_end = data.current_period_end
        const update_subscription_query = {
          text: "UPDATE users SET plan = $2, plan_end = $3 WHERE stripe_id = $1",
          values: [stripe_id, plan, plan_end]
        }
        await postgres.query(update_subscription_query)
      } catch (err) {
        return res.status(403).json({ message: 'Unable to record paid invoice' })
      }
      break;
    case 'invoice.payment_failed':
      // The payment failed or the customer does not have a valid payment method.
      // The subscription becomes past_due. Notify your customer and send them to the
      // customer portal to update their payment information.
      break;
    default:
    // Unhandled event type
  }

  res.sendStatus(200);
}

module.exports = { stripeWebhook }