import { StatusBar } from 'expo-status-bar';
import Constants  from 'expo-constants';
import { useEffect , useState } from 'react';
import { ImageBackground , ScrollView , Text , TouchableOpacity , View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles'
import PeopleScreen from './people/PeopleScreen';
import PlanetsScreen from './planets/PlanetsScreen';
import FilmsScreen from './films/FilmsScreen';
import SpeciesScreen from './species/SpeciesScreen';
import VehiclesScreen from './vehicles/VehiclesScreen';
import StarshipsScreen from './starship/StarshipsScreen';

export default function HomeScreen () {
    const navigation = useNavigation();

    const [dataLoaded , setDataLoaded] = useState(false)
    const [menuActived , setMenuActived] = useState("People")

    useEffect(() => {
        setTimeout(() => {
            setDataLoaded(true)
        }, 9000)
    } , []);

    const menuItems = [
        {text: "People"},
        {text: "Planets"},
        {text: "Films"},
        {text: "Species"},
        {text: "Vehicles"},
        {text: "Starships"}
    ]

    return (
        <>
            <StatusBar style="inverted"/>
            {dataLoaded ?
                    <ImageBackground style={{flex:1}} source={require('../assets/bg-image-primary.jpg')}>
                        <View style={{marginTop: Constants.statusBarHeight}}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    {menuItems.map((item , index)=> (
                                        <TouchableOpacity onPress={()=> setMenuActived(item.text)} style={styles.buttonsMenu} key={index}>
                                            {item.text==menuActived ?
                                                <Text style={styles.menuActived}>{item.text}</Text>
                                            :
                                                <Text style={styles.menu}>{item.text}</Text>
                                            }
                                        </TouchableOpacity>
                                    ))}
                                    </ScrollView>
                                <View style={styles.container}>
                                {menuActived === "People" && <PeopleScreen />}
                                {menuActived === "Planets" && <PlanetsScreen />}
                                {menuActived === "Films" && <FilmsScreen />}
                                {menuActived === "Species" && <SpeciesScreen />}
                                {menuActived === "Vehicles" && <VehiclesScreen />}
                                {menuActived === "Starships" && <StarshipsScreen />}
                                </View>
                            </ScrollView>
                        </View>
                    </ImageBackground>
            :
                <View style={{flex:1 , alignItems:"center" , justifyContent:"center" , backgroundColor:"white"}}>
                    <ImageBackground style={{width:"100%" , height: 400}} source={{uri:"https://i0.wp.com/codemyui.com/wp-content/uploads/2018/07/Lightsaber-Progress-Bar.gif?w=880&ssl=1"}}/>
                </View>
            }
        </>
    );
}
