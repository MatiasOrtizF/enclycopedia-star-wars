import { useEffect , useState } from 'react';
import { ImageBackground , ScrollView , Text , View } from 'react-native';
import styles from '../styles'
import Loading from '../Loading'
import FilmsCard from '../films/FilmsCard';
import PeopleCard from '../people/PeopleCard'

export default function SpecieScreen ({route , navigation}) {
    const {specieInfo} = route.params
    const [DataSpecieInfo , setDataSpecieInfo] = useState([])
    const [uploadedDataSpecieInfo, setUploadedDataSpecieInfo] = useState(false)

    useEffect(() => {
        callApi();
        setDataSpecieInfo([]);
    } , [specieInfo]);

    callApi = () => {
        fetch(specieInfo)
            .then(response=>response.json())
            .then(data=> {
                setDataSpecieInfo(data)
                setUploadedDataSpecieInfo(true)
            })
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
        uploadedDataSpecieInfo ? 
            <ImageBackground style={{flex:1}} source={require('../../assets/bg-image-specieScreen.jpg')}>
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
                            <FilmsCard {...DataSpecieInfo}/>
                            <PeopleCard people={DataSpecieInfo.people} title="People" />
                        </View>
                    </View>
                </ScrollView>   
            </ImageBackground>
        :
            <Loading/>
    );
}
