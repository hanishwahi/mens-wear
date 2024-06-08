import React from 'react'

function Button({bg, color, title, className, onClick}) {
  return (
    <>
    <button onClick={onClick} className={className} style={{background:bg , color:color}}>{title}</button>
    </>
  )
}

export default Button