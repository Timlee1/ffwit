import React from 'react'
import { Link } from 'react-router-dom'
import UsersList from '../features/users/UsersList'

function Home() {
  return (
    <>
      <div>Home</div>

      <UsersList />
    </>
  )
}

export default Home