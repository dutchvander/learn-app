
import './App.css'
import { Button } from './components/ui/button'
import Login  from './pages/login'
import Navbar from './components/Navbar'
import { ThemeProvider } from "./components/ThemeProvider";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <main>
      <ThemeProvider>      <Navbar/>
      <Login/></ThemeProvider>

    </main>
  )
}

export default App
/*
      <Navbar/>
      <Login/>
*/