import React, { useContext, useEffect } from 'react';
import { MainContext } from '../contexts/MainContext';
import { useHistory } from 'react-router-dom'

const AuthComponent = (props) => {
  const { jwt } = useContext(MainContext);
  const history = useHistory()

  useEffect(() => {
    if (!jwt || jwt === '') {
      return history.push('/')
    }
  }, [jwt, history])
  return (
    <div>
      {props.children}
    </div>
  )
}

export default AuthComponent
