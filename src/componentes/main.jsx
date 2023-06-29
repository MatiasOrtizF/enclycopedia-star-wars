import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from './styles'
import Constants  from 'expo-constants'

export default function App({navigation}) {
    const [datas , setDatas] = useState([])
    const [dataLoaded , setDataLoaded] = useState(false)
    const [dataApi , setDataAPi] = useState([])
    const [pageNumber , setPageNumber] = useState(1);

    useEffect(() => {
        callApiFirst();
        setTimeout(() => {
            setDataLoaded(true)
        }, 9000)
    } , []);

    callApiFirst = () => {
        fetch('https://swapi.dev/api/people/')
            .then(response=>response.json())
            .then(data=> {
                setDataAPi(data)
                setDatas(data.results)
            })
    }

    callApi = (next) => {
        fetch(next)
            .then(response=>response.json())
            .then(data=> {
                setDataAPi(data)
                setDatas(data.results)
            })
    }

    return (
        <View style={{marginTop: Constants.statusBarHeight}}>
            <StatusBar style="auto" />
            {dataLoaded ?
                <ImageBackground source={{uri:"https://e1.pxfuel.com/desktop-wallpaper/885/847/desktop-wallpaper-22-de-star-wars-pro-seu-celular-star-wars-mobile.jpg"}}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={styles.container}>
                                <TextInput
                                style={{backgroundColor:"#ffff" , color:"#ffff" , padding:7 , borderRadius:7 , marginTop:15}}
                                placeholder='Buscar Personaje'
                                />
                            </View>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                <TouchableOpacity style={styles.buttons}>
                                    <Text style={{color:"white" , fontWeight:600 , fontSize:18}}>Peole</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.buttons}>
                                    <Text style={{color:"white" , fontWeight:600 , fontSize:18}}>Planets</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.buttons}>
                                    <Text style={{color:"white" , fontWeight:600 , fontSize:18}}>Films</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.buttons}>
                                    <Text style={{color:"white" , fontWeight:600 , fontSize:18}}>Species</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.buttons}>
                                    <Text style={{color:"white" , fontWeight:600 , fontSize:18}}>Vehicles</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.buttons}>
                                    <Text style={{color:"white" , fontWeight:600 , fontSize:18}}>Films</Text>
                                </TouchableOpacity>
                            </ScrollView>
                            <View style={styles.container}>
                                {datas.map((data) => (
                                    <View style={styles.box}>
                                        <Text style={{color:"white" , fontWeight:700 , fontSize:18}}>{data.name}</Text>
                                        <Text style={{color:"white" , fontWeight:500 , fontSize:16}}>{data.gender}</Text>
                                        <View style={{flexDirection:"row" , justifyContent:"space-between"}}>
                                            <Text style={{color:"white" , fontWeight:400 , fontSize:15}}>{data.height}</Text>
                                            <TouchableOpacity>
                                                <Text onPress={()=>navigation.navigate('MoreInfo', {peopleInfo: data.url})} style={{color:"orange" , fontWeight:600 , fontSize:15}}>More Info</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                ))}
                                <View style={{flexDirection:"row", justifyContent: "space-between" , paddingHorizontal:5 , paddingTop:5 , paddingBottom:15}}>
                                    {dataApi.previous ? 
                                        <TouchableOpacity>
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
                </ImageBackground>
            :
            <View style={{alignItems:"center" , justifyContent:"center"}}>
                <ImageBackground style={{width:"100%" , height: 400}} source={{uri:"https://i0.wp.com/codemyui.com/wp-content/uploads/2018/07/Lightsaber-Progress-Bar.gif?w=880&ssl=1"}}/>
            </View>
            }
        </View>
    );
}
