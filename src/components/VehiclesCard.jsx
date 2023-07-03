import { useEffect , useState } from 'react';
import { Text , TouchableOpacity , View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles'
import Loading from './Loading'

export default function VehiclesCard  (props) {
    const navigation = useNavigation();
    const [vehiclesName , setVehiclesName] = useState([])
    const [uploadedVehiclesName , setUploadedVehiclesName] = useState(false)

    useEffect(() => {
        vehicles();
        setVehiclesName([])
    } , []);

    useEffect(() => {
        if(vehiclesName.length==props.vehicles.length) {
            setUploadedVehiclesName(true)
        }
    } , [vehiclesName]);

    callApiVehicle = (vehicle) => {
        fetch(vehicle)
            .then(response=>response.json())
            .then(data=> {
                setVehiclesName(prevState => ([
                    ...prevState,
                    {
                        ...data
                    }
                ]))
        })
    }

    vehicles = () => {
        if(props.vehicles.length>0) {
            props.vehicles.map((vehicle)=> (
                callApiVehicle(vehicle)
            ))
        } else {
            setUploadedVehiclesName(true)
        }
    }

    return (
        <View style={styles.cardContainer}>
            <Text style={styles.moreInfoTitle}>Vehicles:</Text>
            {uploadedVehiclesName ?
            vehiclesName.map((vehicle , index) => (
                <TouchableOpacity style={styles.cardGap} key={index} onPress={()=>navigation.navigate('VehicleScreen', {vehicleInfo: vehicle.url})}>
                    <Text style={styles.cardText}>{vehicle.name}</Text>
                </TouchableOpacity>
            ))
            :
                <Loading/>
            }
        </View>
    );
}
