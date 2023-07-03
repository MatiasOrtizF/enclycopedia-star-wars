import { useEffect , useState } from 'react';
import { Text , TouchableOpacity , View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../components/styles'
import Loading from './Loading';

export default function StarshipsCard (props) {
    const navigation = useNavigation();
    const [starshipsName , setStarshipsName] = useState([])
    const [uploadedStarshipsName , setUploadedStarshipsName] = useState(false)

    useEffect(() => {
        starships();
        setStarshipsName([])
    } , []);

    useEffect(() => {
        if(starshipsName.length==props.starships.length) {
            setUploadedStarshipsName(true)
        }
    } , [starshipsName]);

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
        })
    }

    starships = () => {
        if(props.starships.length>0) {
            props.starships.map((starships)=> (
                callApiStarships(starships)
            ))
        } else {
            setUploadedStarshipsName(true)
        }
    }

    return (
        <View style={styles.cardContainer}>
            <Text style={styles.moreInfoTitle}>Starships:</Text>
            {uploadedStarshipsName ?
                starshipsName.map((starship , index) => (
                <TouchableOpacity style={styles.cardGap} key={index} onPress={()=>navigation.navigate('StarshipScreen', {starshipInfo: starship.url})}>
                    <Text style={styles.cardText}>{starship.name}</Text>
                </TouchableOpacity>
            ))
            :
                <Loading/>
            }
        </View>
    );
}
