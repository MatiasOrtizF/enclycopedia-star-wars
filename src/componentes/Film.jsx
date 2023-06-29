import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ImageBackground, ScrollView, Text , TouchableOpacity, View , ActivityIndicator} from 'react-native';
import styles from './styles'
import Constants  from 'expo-constants'

export default function Film ({route , navigation}) {
    const {filmInfo} = route.params

    const [dataFilmInfo , setDataFilmInfo] = useState([])
    const [charactersName , setCharactersName] = useState([])
    const [planetsName, setPlanetsName] = useState([])
    const [starshipsName , setStarshipsName] = useState([])
    const [vehiclesName , setVehiclesName] = useState([])
    const [speciesName, setSpeciesName] = useState([])

    const [loading , setLoading] = useState(true)
    const [uploadedDataFilmInfo, setUploadedDataFilmInfo] = useState(false)
    const [uploadedCharactersName , setUploadedCharactersName] = useState(false)
    const [uploadedPlanetsName , setUploadedPlanetsName] = useState(false)
    const [uploadedStarshipsName , setUploadedStarshipsName] = useState(false)
    const [uploadedVehiclesName , setUploadedVehiclesName] = useState(false)
    const [uploadedSpeciesName, setUploadedSpeciesName ] = useState(false)


    useEffect(() => {
        callApi();
        setCharactersName([])
        setPlanetsName([])
        setStarshipsName([])
        setVehiclesName([])
        setSpeciesName([])
    } , [filmInfo]);

    useEffect(() => {
        if(uploadedDataFilmInfo) {
            characters();
            planets();
            starships();
            vehicles();
            species();
            console.log("hola")
        }
    } , [uploadedDataFilmInfo]);

    callApi = () => {
        fetch(filmInfo)
            .then(response=>response.json())
            .then(data=> {
                setDataFilmInfo(data)
                setUploadedDataFilmInfo(true)
            })
    }

    callApiCharacters= (characters) => {
        fetch(characters)
            .then(response=>response.json())
            .then(data=> {
                setCharactersName(prevState => ([
                    ...prevState,
                    {
                        ...data
                    }
                ]))
                setUploadedCharactersName(true)
        })
    }

    characters = () => {
        if(dataFilmInfo.characters.length>0) {
            dataFilmInfo.characters.map((character)=> (
                callApiCharacters(character)
            ))
        } else {
            setUploadedCharactersName(true)
        }
    }

    callApiPlanets= (species) => {
        fetch(species)
            .then(response=>response.json())
            .then(data=> {
                setPlanetsName(prevState => ([
                    ...prevState,
                    {
                        ...data
                    }
                ]))
                setUploadedPlanetsName(true)
        })
    }

    planets = () => {
        if(dataFilmInfo.planets.length>0) {
            dataFilmInfo.planets.map((planet)=> (
                callApiPlanets(planet)
            ))
        } else {
            setUploadedPlanetsName(true)
        }
    }

    callApiStarships= (species) => {
        fetch(species)
            .then(response=>response.json())
            .then(data=> {
                setStarshipsName(prevState => ([
                    ...prevState,
                    {
                        ...data
                    }
                ]))
                setUploadedStarshipsName(true)
        })
    }

    starships = () => {
        if(dataFilmInfo.starships.length>0) {
            dataFilmInfo.starships.map((starships)=> (
                callApiStarships(starships)
            ))
        } else {
            setUploadedStarshipsName(true)
        }
    }

    callApiVehicle = (vehicle) => {
        fetch(vehicle)
            .then(response=>response.json())
            .then(data=> {
                setVehiclesName(prevState => ([
                    ...prevState,
                    {
                        ...data
                    }
                ]))
                setUploadedVehiclesName(true)
        })
    }

    vehicles = () => {
        if(dataFilmInfo.vehicles.length>0) {
            dataFilmInfo.vehicles.map((vehicle)=> (
                callApiVehicle(vehicle)
            ))
        } else {
            setUploadedVehiclesName(true)
        }
    }

    callApiSpecies = (species) => {
        fetch(species)
            .then(response=>response.json())
            .then(data=> {
                setSpeciesName(prevState => ([
                    ...prevState,
                    {
                        ...data
                    }
                ]))
                setUploadedSpeciesName(true)
        })
    }

    species = () => {
        if(dataFilmInfo.species.length>0) {
            dataFilmInfo.species.map((species)=> (
                callApiSpecies(species)
            ))
        } else {
            setUploadedSpeciesName(true)
        }
    }

    const infoFilm = [
        { title: 'title', value: dataFilmInfo.title },
        { title: 'Episode id', value: dataFilmInfo.episode_id },
        { title: 'Opening crawl', value: dataFilmInfo.opening_crawl },
        { title: 'Director', value: dataFilmInfo.director },
        { title: 'Producer', value: dataFilmInfo.producer },
        { title: 'Release date', value: dataFilmInfo.release_date },
    ]

    return (
        uploadedCharactersName && uploadedPlanetsName && uploadedSpeciesName && uploadedVehiclesName && uploadedStarshipsName ? 
            <ImageBackground style={{flex:1}} source={{uri:"https://e1.pxfuel.com/desktop-wallpaper/656/769/desktop-wallpaper-minimalist-star-wars-iphone-star-wars-phone-minimalist.jpg"}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{paddingVertical:10 , paddingHorizontal:25}}>
                        {infoFilm.map((film, index) => (
                            <Text style={styles.moreInfoText} key={index}>
                                <Text style={styles.moreInfoTitle}>
                                    {film.title}:{'\u00A0'}
                                </Text>
                                {film.value}
                            </Text>
                        ))}
                        <View>
                            <View style={{paddingVertical:5}}>
                                <Text style={styles.moreInfoTitle}>Characters:</Text>
                                    {charactersName.map((character , index) => (
                                        <TouchableOpacity style={{marginVertical:1}} key={index}>
                                            <Text style={{color:"white" , fontSize:16 , fontWeight:600}} >{character.name}</Text>
                                        </TouchableOpacity>
                                    ))}
                            </View>
                            <View style={{paddingVertical:5}}>
                                <Text style={styles.moreInfoTitle}>Planets:</Text>
                                    {planetsName.map((planet , index) => (
                                        <TouchableOpacity style={{marginVertical:1}} key={index}>
                                            <Text style={{color:"white" , fontSize:16 , fontWeight:600}} >{planet.name}</Text>
                                        </TouchableOpacity>
                                    ))}
                            </View>
                            <View style={{paddingVertical:5}}>
                                <Text style={styles.moreInfoTitle}>Starships:</Text>
                                    {starshipsName.map((starship) => (
                                        <Text style={{color:"white" , fontSize:15 , fontWeight:600}}>{starship.name}</Text>
                                    ))}
                            </View>
                            <View style={{paddingVertical:5}}>
                                <Text style={styles.moreInfoTitle}>Vehicles:</Text>
                                    {vehiclesName.map((vehicle) => (
                                        <TouchableOpacity style={{marginVertical:1}} >
                                            <Text style={{color:"white" , fontSize:16 , fontWeight:600}}>{vehicle.name}</Text>
                                        </TouchableOpacity>
                                    ))}
                            </View>
                            <View style={{paddingVertical:5}}>
                                <Text style={styles.moreInfoTitle}>Species:</Text>
                                    {speciesName.map((specie) => (
                                        <Text style={{color:"white" , fontSize:15 , fontWeight:600}}>{specie.name}</Text>
                                    ))}
                            </View>
                        </View>
                    </View>
                </ScrollView>   
            </ImageBackground>
        :
            <ActivityIndicator size="large" color="#0000ff" />
    );
}
