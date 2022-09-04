import { useContext, memo } from "react"
import { SpeedContext } from "../../../../context/SpeedContext"
import "./speed.css"

const Speed = () => {
    const { speed } = useContext( SpeedContext )

    return  <div className="speed_wrapper" aria-label="Speed Multiplier" >
                <h1>Speed</h1>
                <h2>{ `${ speed }X` }</h2>
            </div> }

export default memo( Speed )