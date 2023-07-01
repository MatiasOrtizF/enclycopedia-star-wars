import { useEffect , useState } from 'react';
import { ImageBackground , ScrollView , Text , View } from 'react-native';
import styles from '../components/styles'
import Loading from '../components/Loading'
import FilmsCard from '../components/FilmsCard';
import PeopleCard from '../components/PeopleCard';

export default function PlanetScreen ({route}) {
    const {planetInfo} = route.params
    const [DataPlanetInfo , setDataPlanetInfo] = useState([])
    const [uploadedDataPlanetInfo, setUploadedDataPlanetInfo] = useState(false)

    useEffect(() => {
        callApi();
        setDataPlanetInfo([]);
    } , [planetInfo]);

    callApi = () => {
        fetch(planetInfo)
            .then(response=>response.json())
            .then(data=> {
                setDataPlanetInfo(data)
                setUploadedDataPlanetInfo(true)
            })
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
        uploadedDataPlanetInfo ? 
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
                            <FilmsCard {...DataPlanetInfo}/>
                            <PeopleCard people={DataPlanetInfo.residents} title="Residents"></PeopleCard>
                        </View>
                    </View>
                </ScrollView>   
            </ImageBackground>
        :
            <Loading/>
    );
}
