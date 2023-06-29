import { useEffect, useState } from 'react';
import { ImageBackground, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles'
import Loading from './Loading'

export default function Species ({route , navigation}) {
    const {specieInfo} = route.params

    const [DataSpecieInfo , setDataSpecieInfo] = useState([])
    const [peopleName , setPeopleName] = useState([])

    const [uploadedDataSpecieInfo, setUploadedDataSpecieInfo] = useState(false)
    const [loading , setLoading] = useState(true)

    useEffect(() => {
        callApi();
        setDataSpecieInfo([]);
        setPeopleName([]);
    } , [specieInfo]);

    useEffect(() => {
        if(uploadedDataSpecieInfo) {
            people();
        }
    } , [uploadedDataSpecieInfo]);

    callApi = () => {
        fetch(specieInfo)
            .then(response=>response.json())
            .then(data=> {
                setDataSpecieInfo(data)
                setUploadedDataSpecieInfo(true)
            })
    }

    callApipeople= (people) => {
        fetch(people)
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

    people = () => {
        if(DataSpecieInfo.people.length>0) {
            DataSpecieInfo.people.map((people)=> (
                callApipeople(people)
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

    const infoSpecie = [
        { title: 'Name', value: DataSpecieInfo.name },
        { title: 'Classification', value: DataSpecieInfo.classification},
        { title: 'Designation', value: DataSpecieInfo.designation },
        { title: 'Average height', value: DataSpecieInfo.average_height },
        { title: 'Skin colors', value: DataSpecieInfo.skin_colors },
        { title: 'Hair colors', value: DataSpecieInfo.hair_colors },
        { title: 'Eye colors', value: DataSpecieInfo.eye_colors },
        { title: 'Average lifespan', value: DataSpecieInfo.average_lifespan },
        { title: 'Homeworld' , value: DataSpecieInfo.homeworld },
        { title: 'Language' , value: DataSpecieInfo.language }
    ]


    return (
        loading ? 
            <Loading/>
        :
            <ImageBackground style={{flex:1}} source={{uri:"https://e1.pxfuel.com/desktop-wallpaper/125/138/desktop-wallpaper-iphone-minimalist-aesthetic-star-wars-star-wars-aesthetic.jpg"}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{paddingVertical:10 , paddingHorizontal:25}}>
                        {infoSpecie.map((specie, index) => (
                            <Text style={styles.moreInfoText} key={index}>
                                <Text style={styles.moreInfoTitle}>
                                    {specie.title}:{'\u00A0'}
                                </Text>
                                {specie.value}
                            </Text>
                        ))}
                        <View>
                            <View style={{paddingVertical:5}}>
                                <Text style={styles.moreInfoTitle}>Films:</Text>
                                    {DataSpecieInfo.films.map((film , index) => (
                                        <TouchableOpacity onPress={()=>navigation.navigate('Film', {filmInfo: film})} style={{marginVertical:1}} key={index}>
                                            <Text style={{color:"white" , fontSize:16 , fontWeight:600}} >{nameFilms[film]}</Text>
                                        </TouchableOpacity>
                                    ))}
                            </View>
                            <View style={{paddingVertical:5}}>
                                <Text style={styles.moreInfoTitle}>People:</Text>
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
