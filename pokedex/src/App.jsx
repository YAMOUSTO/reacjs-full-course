import  {useState}  from "react"
import  Header  from "./components/Header"
import  PokeCard  from "./components/PokeCard"
import  SideNav  from "./components/SideNav"


function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(0);

  return (
    <>
      {/* 1- FIRST TODO RENDER THE COMPONENTS */}
      <Header />
      <SideNav selectedPokemon={selectedPokemon} setSelectedPokemon= {setSelectedPokemon}/>
      <PokeCard selectedPokemon={selectedPokemon}/>
    </>
  )
}

export default App
