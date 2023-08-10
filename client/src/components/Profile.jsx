import React from 'react'
import Logout from '../features/users/Logout'
import UpdatePassword from '../features/users/UpdatePassword'

const Profile = () => {
  return (
    <>
      <UpdatePassword />
      <Logout />
    </>
  )
}

export default Profile