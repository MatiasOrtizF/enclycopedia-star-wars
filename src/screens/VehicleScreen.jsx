import { useEffect , useState } from 'react';
import { ImageBackground , ScrollView , Text , View } from 'react-native';
import styles from '../components/styles'
import Loading from '../components/Loading'
import FilmsCard from '../components/FilmsCard'
import PeopleCard from '../components/PeopleCard'

export default function VehicleScreen ({route}) {
    const {vehicleInfo} = route.params
    const [DataVehicleInfo , setDataVehicleInfo] = useState([])
    const [uploadedDataVehicleInfo, setUploadedDataVehicleInfo] = useState(false)

    useEffect(() => {
        callApi();
        setDataVehicleInfo([]);
    } , [vehicleInfo]);

    callApi = () => {
        fetch(vehicleInfo)
            .then(response=>response.json())
            .then(data=> {
                setDataVehicleInfo(data)
                setUploadedDataVehicleInfo(true)
            })
    }

    const infoVehicle = [
        { title: 'Name', value: DataVehicleInfo.name },
        { title: 'Model', value: DataVehicleInfo.model},
        { title: 'Manufacturer', value: DataVehicleInfo.manufacturer },
        { title: 'Cost in credits', value: DataVehicleInfo.cost_in_credits },
        { title: 'Length', value: DataVehicleInfo.length },
        { title: 'Max atmosphering speed', value: DataVehicleInfo.max_atmosphering_speed },
        { title: 'Crew', value: DataVehicleInfo.crew },
        { title: 'Passengers', value: DataVehicleInfo.passengers },
        { title: 'Cargo capacity' , value: DataVehicleInfo.cargo_capacity },
        { title: 'Consumables' , value: DataVehicleInfo.consumables },
        { title: 'Vehicle_class' , value: DataVehicleInfo.vehicle_class }
    ]


    return (
        uploadedDataVehicleInfo ?
            <ImageBackground style={{flex:1}} source={{uri:"https://e1.pxfuel.com/desktop-wallpaper/617/754/desktop-wallpaper-minimalist-phone-star-wars-minimal-star-trek.jpg"}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{paddingVertical:10 , paddingHorizontal:25}}>
                        {infoVehicle.map((vehicle, index) => (
                            <Text style={styles.moreInfoText} key={index}>
                                <Text style={styles.moreInfoTitle}>
                                    {vehicle.title}:{'\u00A0'}
                                </Text>
                                {vehicle.value}
                            </Text>
                        ))}
                        <View>
                            <FilmsCard {...DataVehicleInfo}/>
                            <PeopleCard people={DataVehicleInfo.pilots} title="Pilots"/>
                        </View>
                    </View>
                </ScrollView>   
            </ImageBackground>
        :
            <Loading/>
    );
}
