import React, { useState } from 'react'

export const ChangeDataContext = React.createContext()

export function ChangeDataProvider(props) {
  const [isChanged, setIsChanged] = useState(false)

  return (
    <ChangeDataContext.Provider
      value={{
        isChanged: isChanged,
        setIsChanged: setIsChanged,
      }}
    >
      {props.children}
    </ChangeDataContext.Provider>
  )
}
