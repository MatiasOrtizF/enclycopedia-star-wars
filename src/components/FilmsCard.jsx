import { Text , TouchableOpacity , View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../components/styles'

export default function FilmsCard  (dataPeopleInfo) {
    const navigation = useNavigation();

    const namesFilms = {
        "https://swapi.dev/api/films/1/": "A New Hope",
        "https://swapi.dev/api/films/2/": "The Empire Strikes Back",
        "https://swapi.dev/api/films/3/": "Return of the Jedi",
        "https://swapi.dev/api/films/4/": "The Phantom Menace",
        "https://swapi.dev/api/films/5/": "Attack of the Clones",
        "https://swapi.dev/api/films/6/": "Revenge of the Sith",
    }

    return (
        <View style={{paddingVertical:5}}>
            <Text style={styles.moreInfoTitle}>Films:</Text>
                {dataPeopleInfo.films.map((film , index) => (
                    <TouchableOpacity onPress={()=>navigation.navigate('FilmScreen', {filmInfo: film})} style={{marginVertical:1}} key={index}>
                        <Text style={{color:"white" , fontSize:16 , fontWeight:600}} >{namesFilms[film]}</Text>
                    </TouchableOpacity>
                ))}
        </View>
    );
}
