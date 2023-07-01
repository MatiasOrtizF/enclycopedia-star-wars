import { useEffect , useState } from 'react';
import { Text , TouchableOpacity , View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles'
import Loading from './Loading'

export default function PlanetsCard (props) {
    const navigation = useNavigation();
    const [planetsName, setPlanetsName] = useState([])
    const [uploadedPlanetsName , setUploadedPlanetsName] = useState(false)


    useEffect(() => {
        planets();
        setPlanetsName([])
    } , []);

    callApiPlanets= (species) => {
        fetch(species)
            .then(response=>response.json())
            .then(data=> {
                setPlanetsName(prevState => ([
                    ...prevState,
                    {
                        ...data
                    }
                ]))
                setUploadedPlanetsName(true)
        })
    }

    planets = () => {
        if(props.planets.length>0) {
            props.planets.map((planet)=> (
                callApiPlanets(planet)
            ))
        } else {
            setUploadedPlanetsName(true)
        }
    }

    return (
        <View style={{paddingVertical:5}}>
            <Text style={styles.moreInfoTitle}>Planets:</Text>
                {planetsName.map((planet , index) => (
                    <TouchableOpacity onPress={()=>navigation.navigate('PlanetScreen', {planetInfo: planet.url})} style={{marginVertical:1}} key={index}>
                        <Text style={{color:"white" , fontSize:16 , fontWeight:600}} >{planet.name}</Text>
                    </TouchableOpacity>
                ))}
        </View>
    );
}
