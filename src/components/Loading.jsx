import { View , ActivityIndicator } from 'react-native';
import styles from './styles'

export default function Loading () {
    return (
        <View style={styles.loading}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );
}
