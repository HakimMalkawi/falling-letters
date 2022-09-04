import { useContext, useEffect, useLayoutEffect, useCallback, memo } from "react"
import { LetterContext } from "../../context/LetterContext"
import { ScoreContext } from "../../context/ScoreContext"
import { SpeedContext } from "../../context/SpeedContext"
import { PauseContext } from "../../context/PauseContext"
import { spawnLetters, removeLetters } from "./helpers/handleLetters"
import "./active-area.css"

const ActiveArea = () => {
    const { letters, setLetters } = useContext( LetterContext )
    // This is the state that is actually responsible for the gradual speed up of the game.
    const { speed, setSpeed } = useContext( SpeedContext )
    const { setScore } = useContext( ScoreContext )
    const { pause, setPause } = useContext( PauseContext )
    
    // I wrapped these functions in a useCallback hook because react doesn't like it when you attempt to ask it to remove event listeners later on down the line. I could have also done this with a ref.
    const keyboardControls = useCallback( ( { key } ) => 
        removeLetters( key.toUpperCase(), setLetters, setScore ), [] )

    const pauseControls = useCallback( ( { key } ) => { 
        if ( key === " " ) setPause( prevPause => ! prevPause ) }, [] )

    // I use these cleanups multiple times
    const removeKeyboardControls = () => 
        document.body.removeEventListener( "keypress", keyboardControls )

    const removePauseControls = () => 
        document.body.removeEventListener( "keypress", pauseControls )

    useLayoutEffect( () => { 
        document.body.addEventListener( "keypress", pauseControls )
        return () => removePauseControls() }, [] )

    useLayoutEffect( () => {
        pause ? removeKeyboardControls() : 
                document.body.addEventListener( "keypress", keyboardControls )

        return () => removeKeyboardControls() }, [ pause ] )

    useEffect( () => {
        const accelerator = setTimeout( () => { 
            setSpeed( prevTimeMultiplier => prevTimeMultiplier + 1 ) }, 10000 )
            
        if ( pause || letters.banished.length >= 20 ) clearTimeout( accelerator )

        return () => clearTimeout( accelerator ) }, [ speed, pause ] )

    // This is a slightly ghetto approach but it satisfies the intent. Essentially spawn rate grows proportionally to the multipliers value.
    useLayoutEffect( () => {
        const letterSpawner = setTimeout( () => spawnLetters( setLetters, speed ), 
            ~~ ( Math.random() * ( 700 / speed  ) + ( 300 / speed ) ) )

        if ( pause ) clearTimeout( letterSpawner )

        // End game
        if ( letters.banished.length >= 20 ) {
            clearTimeout( letterSpawner )
            removePauseControls()
            removeKeyboardControls() }

        return () => clearTimeout( letterSpawner ) }, [ letters, pause ] )

    return  <main className="active-area_wrapper" aria-label="Main Game Area" >
                { letters.active }
            </main> }

export default memo( ActiveArea )