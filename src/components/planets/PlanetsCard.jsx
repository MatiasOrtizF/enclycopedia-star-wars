import { useEffect , useState } from 'react';
import { Text , TouchableOpacity , View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles'
import Loading from '../Loading';

export default function PlanetsCard (props) {
    const navigation = useNavigation();
    const [planetsName, setPlanetsName] = useState([])
    const [uploadedPlanetsName , setUploadedPlanetsName] = useState(false)

    useEffect(() => {
        planets();
        setPlanetsName([])
    } , []);

    useEffect(() => {
        if(planetsName.length==props.planets.length) {
            setUploadedPlanetsName(true)
        }
    } , [planetsName]);

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
        <View style={styles.cardContainer}>
            <Text style={styles.moreInfoTitle}>Planets:</Text>
            {uploadedPlanetsName ?
                planetsName.map((planet , index) => (
                    <TouchableOpacity style={styles.cardGap} key={index} onPress={()=>navigation.navigate('PlanetScreen', {planetInfo: planet.url})}>
                        <Text style={styles.cardText} >{planet.name}</Text>
                    </TouchableOpacity>
                ))
            :
                <Loading/>
            }
        </View>
    );
}
