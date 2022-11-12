
import './App.css';
import Search from './components/Search';
import Ads from './components/Ads';
import React, { useState } from 'react';


function App() {
  const [results, setResults] = useState([]);
  console.log(results);
  return (
    <div className="App">
      <header className='App-header' >
        
        <div className="search-box">
          <Search setResults={setResults}/>

          <div className="search-results">
            <Ads ads={results} />
          </div>
        </div>
        
      </header>

    </div>
  );
}

export default App;
