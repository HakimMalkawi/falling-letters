import { useState, createContext } from "react"

export const PauseContext = createContext()

export const PauseProvider = ( { children } ) => {
    const [ pause, setPause ] = useState( false )

    return  <PauseContext.Provider value={ { pause, setPause } } >
                { children }
            </PauseContext.Provider> }