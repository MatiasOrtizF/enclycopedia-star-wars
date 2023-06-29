import { useEffect, useState } from 'react';
import { ImageBackground, ScrollView, Text , TouchableOpacity, View } from 'react-native';
import styles from './styles'
import Loading from './Loading'

export default function Planet ({route , navigation}) {
    const {planetInfo} = route.params

    const [DataPlanetInfo , setDataPlanetInfo] = useState([])
    const [peopleName , setPeopleName] = useState([])

    const [uploadedDataPlanetInfo, setUploadedDataPlanetInfo] = useState(false)
    const [loading , setLoading] = useState(true)

    useEffect(() => {
        callApi();
        setDataPlanetInfo([]);
        setPeopleName([]);
    } , [planetInfo]);

    useEffect(() => {
        if(uploadedDataPlanetInfo) {
            residents();
        }
    } , [uploadedDataPlanetInfo]);

    callApi = () => {
        fetch(planetInfo)
            .then(response=>response.json())
            .then(data=> {
                setDataPlanetInfo(data)
                setUploadedDataPlanetInfo(true)
            })
    }

    callApiResidents = (resident) => {
        fetch(resident)
            .then(response=>response.json())
            .then(data=> {
                setPeopleName(prevState => ([
                    ...prevState,
                    {
                        ...data
                    }
                ]))
                setLoading(false)
            })
    }

    residents = () => {
        if(DataPlanetInfo.residents.length>0) {
            DataPlanetInfo.residents.map((resident)=> (
                callApiResidents(resident)
            ))
        } else {
            setLoading(false)
        }
    }

    //se repite en More-Info
    const nameFilms = {
        "https://swapi.dev/api/films/1/" : "A New Hope",
        "https://swapi.dev/api/films/2/" : "The Empire Strikes Back",
        "https://swapi.dev/api/films/3/" : "Return of the Jedi",
        "https://swapi.dev/api/films/4/" : "The Phantom Menace",
        "https://swapi.dev/api/films/5/" : "Attack of the Clones",
        "https://swapi.dev/api/films/6/" : "Revenge of the Sith",
    }

    const infoPlanet = [
        { title: 'Name', value: DataPlanetInfo.name },
        { title: 'Rotation period', value: DataPlanetInfo.rotation_period },
        { title: 'orbital period', value: DataPlanetInfo.orbital_period },
        { title: 'diameter', value: DataPlanetInfo.diameter },
        { title: 'climate', value: DataPlanetInfo.climate },
        { title: 'gravity', value: DataPlanetInfo.gravity },
        { title: 'terrain', value: DataPlanetInfo.terrain },
        { title: 'surface water', value: DataPlanetInfo.surface_water },
        { title: 'Population' , value: DataPlanetInfo.population}
    ]

    return (
        loading ? 
            <Loading/>
        :
                <ImageBackground style={{flex:1}} source={{uri:"https://e0.pxfuel.com/wallpapers/260/732/desktop-wallpaper-apple-iphone-14-pro-14-pro-max.jpg"}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{paddingVertical:10 , paddingHorizontal:25}}>
                        {infoPlanet.map((planet, index) => (
                            <Text style={styles.moreInfoText} key={index}>
                                <Text style={styles.moreInfoTitle}>
                                    {planet.title}:{'\u00A0'}
                                </Text>
                                {planet.value}
                            </Text>
                        ))}
                        <View>
                            <View style={{paddingVertical:5}}>
                                <Text style={styles.moreInfoTitle}>Films:</Text>
                                    {DataPlanetInfo.films.map((film , index) => (
                                        <TouchableOpacity onPress={()=>navigation.navigate('Film', {filmInfo: film})}  style={{marginVertical:1}} key={index}>
                                            <Text style={{color:"white" , fontSize:16 , fontWeight:600}} >{nameFilms[film]}</Text>
                                        </TouchableOpacity>
                                    ))}
                            </View>
                            <View style={{paddingVertical:5}}>
                                <Text style={styles.moreInfoTitle}>Residents:</Text>
                                    {peopleName.map((people) => (
                                        <TouchableOpacity onPress={()=>navigation.navigate('MoreInfo', {peopleInfo: people.url})} style={{marginVertical:1}} >
                                            <Text style={{color:"white" , fontSize:16 , fontWeight:600}}>{people.name}</Text>
                                        </TouchableOpacity>
                                    ))}
                            </View>
                        </View>
                    </View>
                </ScrollView>   
            </ImageBackground>
    );
}
