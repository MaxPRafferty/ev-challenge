import logo from "./logo.svg";
import "./App.css";

function App({ trips, data }) {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Electric Vehicle Performance Comparison</h1>
            </header>
            <div>Data: {JSON.stringify(data)}</div>
            <footer>Max Rafferty, 2022</footer>
        </div>
    );
}

export default App;
