import logo from './rat.svg';
import './App.css';
import Generator from './Generator';
import React from 'react';

class App extends React.Component {

  componentDidMount(){
    document.title = "RAT - Recipe Generator Using GPT-3"
  }
  render() {
    return (
      <div className="App font-poppins w-screen bg-beige
      flex justify-center items-center flex-col">
        <object data={logo} className="w-128"/>
        <Generator/>
      </div>
    );

  }
}

export default App;
