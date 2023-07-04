import { useEffect , useState } from 'react';
import { Text , TouchableOpacity , View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles'
import Loading from '../Loading';

export default function PeopleCard (props) {
    const navigation = useNavigation();
    const [peopleName , setPeopleName] = useState([])
    const [uploadedPeopleName , setUploadedPeopleName] = useState(false)

    useEffect(() => {
        people();
        setPeopleName([])
    } , []);

    useEffect(() => {
        if(peopleName.length==props.people.length) {
            setUploadedPeopleName(true)
        }
    } , [peopleName]);

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
        })
    }

    people = () => {
        if(props.people.length>0) {
            props.people.map((people)=> (
                callApipeople(people)
            ))
        }else {
            setUploadedPeopleName(true);
        }
    }

    return (
        <View style={styles.cardContainer}>
            <Text style={styles.moreInfoTitle}>{props.title}:</Text>
            {uploadedPeopleName ?
                peopleName.map((people , index) => (
                    <TouchableOpacity style={styles.cardGap} key={index} onPress={()=>navigation.navigate('MoreInfoScreen', {peopleInfo: people.url})}>
                        <Text style={styles.cardText} >{people.name}</Text>
                    </TouchableOpacity>
                ))
            :
                <Loading/>
            }
        </View>
    );
}
