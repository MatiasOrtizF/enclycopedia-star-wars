import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        paddingHorizontal:15,
    },
    box: {
        backgroundColor:'rgba(0, 0, 0, 0.5)',
        marginVertical: 5,
        padding:10,
        borderRadius:7
    },
    buttons: {
        margin: 15,
    },
    moreInfoText: {
        fontSize:16,
        marginVertical: 5,
        fontWeight:500,
        color: "white"
    },
    moreInfoTitle: {
        fontSize:18, 
        fontWeight:800,
        color:"#8AC5D3"
    }
});

export default styles;