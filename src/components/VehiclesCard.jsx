import { useEffect , useState } from 'react';
import { Text , TouchableOpacity , View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles'
import Loading from './Loading'

export default function VehiclesCard  (dataPeopleInfo) {
    const navigation = useNavigation();
    const [vehiclesName , setVehiclesName] = useState([])
    const [uploadedVehiclesName , setUploadedVehiclesName] = useState(false)

    useEffect(() => {
        vehicles();
        setVehiclesName([])
    } , []);

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
                setUploadedVehiclesName(true)
        })
    }

    vehicles = () => {
        if(dataPeopleInfo.vehicles.length>0) {
            dataPeopleInfo.vehicles.map((vehicle)=> (
                callApiVehicle(vehicle)
            ))
        } else {
            setUploadedVehiclesName(true)
        }
    }

    return (
        uploadedVehiclesName ? 
            <View style={{paddingVertical:5}}>
                <Text style={styles.moreInfoTitle}>Vehicles:</Text>
                    {vehiclesName.map((vehicle) => (
                        <TouchableOpacity onPress={()=>navigation.navigate('VehicleScreen', {vehicleInfo: vehicle.url})} style={{marginVertical:1}} >
                            <Text style={{color:"white" , fontSize:16 , fontWeight:600}}>{vehicle.name}</Text>
                        </TouchableOpacity>
                    ))}
            </View>
        :
        null
    );
}
