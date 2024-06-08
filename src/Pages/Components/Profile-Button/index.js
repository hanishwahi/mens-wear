import React from 'react'
import { Link } from 'react-router-dom'

function ProfileButton({name, url}) {
  return (
    <>
    <Link to={url}>{name}</Link>
    </>
  )
}

export default ProfileButton