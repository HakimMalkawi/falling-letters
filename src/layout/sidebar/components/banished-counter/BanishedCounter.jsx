import { useContext, memo } from "react"
import { LetterContext }from "../../../../context/LetterContext"
import "./banished-counter.css"

const BanishedCounter = () => {
    const { letters } = useContext( LetterContext )

    return  <div className="banised-counter_wrapper" aria-label="Letters Lost" >
                <h1>Lost</h1>
                <h2>{ letters.banished.length > 20 ? 20 : letters.banished.length }</h2>
            </div> }
// I hardcoded 20 as the maximum number as there is a chance for currently falling letters to still be present after the max threshold is hit, that would later reflect in the counter.

export default memo( BanishedCounter )