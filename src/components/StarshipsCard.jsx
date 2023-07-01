import { useEffect , useState } from 'react';
import { Text , TouchableOpacity , View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../components/styles'
import Loading from '../components/Loading'

export default function StarshipsCard (dataPeopleInfo) {
    const navigation = useNavigation();
    const [starshipsName , setStarshipsName] = useState([])
    const [uploadedStarshipsName , setUploadedStarshipsName] = useState(false)

    useEffect(() => {
        starships();
        setStarshipsName([])
    } , []);

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

    return (
        <View style={{paddingVertical:5}}>
            <Text style={styles.moreInfoTitle}>Starships:</Text>
                {starshipsName.map((starship) => (
                    <TouchableOpacity onPress={()=>navigation.navigate('StarshipScreen', {starshipInfo: starship.url})}>
                        <Text style={{color:"white" , fontSize:15 , fontWeight:600}}>{starship.name}</Text>
                    </TouchableOpacity>
                ))}
        </View>
    );
}
