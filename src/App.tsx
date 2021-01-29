import StoreProvider from 'store';
import BoardPageContainer from 'pages/BoardPage/BoardPageContainer';
import React from 'react';
import './App.css';
import Navbar from 'components/Navbar';

function App() {
  return (
    <div className="app-container">
      <StoreProvider>
        <Navbar />
        <BoardPageContainer />
      </StoreProvider>
    </div>
  );
}

export default App;
