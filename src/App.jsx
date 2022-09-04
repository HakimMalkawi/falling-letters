import { LetterProvider } from "./context/LetterContext"
import { ScoreProvider } from "./context/ScoreContext"
import { SpeedProvider } from "./context/SpeedContext"
import { PauseProvider } from "./context/PauseContext"
import Game from "./layout/game/Game"
import "./app.css"

const App = () => 
    <PauseProvider>
        <SpeedProvider>
            <LetterProvider>
                <ScoreProvider>
                    <Game />
                </ScoreProvider>
            </LetterProvider>
        </SpeedProvider>
    </PauseProvider>
    
export default App