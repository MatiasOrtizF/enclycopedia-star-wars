import { useEffect, useState } from 'react';
import { ImageBackground, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles'
import Loading from './Loading'

export default function Starship ({route , navigation}) {
    const {starshipInfo} = route.params

    const [DataStarshipInfo , setDataStarshipInfo] = useState([])
    const [peopleName , setPeopleName] = useState([])

    const [uploadedDataStarshipInfo, setUploadedDataStarshipInfo] = useState(false)
    const [loading , setLoading] = useState(true)

    useEffect(() => {
        callApi();
        setDataStarshipInfo([]);
        setPeopleName([]);
    } , [starshipInfo]);

    useEffect(() => {
        if(uploadedDataStarshipInfo) {
            pilots();
        }
    } , [uploadedDataStarshipInfo]);

    callApi = () => {
        fetch(starshipInfo)
            .then(response=>response.json())
            .then(data=> {
                setDataStarshipInfo(data)
                setUploadedDataStarshipInfo(true)
            })
    }

    callApiPilots= (pilots) => {
        fetch(pilots)
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

    pilots = () => {
        if(DataStarshipInfo.pilots.length>0) {
            DataStarshipInfo.pilots.map((pilot)=> (
                callApiPilots(pilot)
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

    const infoStarship = [
        { title: 'Name', value: DataStarshipInfo.name },
        { title: 'Model', value: DataStarshipInfo.model},
        { title: 'Manufacturer', value: DataStarshipInfo.manufacturer },
        { title: 'Cost in credits', value: DataStarshipInfo.cost_in_credits },
        { title: 'Length', value: DataStarshipInfo.length },
        { title: 'Max atmosphering speed', value: DataStarshipInfo.max_atmosphering_speed },
        { title: 'Crew', value: DataStarshipInfo.crew },
        { title: 'Passengers', value: DataStarshipInfo.passengers },
        { title: 'Cargo capacity' , value: DataStarshipInfo.cargo_capacity },
        { title: 'Consumables' , value: DataStarshipInfo.consumables },
        { title: 'hyperdrive rating' , value: DataStarshipInfo.hyperdrive_rating },
        { title: 'MGLT' , value: DataStarshipInfo.MGLT },
        { title: 'Starship class' , value: DataStarshipInfo.starship_class }
    ]


    return (
        loading ? 
            <Loading/>
        :
            <ImageBackground style={{flex:1}} source={{uri:"https://e1.pxfuel.com/desktop-wallpaper/562/505/desktop-wallpaper-paulina-dubec-on-iphone-in-2020-star-wars-minimalist-phone.jpg"}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{paddingVertical:10 , paddingHorizontal:25}}>
                        {infoStarship.map((vehicle, index) => (
                            <Text style={styles.moreInfoText} key={index}>
                                <Text style={styles.moreInfoTitle}>
                                    {vehicle.title}:{'\u00A0'}
                                </Text>
                                {vehicle.value}
                            </Text>
                        ))}
                        <View>
                            <View style={{paddingVertical:5}}>
                                <Text style={styles.moreInfoTitle}>Films:</Text>
                                    {DataStarshipInfo.films.map((film , index) => (
                                        <TouchableOpacity onPress={()=>navigation.navigate('Film', {filmInfo: film})} style={{marginVertical:1}} key={index}>
                                            <Text style={{color:"white" , fontSize:16 , fontWeight:600}} >{nameFilms[film]}</Text>
                                        </TouchableOpacity>
                                    ))}
                            </View>
                            <View style={{paddingVertical:5}}>
                                <Text style={styles.moreInfoTitle}>Pilots:</Text>
                                    {peopleName.map((people) => (
                                        <TouchableOpacity  onPress={()=>navigation.navigate('MoreInfo', {peopleInfo: people.url})} style={{marginVertical:1}} >
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
