import  {useState}  from "react"
import  Header  from "./components/Header"
import  PokeCard  from "./components/PokeCard"
import  SideNav  from "./components/SideNav"


function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(0);
  const [showSideMenu, setShowSideMenu] = useState(true);

  function handleToggleMenu() {
    setShowSideMenu(!showSideMenu)
  }

  function handleCloseMenu(){
    setShowSideMenu(true)
  }

  return (
    <>
      {/* 1- FIRST TODO RENDER THE COMPONENTS */}
      <Header handleToggleMenu={handleToggleMenu}/>
      <SideNav 
      showSideMenu={showSideMenu} 
      selectedPokemon={selectedPokemon} 
      setSelectedPokemon= {setSelectedPokemon} 
      handleToggleMenu={handleToggleMenu}
      handleCloseMenu={handleCloseMenu}
      />
      <PokeCard selectedPokemon={selectedPokemon}/>
    </>
  )
}

export default App
