import { useEffect, useState } from "react"
import { getFullPokedexNumber, getPokedexNumber } from "../utils"
import TypeCard  from "./TypeCard"


export default function PokeCard(props) {
    const {selectedPokemon} = props
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    
    

    const {name, height, abilities, stats, types, moves, sprites} = data || {}

    const imgList = Object.keys(sprites || {}).filter(val => {
        if(!sprites[val]) {return false}
        if(['versions', 'other'].includes(val)) {return false}
        return true
    })

    useEffect(() => {
        // LOADING STATE (if loading, exit logic)
        console.log("selectedPokemon:", selectedPokemon);

        if (loading || !localStorage || data) { return }

        // then check if the selected information is available in the cache
            // 1. define the cache
            let cache = {}
            if (localStorage.getItem('pokedex')) {
                cache = JSON.parse(localStorage.getItem('pokedex'))
            }
            //2. check if the selected pokemon is in the cache, otherwise fetch 

            if (selectedPokemon in cache) {
                // read from cache
                setData(cache[selectedPokemon])
                 console.log('Found pokemon in cache')
                return 
            } 

            //we passed all the cache stuff to no avail and now need to fetch the data from the api

            async function fetchPokemonData() {
             setLoading(true)
                try {
                const baseUrl = 'https://pokeapi.co/api/v2/'
                const suffix = 'pokemon/' + getPokedexNumber(selectedPokemon)
                const finalUrl = baseUrl + suffix
                const res = await fetch(finalUrl)
                const pokemonData = await res.json()
                setData(pokemonData)
                console.log(pokemonData)
                cache[selectedPokemon] = pokemonData
                localStorage.setItem('pokedex', JSON.stringify(cache))
             } catch (err) {
                console.log(err.message)
             } finally {
                setLoading(false)
             }
            }
            fetchPokemonData()
            //3. if we fetch from the api, make sure to save the information to the cache for next time
    }, [selectedPokemon])

    if(loading || !data) {
        return (
            <div>
                <h4>Loading...</h4>
            </div>
        )
    }

    return (
        <div className="poke-card">
            <div >
                <h4>#{getFullPokedexNumber(selectedPokemon)}</h4>
                <h2>{name}</h2>
            </div>
            <div className="type-container">
                {types.map((typeOj, typeIndex) => {
                    return(
                        <TypeCard key={typeIndex} type={typeOj?.type?.name} />
                    )
                })}
            </div>
            <img className="default-img" src={"./pokemon/" + 
                getFullPokedexNumber(selectedPokemon) + ".png"} 
                alt={`${name}-large-img`} />

                <div className="img-container">
                    {imgList.map((spriteUrl, spriteIndex) => {
                        return (
                            <img key={spriteIndex} src={""} alt={`${name}
                                -img-${spriteUrl}`} />
                        )
                    })}
                </div>
        </div>
    )
}