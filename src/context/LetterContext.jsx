import { useState, createContext } from "react"

export const LetterContext = createContext()

export const LetterProvider = ( { children } ) => {
    // I went with 2 seperate arrays, one for the letters that are currently falling, and one for the letters that have expired, and are no longer able to be removed.
    const initialLetters = { active: new Array( 0 ), banished: new Array( 0 ) }
    const [ letters, setLetters ] = useState( initialLetters )
    
    return  <LetterContext.Provider value={ { letters, setLetters } } >
                { children }
            </LetterContext.Provider> }