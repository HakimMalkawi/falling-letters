import { useContext, memo } from "react"
import { ScoreContext } from "../../../../context/ScoreContext"
import "./score-counter.css"

const ScoreCounter = () => {
    const { score } = useContext( ScoreContext )

    return  <div className="score-counter_wrapper" aria-label="Your Current Score" >
                <h1>Score</h1>
                <h2>{ score }</h2>
            </div> }

export default memo( ScoreCounter )