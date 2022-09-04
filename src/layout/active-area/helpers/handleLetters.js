import Letter from "../components/letter/Letter"
import { nanoid } from "nanoid"

const possibleLetters = [ "A", "B", "C", "D", "E" ]

const generateLetter = () => possibleLetters[ ~~ ( Math.random() * 5 ) ]

export const spawnLetters = ( setLetters, speed ) => {
    const letterElement = 
        // I pass down the multiplier as a prop, and then the component handles its drop velocity from there
        <Letter letter={ generateLetter() } 
                speed={ speed } 
                id={ nanoid() } 
                key={ nanoid() } />

    setLetters( prevLetters => 
        ( { ...prevLetters, active: [ ...prevLetters.active, letterElement ] } ) ) }

export const removeLetters = ( pressedKey, setLetters, setScore ) => {
    if ( possibleLetters.includes( pressedKey ) ) {
        ( async () => {
            // I had to do multiple state updates here, and decided to go async to avoid any exceptions where I would potentially be setting state mid render.
            let removedLettersAmount = 0

            await setLetters( prevLetters => {
                // Counts how many target letters are present currently
                const targetLettersLength = prevLetters.active
                    .reduce( ( iterator, { props: { letter } } ) => 
                        iterator = ( letter === pressedKey ) ? iterator + 1 : iterator , 0 )
            
                // If there's only one letter present then nothing happens basically
                if ( targetLettersLength >= 2 ) {
                    const filteredActive = prevLetters.active
                        .filter( ( { props: { letter } } ) => letter !== pressedKey )
        
                    removedLettersAmount = targetLettersLength
                    return { ...prevLetters, active: filteredActive } } 
                
                return prevLetters } )
        
            // I update score context here which is reflected in the ScoreCounter component.
            setScore( prevScore => prevScore + removedLettersAmount ) } )() } }

// This is definitely not the most performent approach. This whole function is O( n ) but it's run a ton of times throughout the game.