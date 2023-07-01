import { useEffect, useState } from 'react';
import { ImageBackground , ScrollView , Text , View } from 'react-native';
import styles from '../components/styles'
import Loading from '../components/Loading'
import PeopleCard from '../components/PeopleCard'
import PlanetCard from '../components/PlanetsCard'
import StarshipCard from '../components/StarshipsCard'
import VehiclesCard from '../components/VehiclesCard'
import SpeciesCard from '../components/SpeciesCard'

export default function FilmScreen ({route}) {
    const {filmInfo} = route.params
    const [dataFilmInfo , setDataFilmInfo] = useState([])
    const [uploadedDataFilmInfo, setUploadedDataFilmInfo] = useState(false)

    useEffect(() => {
        callApi();
        setDataFilmInfo([]);
    } , [filmInfo]);

    callApi = () => {
        fetch(filmInfo)
            .then(response=>response.json())
            .then(data=> {
                setDataFilmInfo(data)
                setUploadedDataFilmInfo(true)
            })
    }

    const infoFilm = [
        { title: 'title', value: dataFilmInfo.title },
        { title: 'Episode id', value: dataFilmInfo.episode_id },
        { title: 'Opening crawl', value: dataFilmInfo.opening_crawl },
        { title: 'Director', value: dataFilmInfo.director },
        { title: 'Producer', value: dataFilmInfo.producer },
        { title: 'Release date', value: dataFilmInfo.release_date },
    ]

    return (
        uploadedDataFilmInfo ? 
            <ImageBackground style={{flex:1}} source={{uri:"https://e1.pxfuel.com/desktop-wallpaper/656/769/desktop-wallpaper-minimalist-star-wars-iphone-star-wars-phone-minimalist.jpg"}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{paddingVertical:10 , paddingHorizontal:25}}>
                        {infoFilm.map((film, index) => (
                            <Text style={styles.moreInfoText} key={index}>
                                <Text style={styles.moreInfoTitle}>
                                    {film.title}:{'\u00A0'}
                                </Text>
                                {film.value}
                            </Text>
                        ))}
                        <View>
                            <PeopleCard people={dataFilmInfo.characters} title="Characters" />
                            <PlanetCard {...dataFilmInfo}/>
                            <StarshipCard {...dataFilmInfo}/>
                            <VehiclesCard {...dataFilmInfo}/>
                            <SpeciesCard {...dataFilmInfo}/>
                        </View>
                    </View>
                </ScrollView>   
            </ImageBackground>
        :
            <Loading/>
    );
}
