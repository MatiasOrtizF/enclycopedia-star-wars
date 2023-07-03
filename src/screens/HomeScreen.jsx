import { StatusBar } from 'expo-status-bar';
import Constants  from 'expo-constants';
import { useEffect , useState } from 'react';
import { ImageBackground , ScrollView , Text , TouchableOpacity, View , ActivityIndicator } from 'react-native';
import styles from '../components/styles'

export default function HomeScreen ({navigation}) {
    const [datas , setDatas] = useState([])
    const [dataLoaded , setDataLoaded] = useState(false)
    const [dataApi , setDataAPi] = useState([])
    const [loading , setLoading] = useState(true)

    useEffect(() => {
        callApiFirst();
        setTimeout(() => {
            setDataLoaded(true)
        }, 9000)
    } , []);

    callApiFirst = () => {
        setLoading(false)
        fetch('https://swapi.dev/api/people/')
            .then(response=>response.json())
            .then(data=> {
                setDataAPi(data)
                setDatas(data.results)
            })
    }

    callApi = (next) => {
        setLoading(true)
        fetch(next)
            .then(response=>response.json())
            .then(data=> {
                setDataAPi(data)
                setDatas(data.results)
                setLoading(false)
            })
    }

    const menuItems = [
        {text: "Peole"},
        {text: "Planets"},
        {text: "Films"},
        {text: "Species"},
        {text: "Vehicles"},
        {text: "Films"}
    ]

    return (
        <>
            <StatusBar style="inverted"/>
            {dataLoaded ?
                loading ?
                <ImageBackground style={{flex:1}} source={{uri:"https://e1.pxfuel.com/desktop-wallpaper/885/847/desktop-wallpaper-22-de-star-wars-pro-seu-celular-star-wars-mobile.jpg"}}>
                    <View style={styles.loading}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                </ImageBackground>
                :
                    <ImageBackground source={require('../assets/bg-image-primary.jpg')}>
                        <View style={{marginTop: Constants.statusBarHeight}}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    {menuItems.map((item , index)=> (
                                    <TouchableOpacity style={styles.buttons} key={index}>
                                        <Text style={styles.menu}>{item.text}</Text>
                                    </TouchableOpacity>
                                    ))}
                                </ScrollView>
                                <View style={styles.container}>
                                    {datas.map((data , index) => (
                                        <View style={styles.box} key={index}>
                                            <Text style={styles.nameHome}>{data.name}</Text>
                                            <Text style={styles.genderHome}>{data.gender}</Text>
                                            <View style={{flexDirection:"row" , justifyContent:"space-between"}}>
                                                <Text style={styles.heightHome}>{data.height}</Text>
                                                <TouchableOpacity>
                                                    <Text onPress={()=>navigation.navigate('MoreInfoScreen', {peopleInfo: data.url})} style={{color:"orange" , fontWeight:600 , fontSize:15}}>More Info</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    ))}
                                    <View style={{flexDirection:"row", justifyContent: "space-between" , paddingHorizontal:5 , paddingTop:5 , paddingBottom:15}}>
                                        {dataApi.previous ? 
                                            <TouchableOpacity onPress={()=> callApi(dataApi.previous)}>
                                                <Text style={{color:"orange" , fontWeight:600 , fontSize:18}}>Previous</Text>
                                            </TouchableOpacity>
                                        :
                                        null
                                        }
                                        {dataApi.next ? 
                                            <TouchableOpacity onPress={()=> callApi(dataApi.next)} style={{marginLeft:"auto"}}>
                                                <Text style={{color:"orange" , fontWeight:600 , fontSize:18}}>Next</Text>
                                            </TouchableOpacity>
                                        :
                                        null
                                        }
                                    </View>
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
