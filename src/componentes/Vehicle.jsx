import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View , ActivityIndicator } from 'react-native';
import styles from './styles'
import Constants  from 'expo-constants'

export default function Vehicle ({route , navigation}) {
    const {vehicleInfo} = route.params

    const [DataVehicleInfo , setDataVehicleInfo] = useState([])
    const [peopleName , setPeopleName] = useState([])

    const [uploadedDataVehicleInfo, setUploadedDataVehicleInfo] = useState(false)
    const [loading , setLoading] = useState(true)

    useEffect(() => {
        callApi();
        pilots();
    } , []);

    useEffect(() => {
        if(uploadedDataVehicleInfo) {
            residents();
        }
    } , [uploadedDataVehicleInfo]);

    callApi = () => {
        fetch(vehicleInfo)
            .then(response=>response.json())
            .then(data=> {
                setDataVehicleInfo(data)
                setUploadedDataVehicleInfo(true)
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
        if(DataVehicleInfo.pilots.length>0) {
            DataVehicleInfo.pilots.map((pilot)=> (
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

    const infoVehicle = [
        { title: 'Name', value: DataVehicleInfo.name },
        { title: 'Model', value: DataVehicleInfo.model},
        { title: 'Manufacturer', value: DataVehicleInfo.manufacturer },
        { title: 'Cost in credits', value: DataVehicleInfo.cost_in_credits },
        { title: 'Length', value: DataVehicleInfo.length },
        { title: 'Max atmosphering speed', value: DataVehicleInfo.max_atmosphering_speed },
        { title: 'Crew', value: DataVehicleInfo.crew },
        { title: 'Passengers', value: DataVehicleInfo.passengers },
        { title: 'Cargo capacity' , value: DataVehicleInfo.cargo_capacity },
        { title: 'Consumables' , value: DataVehicleInfo.consumables },
        { title: 'Vehicle_class' , value: DataVehicleInfo.vehicle_class }
    ]


    return (
        loading ? 
            <ActivityIndicator size="large" color="#0000ff" />
        :
            <ImageBackground style={{flex:1}} source={{uri:"https://e0.pxfuel.com/wallpapers/260/732/desktop-wallpaper-apple-iphone-14-pro-14-pro-max.jpg"}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{paddingVertical:10 , paddingHorizontal:25}}>
                        {infoVehicle.map((vehicle, index) => (
                            <Text style={styles.moreInfoText} key={index}>
                                <Text style={styles.moreInfoTitle}>
                                    {vehicle.title}:{'\u00A0'}
                                </Text>
                                {vehicle.value}
                            </Text>
                        ))}
                        {/* <TouchableOpacity onPress={()=>navigation.navigate('Planet', {planetInfo: DataVehicleInfo.homeworld})} style={{backgroundColor:"#8AC5D3" , alignSelf:"flex-start" , padding:7 , borderRadius:7 , marginVertical: 5}}>
                            <Text style={{color:"black" , fontWeight:700 , fontSize:16}}>Home World</Text>
                        </TouchableOpacity> */}
                        <View>
                            <View style={{paddingVertical:5}}>
                                <Text style={styles.moreInfoTitle}>Films:</Text>
                                    {DataVehicleInfo.films.map((film , index) => (
                                        <TouchableOpacity style={{marginVertical:1}} key={index}>
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
