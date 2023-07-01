import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen'
import MoreInfoScreen from './src/screens/MoreInfoScreen'
import PlanetScreen from './src/screens/PlanetScreen'
import FilmScreen from './src/screens/FilmScreen'
import VehicleScreen from './src/screens/VehicleScreen'
import SpecieScreen from './src/screens/SpecieScreen'
import StarshipScreen from './src/screens/StarshipScreen'

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown:false}} />
                <Stack.Screen name="MoreInfoScreen" component={MoreInfoScreen} />
                <Stack.Screen name="PlanetScreen" component={PlanetScreen} />
                <Stack.Screen name="FilmScreen" component={FilmScreen} />
                <Stack.Screen name="VehicleScreen" component={VehicleScreen} />
                <Stack.Screen name="SpecieScreen" component={SpecieScreen} />
                <Stack.Screen name="StarshipScreen" component={StarshipScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
