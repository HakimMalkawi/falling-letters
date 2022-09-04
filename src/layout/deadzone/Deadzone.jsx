import { useContext, memo } from "react"
import { LetterContext } from "../../context/LetterContext"
import "./deadzone.css"

const Deadzone = () => {
    const { letters } = useContext( LetterContext )
    
    return  <section className="deadzone_wrapper" aria-label="Deadzone Area" >
                { letters.banished }
            </section> }
            
export default memo( Deadzone )