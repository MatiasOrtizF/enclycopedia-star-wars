import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/components/HomeScreen'
import MoreInfoScreen from './src/components/people/MoreInfoScreen'
import PlanetScreen from './src/components/planets/PlanetScreen'
import FilmScreen from './src/components/films/FilmScreen'
import VehicleScreen from './src/components/vehicles/VehicleScreen'
import SpecieScreen from './src/components/species/SpecieScreen'
import StarshipScreen from './src/components/starship/StarshipScreen'
import PlanetsScreen from './src/components/planets/PlanetsScreen';
import FilmsScreen from './src/components/films/FilmsScreen';
import SpeciesScreen from './src/components/species/SpeciesScreen';
import VehiclesScreen from './src/components/vehicles/VehiclesScreen';
import StarshipsScreen from './src/components/starship/StarshipsScreen';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown:false}}/>
                <Stack.Screen name="PlanetsScreen" component={PlanetsScreen} options={{headerShown:false}}/>
                <Stack.Screen name="FilmsScreen" component={FilmsScreen} options={{headerShown:false}}/>
                <Stack.Screen name="SpeciesScreen" component={SpeciesScreen} options={{headerShown:false}}/>
                <Stack.Screen name="VehiclesScreen" component={VehiclesScreen} options={{headerShown:false}}/>
                <Stack.Screen name="StarshipsScreen" component={StarshipsScreen} options={{headerShown:false}}/>

                <Stack.Screen name="MoreInfoScreen" component={MoreInfoScreen} />
                <Stack.Screen name="PlanetScreen" component={PlanetScreen}/>
                <Stack.Screen name="FilmScreen" component={FilmScreen}/>
                <Stack.Screen name="VehicleScreen" component={VehicleScreen}/>
                <Stack.Screen name="SpecieScreen" component={SpecieScreen}/>
                <Stack.Screen name="StarshipScreen" component={StarshipScreen}/>

            </Stack.Navigator>
        </NavigationContainer>
    );
}
