import React from 'react';
import './App.css';
import Navbar from './components/header';
import NavTabs from './components/navTab';
import Footer from './components/footer';

function App() {
  return (
    <div className="app">
      <Navbar />
      <NavTabs />
      <Footer/>
    </div>
  );
}
export default App;