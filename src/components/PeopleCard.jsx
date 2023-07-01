import { useEffect , useState } from 'react';
import { Text , TouchableOpacity , View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles'
import Loading from './Loading'

export default function PeopleCard (props) {
    const navigation = useNavigation();
    const [peopleName , setPeopleName] = useState([])
    const [uploadedpeopleName , setUploadedPeopleName] = useState(false)


    useEffect(() => {
        people();
        setPeopleName([])
        console.log(props)
    } , []);

    callApipeople= (people) => {
        fetch(people)
            .then(response=>response.json())
            .then(data=> {
                setPeopleName(prevState => ([
                    ...prevState,
                    {
                        ...data
                    }
                ]))
                setUploadedPeopleName(true)
        })
    }

    people = () => {
        if(props.people.length>0) {
            props.people.map((people)=> (
                callApipeople(people)
            ))
        } else {
            setUploadedPeopleName(true)
        }
    }

    return (
        <View style={{paddingVertical:5}}>
            <Text style={styles.moreInfoTitle}>{props.title}:</Text>
            {peopleName.map((people , index) => (
                <TouchableOpacity onPress={()=>navigation.navigate('MoreInfoScreen', {peopleInfo: people.url})} style={{marginVertical:1}} key={index}>
                    <Text style={{color:"white" , fontSize:16 , fontWeight:600}} >{people.name}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}
