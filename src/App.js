import myMusic from './assets/bgMusic.mp3'
import bgVideo from './assets/bgVideo2.mp4'
import './App.css';
import Weather from './components/Weather';
import { ToastContainer} from 'react-toastify'

function App() {
  

  return (
    <div className="App min-h-screen relative bg-black flex flex-col">
      <div className="absolute top-0 left-0 z-10">
          <audio controls loop >
            <source src={myMusic} type="audio/mp3"/>
          </audio>
      </div>

      <video autoPlay muted loop  className="absolute w-full max-h-screen object-cover left-0 right-0 top-0 opacity-50">
          <source src={bgVideo} type="video/mp4"/>
      </video>

      <Weather/>


      <ToastContainer/>

    </div>
  );
}

export default App;
