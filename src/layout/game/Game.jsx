import { useContext, memo } from "react"
import { PauseContext } from "../../context/PauseContext"
import ActiveArea from "../active-area/ActiveArea"
import Deadzone from "../deadzone/Deadzone"
import Sidebar from "../sidebar/Sidebar"
import PauseOverlay from "../pause-overlay/PauseOverlay"
import "./game.css"

const Game = () => {
    const { pause } = useContext( PauseContext )
    
    return  <div className="game_wrapper" role="none" >
                <ActiveArea />
                <Deadzone />
                <Sidebar />
                { pause && <PauseOverlay /> }
            </div> }
    
export default memo( Game )