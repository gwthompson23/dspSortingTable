import React from 'react';
import './App.css';
import Table from './Table.js'

class App extends React.Component {
    render() {
      return(
        <div>
          <div className = 'header'>
            <h1>Sorting Table</h1>
          </div>
          <Table/>
        </div>
      )
    }
}

export default App;
