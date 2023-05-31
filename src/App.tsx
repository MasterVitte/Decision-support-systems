import React from 'react';
import './App.css';
import {Table} from './components/Table';
import {SwitchModeProvider} from './components/SwitchModeProvider';

function App() {
  return (
    <div className='App'>
        <SwitchModeProvider>
            <Table />
        </SwitchModeProvider>
    </div>
  );
}

export default App;
