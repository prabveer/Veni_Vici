const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
import { useState } from 'react'
import Dogs from './Components/dogs';
import './App.css'

function App() {

  const [imageSrc, setImageSrc] = useState('');
  const [names, setName] = useState('N/A');
  const [bredfor, setBredFor] = useState('N/A');
  const [breedgroup, setBreedGroup] = useState('N/A');
  const [banned, setBanned] = useState([]);
  let banState = true;
  let url = "Default";
  let name = "Default";
  let bred_for = "Default";
  let breed_group = "Default";
  let life = "Default";
  let height = "Default";
  let width = "Default";

  function reset() {
      url = "Default";
      name = "Default";
      bred_for = "Default";
      breed_group = "Default";
      life = "Default";
      height = "Default";
      width = "Default";
      banState = true;
    }
  const makeQuery = () => {
    reset()
    let query = `https://api.thedogapi.com/v1/images/search?limit=1&has_breeds=1&api_key=${ACCESS_KEY}`
    callAPI(query).catch(console.error);
  }
  const callAPI = async (query) => {
    const response = await fetch(query);
    const data = await response.json();
    data.map(function(dataArry) {

      const imageData = dataArry;
      url = `${imageData.url}`;
      height = imageData.height;
      width = imageData.width;
      setImageSrc(url);

      dataArry.breeds.map(function(breedsData)
      {
        const breeds = breedsData;
        name = breeds.name;
        bred_for =  breeds.bred_for;
        breed_group =  breeds.breed_group;
        life =  breeds.life;
        setName(name+" ");
        while(banState)
        {
          banned.map(function(ban){
            if(names == ban)
            {
              makeQuery()
              console.log("pain")
            }
          });
          banState = false;
        }
        setBredFor(bred_for);
        setBreedGroup(breed_group);
      })
    });
  }
  const Banned = () => {
    setBanned(banned => [...banned,names])
  }

  return (
  <>
  <button onClick={Banned}>{names}</button>
  <div>{bredfor}</div>
  <div>{breedgroup}</div>
  <img src = {imageSrc} width={500} height={500} alt = "Click Button"/>
  <div>
    <button onClick={makeQuery}>Click Here!</button>
  </div>
  <div>banned list</div>
  <div>{banned}</div>
  </>
  )
}

export default App
