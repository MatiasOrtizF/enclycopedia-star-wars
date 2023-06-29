import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './src/componentes/main'
import MoreInfo from './src/componentes/More-Info'

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} options={{headerShown:false}} />
                <Stack.Screen name="MoreInfo" component={MoreInfo} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
