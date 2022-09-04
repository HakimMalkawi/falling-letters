import { useState, useRef, useContext, useEffect, memo } from "react"
import { LetterContext } from "../../../../context/LetterContext"
import { PauseContext } from "../../../../context/PauseContext"
import { generateClassName } from "./helpers/generateClassName"
import "./letter.css"

const Letter = ( { letter, speed, id } ) => {
    const { setLetters } = useContext( LetterContext )
    const { pause } = useContext( PauseContext )

    // This is in a ref because it would need to stay constant throughout the lifecycle of the component every time it's initialized
    const className = useRef( generateClassName() )

    const [ yAxis, setYAxis ] = useState( 100 )
    // This is in a ref for the same reason as the className variable
    const xAxis = useRef( ~~ ( ( Math.random() * 68 ) + 1 ) )
    // Positioning setup, later used in the style attribute
    const style = { left: `${xAxis.current}vw`, bottom: `${yAxis}%` }

    const letterElement =   
        <div key={ id } style={ style } className={ className.current } > 
            <p>{ letter }</p>
        </div>

    useEffect( () => { 
    if ( ! pause ) {
        const startFalling = setTimeout( () => 
            // This is where that multiplier state comes into the picture again. I picked an equation that feels the most right in terms of speed progression. Position sets istelf every 10ms so that it's slightly more aesthetically pleasing.
            setYAxis( prevYAxis => 
                prevYAxis - ( 0.25 * ( ( 10 + speed ) / 7 ) ) ), 10 )
        
        // This is where I handle the transition of the component from active to expired.
        if ( yAxis <= 0 ) {
            setLetters( prevLetters => ( {
                // I passed a UID prop so that I can target the specific component in question and move it across it's relative zones.
                active: prevLetters.active.filter( ( { props: { id: uid } } ) => uid !== id ),
                banished: [ ...prevLetters.banished, letterElement ] } ) )
            
            // Stops falling since it's at the bottom
            clearTimeout( startFalling ) }

        return () => clearTimeout( startFalling ) } }, [ yAxis, pause ] )

    return letterElement }

export default memo( Letter )