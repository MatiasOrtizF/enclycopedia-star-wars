import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './src/componentes/main'
import MoreInfo from './src/componentes/More-Info'
import Planet from './src/componentes/Planet'
import Film from './src/componentes/Film'
import Vehicle from './src/componentes/Vehicle'
import Specie from './src/componentes/Specie'
import Starship from './src/componentes/Startship'

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
