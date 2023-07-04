import { useEffect , useState } from 'react';
import { Text , TouchableOpacity , View , ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles'

export default function PlanetsScreen () {
    const navigation = useNavigation();

    const [datas , setDatas] = useState([])
    const [dataApi , setDataAPi] = useState([])
    const [loading , setLoading] = useState(true)

    useEffect(() => {
        callApiFirst();
    } , []);

    callApiFirst = () => {
        setLoading(false)
        fetch('https://swapi.dev/api/planets/')
            .then(response=>response.json())
            .then(data=> {
                setDataAPi(data)
                setDatas(data.results)
            })
    }

    callApi = (next) => {
        setLoading(true)
        fetch(next)
            .then(response=>response.json())
            .then(data=> {
                setDataAPi(data)
                setDatas(data.results)
                setLoading(false)
            })
            console.log("llamado a la api")
    }

    return (
        loading ? 
            <View>
                <ActivityIndicator size="large" color="white" />
            </View>
        :
        <>
            {datas.map((data , index) => (
                <View style={styles.box} key={index}>
                    <Text style={styles.nameHome}>{data.name}</Text>
                    <Text style={styles.genderHome}>{data.terrain}</Text>
                    <View style={{flexDirection:"row" , justifyContent:"space-between"}}>
                        <Text style={styles.heightHome}>{data.population}</Text>
                        <TouchableOpacity>
                            <Text onPress={()=>navigation.navigate('PlanetScreen', {planetInfo: data.url})} style={{color:"orange" , fontWeight:600 , fontSize:15}}>More Info</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
            <View style={{flexDirection:"row", justifyContent: "space-between" , paddingHorizontal:5 , paddingTop:5 , paddingBottom:15}}>
                {dataApi.previous ? 
                    <TouchableOpacity onPress={()=> callApi(dataApi.previous)}>
                        <Text style={styles.buttonsTab}>Previous</Text>
                    </TouchableOpacity>
                :
                    null
                }
                {dataApi.next ? 
                    <TouchableOpacity onPress={()=> callApi(dataApi.next)} style={{marginLeft:"auto"}}>
                        <Text style={styles.buttonsTab}>Next</Text>
                    </TouchableOpacity>
                :
                    null
                }
            </View>
        </>
    );
}