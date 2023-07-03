import { useEffect , useState } from 'react';
import { Text , TouchableOpacity , View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../components/styles'
import Loading from './Loading';

export default function SpeciesCard  (props) {
    const navigation = useNavigation();
    const [speciesName, setSpeciesName] = useState([])
    const [uploadedSpeciesName , setUploadedSpeciesName] = useState(false)

    useEffect(() => {
        species();
        setSpeciesName([])
    } , []);

    useEffect(() => {
        if(speciesName.length==props.species.length) {
            setUploadedSpeciesName(true)
        }
    } , [speciesName]);

    callApiSpecies = (species) => {
        fetch(species)
            .then(response=>response.json())
            .then(data=> {
                setSpeciesName(prevState => ([
                    ...prevState,
                    {
                        ...data
                    }
                ]))
        })
    }

    species = () => {
        if(props.species.length>0) {
            props.species.map((species)=> (
                callApiSpecies(species)
            ))
        } else {
            setUploadedSpeciesName(true)
        }
    }

    return (
        <View style={styles.cardContainer}>
            <Text style={styles.moreInfoTitle}>Species:</Text>
            {uploadedSpeciesName ?
                speciesName.map((specie , index) => (
                    <TouchableOpacity style={styles.cardGap} key={index} onPress={()=>navigation.navigate('SpecieScreen', {specieInfo: specie.url})}>
                        <Text style={styles.cardText}>{specie.name}</Text>
                    </TouchableOpacity>
                ))
            :
                <Loading/>
            }
        </View>
    );
}
