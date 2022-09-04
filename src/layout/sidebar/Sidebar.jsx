import { memo } from "react"
import BanishedCounter from "./components/banished-counter/BanishedCounter"
import ScoreCounter from "./components/score-counter/ScoreCounter"
import Speed from "./components/speed/Speed"
import Disclaimer from "./components/disclaimer/Disclaimer"
import "./sidebar.css"

const Sidebar = () =>
    <aside className="sidebar_wrapper" aria-label="Sidebar" >
        <ScoreCounter />
        <BanishedCounter />
        <Speed />
        <Disclaimer />
    </aside>
    
export default memo( Sidebar )