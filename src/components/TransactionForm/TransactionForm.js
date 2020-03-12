import React from 'react'
import { Link } from 'react-router-dom'

const TransactionForm = ({ transaction, handleSubmit, handleChange, cancelPath }) => (
  <form onSubmit={handleSubmit}>
    <label>Payment</label>
    <input
      placeholder="Money"
      value={transaction.payment}
      name="payment"
      onChange={handleChange}
    />

    <label>Pickup</label>
    <input
      placeholder="departure"
      value={transaction.pickup}
      name="pickup"
      onChange={handleChange}
    />
    <label>Dropoff</label>
    <input
      placeholder="destination"
      value={transaction.dropoff}
      name="dropoff"
      onChange={handleChange}

    />

    <button type="submit">Submit</button>
    <Link to={cancelPath}>
      <button>Cancel</button>
    </Link>
  </form>
)

export default TransactionForm
