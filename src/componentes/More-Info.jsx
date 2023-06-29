import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View , ActivityIndicator} from 'react-native';
import styles from './styles'
import Constants  from 'expo-constants'

export default function MoreInfo ({route , navigation}) {
    const {peopleInfo} = route.params

    const [dataPeopleInfo , setDataPeopleInfo] = useState([])
    const [vehiclesName , setVehiclesName] = useState([])
    const [speciesName, setSpeciesName] = useState([])
    const [starshipsName , setStarshipsName] = useState([])

    const [loading, setLoading] = useState(true);
    const [uploadedDataPeopleInfo, setUploadedDataPeopleInfo] = useState(false);
    const [uploadedVehiclesName , setUploadedVehiclesName] = useState(false)
    const [uploadedSpeciesName, setUploadedSpeciesName ] = useState(false)
    const [uploadedStarshipsName , setUploadedStarshipsName] = useState(false)

    useEffect(() => {
        callApiFirst();
        setVehiclesName([])
        setSpeciesName([])
        setStarshipsName([])
    } , [peopleInfo]);

    useEffect(() => {
        if(uploadedDataPeopleInfo) {
            vehicles();
            species();
            starships();
        }
    } , [uploadedDataPeopleInfo]);

    callApiFirst = () => {
        setUploadedDataPeopleInfo(false)
        fetch(peopleInfo)
            .then(response=>response.json())
            .then(data=> {
                setDataPeopleInfo(data)
                setUploadedDataPeopleInfo(true)
            })
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
        if(dataPeopleInfo.vehicles.length>0) {
            dataPeopleInfo.vehicles.map((vehicle)=> (
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
        if(dataPeopleInfo.species.length>0) {
            dataPeopleInfo.species.map((species)=> (
                callApiSpecies(species)
            ))
        } else {
            setUploadedSpeciesName(true)
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
        if(dataPeopleInfo.starships.length>0) {
            dataPeopleInfo.starships.map((starships)=> (
                callApiStarships(starships)
            ))
        } else {
            setUploadedStarshipsName(true)
        }
    }

    const nameFilms = {
        "https://swapi.dev/api/films/1/" : "A New Hope",
        "https://swapi.dev/api/films/2/" : "The Empire Strikes Back",
        "https://swapi.dev/api/films/3/" : "Return of the Jedi",
        "https://swapi.dev/api/films/4/" : "The Phantom Menace",
        "https://swapi.dev/api/films/5/" : "Attack of the Clones",
        "https://swapi.dev/api/films/6/" : "Revenge of the Sith",
    }

    const infoPeople = [
        { title: 'Name', value: dataPeopleInfo.name },
        { title: 'Height', value: dataPeopleInfo.height },
        { title: 'Mass', value: dataPeopleInfo.mass },
        { title: 'Hair color', value: dataPeopleInfo.hair_color },
        { title: 'Skin color', value: dataPeopleInfo.skin_color },
        { title: 'Eye color', value: dataPeopleInfo.eye_color },
        { title: 'Birth year', value: dataPeopleInfo.birth_year },
        { title: 'Gender', value: dataPeopleInfo.gender }
    ]

    return (
        uploadedSpeciesName && uploadedVehiclesName && uploadedStarshipsName ? 
            <ImageBackground style={{flex:1}} source={{uri:"https://e1.pxfuel.com/desktop-wallpaper/656/769/desktop-wallpaper-minimalist-star-wars-iphone-star-wars-phone-minimalist.jpg"}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{paddingVertical:10 , paddingHorizontal:25}}>
                        {infoPeople.map((people, index) => (
                            <Text style={styles.moreInfoText} key={index}>
                                <Text style={styles.moreInfoTitle}>
                                    {people.title}:{'\u00A0'}
                                </Text>
                                {people.value}
                            </Text>
                        ))}
                        <TouchableOpacity onPress={()=>navigation.navigate('Planet', {planetInfo: dataPeopleInfo.homeworld})} style={{backgroundColor:"#8AC5D3" , alignSelf:"flex-start" , padding:7 , borderRadius:7 , marginVertical: 5}}>
                            <Text style={{color:"black" , fontWeight:700 , fontSize:16}}>Home World</Text>
                        </TouchableOpacity>
                        <View>
                            <View style={{paddingVertical:5}}>
                                <Text style={styles.moreInfoTitle}>Films:</Text>
                                    {dataPeopleInfo.films.map((film , index) => (
                                        <TouchableOpacity onPress={()=>navigation.navigate('Film', {filmInfo: film})} style={{marginVertical:1}} key={index}>
                                            <Text style={{color:"white" , fontSize:16 , fontWeight:600}} >{nameFilms[film]}</Text>
                                        </TouchableOpacity>
                                    ))}
                            </View>
                            <View style={{paddingVertical:5}}>
                                <Text style={styles.moreInfoTitle}>Vehicles:</Text>
                                    {vehiclesName.map((vehicle) => (
                                        <TouchableOpacity onPress={()=>navigation.navigate('Vehicle', {vehicleInfo: vehicle.url})} style={{marginVertical:1}} >
                                            <Text style={{color:"white" , fontSize:16 , fontWeight:600}}>{vehicle.name}</Text>
                                        </TouchableOpacity>
                                    ))}
                            </View>
                            <View style={{paddingVertical:5}}>
                                <Text style={styles.moreInfoTitle}>Species:</Text>
                                    {speciesName.map((specie) => (
                                        <TouchableOpacity onPress={()=>navigation.navigate('Specie', {specieInfo: specie.url})}>
                                            <Text style={{color:"white" , fontSize:15 , fontWeight:600}}>{specie.name}</Text>
                                        </TouchableOpacity>
                                    ))}
                            </View>
                            <View style={{paddingVertical:5}}>
                                <Text style={styles.moreInfoTitle}>Starships:</Text>
                                    {starshipsName.map((starship) => (
                                        <TouchableOpacity onPress={()=>navigation.navigate('Starship', {starshipInfo: starship.url})}>
                                            <Text style={{color:"white" , fontSize:15 , fontWeight:600}}>{starship.name}</Text>
                                        </TouchableOpacity>
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
