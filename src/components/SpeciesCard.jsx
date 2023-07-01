import { useEffect , useState } from 'react';
import { Text , TouchableOpacity , View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../components/styles'
import Loading from '../components/Loading'

export default function SpeciesCard  (dataPeopleInfo) {
    const navigation = useNavigation();
    const [speciesName, setSpeciesName] = useState([])
    const [uploadedSpeciesName, setUploadedSpeciesName ] = useState(false)

    useEffect(() => {
        species();
        setSpeciesName([])
    } , []);

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
                setUploadedSpeciesName(true)
        })
    }

    species = () => {
        if(dataPeopleInfo.species.length>0) {
            dataPeopleInfo.species.map((species)=> (
                callApiSpecies(species)
            ))
        } else {
            setUploadedSpeciesName(true)
        }
    }

    return (
        <View style={{paddingVertical:5}}>
            <Text style={styles.moreInfoTitle}>Species:</Text>
                {speciesName.map((specie) => (
                    <TouchableOpacity onPress={()=>navigation.navigate('SpecieScreen', {specieInfo: specie.url})}>
                        <Text style={{color:"white" , fontSize:15 , fontWeight:600}}>{specie.name}</Text>
                    </TouchableOpacity>
                ))}
        </View>
    );
}
