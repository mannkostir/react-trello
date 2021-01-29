import StoreProvider from 'store';
import BoardPageContainer from 'pages/BoardPage/BoardPageContainer';
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <StoreProvider>
        <BoardPageContainer />
      </StoreProvider>
    </div>
  );
}

export default App;
