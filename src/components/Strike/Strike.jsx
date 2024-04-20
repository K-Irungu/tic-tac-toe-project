import React from 'react'

const Strike = ({strikethrough}) => {
    let props = ("strike "+strikethrough);

  return (
    <div className={props} ></div>
  )
}

export default Strike;