import React from 'react'
import Logout from '../features/users/Logout'
import UpdatePassword from '../features/users/UpdatePassword'
import ManageBilling from '../features/payment/ManageBilling'
import { useGetUserRefreshQuery } from '../features/users/usersApiSlice'


const Profile = () => {
  const {
    data: data,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetUserRefreshQuery()

  return (
    <main>
      {isSuccess && <UpdatePassword initialEmail={data.email} />}
      <ManageBilling />
      <Logout />
    </main>
  )
}

export default Profile