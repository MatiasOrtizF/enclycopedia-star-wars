import { StatusBar } from 'expo-status-bar';
import { useEffect , useState } from 'react';
import { ImageBackground , ScrollView , Text , TouchableOpacity , View } from 'react-native';
import styles from '../styles'
import Loading from '../Loading'
import VehiclesCard from '../vehicles/VehiclesCard'
import SpeciesCard from '../species/SpeciesCard'
import StarshipsCard from '../starship/StarshipsCard'
import FilmsCard from '../films/FilmsCard'

export default function MoreInfoScreen  ({route , navigation}) {
    const {peopleInfo} = route.params

    const [dataPeopleInfo , setDataPeopleInfo] = useState([])
    const [uploadedDataPeopleInfo, setUploadedDataPeopleInfo] = useState(false);

    useEffect(() => {
        callApiFirst();
    } , [peopleInfo]);


    callApiFirst = () => {
        setUploadedDataPeopleInfo(false)
        fetch(peopleInfo)
            .then(response=>response.json())
            .then(data=> {
                setDataPeopleInfo(data)
                setUploadedDataPeopleInfo(true)
            })
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
        <>
        <StatusBar style="auto"/>
        {uploadedDataPeopleInfo ? 
            <ImageBackground style={{flex:1}} source={require('../../assets/bg-image-secondary.jpg')}>
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
                        <TouchableOpacity onPress={()=>navigation.navigate('PlanetScreen', {planetInfo: dataPeopleInfo.homeworld})} style={{backgroundColor:"#8AC5D3" , alignSelf:"flex-start" , padding:7 , borderRadius:7 , marginVertical: 5}}>
                            <Text style={{color:"black" , fontWeight:700 , fontSize:16}}>Home World</Text>
                        </TouchableOpacity>
                        <View>
                            <FilmsCard {...dataPeopleInfo}/>
                            <VehiclesCard {...dataPeopleInfo}/>
                            <SpeciesCard {...dataPeopleInfo}/>
                            <StarshipsCard {...dataPeopleInfo}/>
                        </View>
                    </View>
                </ScrollView>   
            </ImageBackground>
        :
            <Loading/>
        }
        </>
    );
}
