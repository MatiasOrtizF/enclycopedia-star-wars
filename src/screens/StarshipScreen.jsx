import { useEffect , useState } from 'react';
import { ImageBackground , ScrollView , Text , View } from 'react-native';
import styles from '../components/styles'
import Loading from '../components/Loading'
import FilmsCard from '../components/FilmsCard'
import PeopleCard from '../components/PeopleCard'

export default function StarshipScreen ({route}) {
    const {starshipInfo} = route.params
    const [DataStarshipInfo , setDataStarshipInfo] = useState([])
    const [uploadedDataStarshipInfo, setUploadedDataStarshipInfo] = useState(false)

    useEffect(() => {
        callApi();
        setDataStarshipInfo([]);
    } , [starshipInfo]);

    callApi = () => {
        fetch(starshipInfo)
            .then(response=>response.json())
            .then(data=> {
                setDataStarshipInfo(data)
                setUploadedDataStarshipInfo(true)
            })
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
        uploadedDataStarshipInfo ? 
            <ImageBackground style={{flex:1}} source={{uri:"https://e1.pxfuel.com/desktop-wallpaper/562/505/desktop-wallpaper-paulina-dubec-on-iphone-in-2020-star-wars-minimalist-phone.jpg"}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{paddingVertical:10 , paddingHorizontal:25}}>
                        {infoStarship.map((starhip, index) => (
                            <Text style={styles.moreInfoText} key={index}>
                                <Text style={styles.moreInfoTitle}>
                                    {starhip.title}:{'\u00A0'}
                                </Text>
                                {starhip.value}
                            </Text>
                        ))}
                        <View>
                            <FilmsCard {...DataStarshipInfo}/>
                            <PeopleCard people={DataStarshipInfo.pilots} title="Pilots"/>
                        </View>
                    </View>
                </ScrollView>   
            </ImageBackground>
        :
            <Loading/>
    );
}