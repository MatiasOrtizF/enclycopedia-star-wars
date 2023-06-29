import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './src/components/Main'
import MoreInfo from './src/components/More-Info'
import Planet from './src/components/Planet'
import Film from './src/components/Film'
import Vehicle from './src/components/Vehicle'
import Specie from './src/components/Specie'
import Starship from './src/components/Startship'

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} options={{headerShown:false}} />
                <Stack.Screen name="MoreInfo" component={MoreInfo} />
                <Stack.Screen name="Planet" component={Planet} />
                <Stack.Screen name="Film" component={Film} />
                <Stack.Screen name="Vehicle" component={Vehicle} />
                <Stack.Screen name="Specie" component={Specie} />
                <Stack.Screen name="Starship" component={Starship} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
