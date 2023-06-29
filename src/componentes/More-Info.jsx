import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from './styles'
import Constants  from 'expo-constants'

export default function App({route}) {
    const {peopleInfo} = route.params

    const [dataPeopleInfo , setDataPeopleInfo] = useState([])

    useEffect(() => {
        callApiFirst();
    } , []);

    callApiFirst = () => {
        fetch(peopleInfo)
            .then(response=>response.json())
            .then(data=> {
                setDataPeopleInfo(data)
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
        <View>
            <Text>{dataPeopleInfo.name}</Text>
            <Text>{dataPeopleInfo.height}</Text>
            <Text>{dataPeopleInfo.mass}</Text>
            <Text>{dataPeopleInfo.hair_color}</Text>
            <Text>{dataPeopleInfo.skin_color}</Text>
            <Text>{dataPeopleInfo.eye_color}</Text>
            <Text>{dataPeopleInfo.birth_year}</Text>
            <Text>{dataPeopleInfo.gender}</Text>
            <TouchableOpacity style={{backgroundColor:"black" , alignSelf:"flex-start" , padding:7 , borderRadius:7}}>
                <Text style={{color:"white"}}>Home World</Text>
            </TouchableOpacity>

        </View>
    );
}
