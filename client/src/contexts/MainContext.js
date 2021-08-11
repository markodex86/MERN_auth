import React, { useState } from 'react'

const MainContext = React.createContext()
const MainContextProvider = (props) => {
  const localJWT = localStorage.getItem('token') || '';
  const [jwt, setJwt] = useState(localJWT)

  return (
    <MainContext.Provider value={{ jwt, setJwt }}>
      {props.children}
    </MainContext.Provider>
  )
}

export { MainContextProvider, MainContext }
