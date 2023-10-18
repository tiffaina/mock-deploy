import '../styles/App.css';
import REPL from './REPL';

/**
 * This is the highest level component!
 */
function App() {
  return (
    <div className="App">
      <p className="App-header">
        <h1>Mock</h1>
        <p> by jake stifelman + tiffney aina</p>
      </p>
      <REPL />      
    </div>
  );
}

export default App;