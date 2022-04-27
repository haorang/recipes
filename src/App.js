import logo from './rat.svg';
import './App.css';
import Generator from './Generator';

function App() {
  return (
    <div className="App font-poppins w-screen h-screen border-solid border-2 border-indigo-600 bg-beige
    flex justify-center items-center flex-col">
      <object data={logo} className="w-128"/>
      <Generator/>
    </div>
  );
}

export default App;
