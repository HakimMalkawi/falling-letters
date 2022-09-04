import { useState, createContext } from "react"

export const SpeedContext = createContext()

export const SpeedProvider = ( { children } ) => {
    const [ speed, setSpeed ] = useState( 1 )
    
    return  <SpeedContext.Provider value={ { speed, setSpeed } } >
                { children }
            </SpeedContext.Provider> }