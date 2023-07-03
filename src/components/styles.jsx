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
    menu: {
        color:"white", 
        fontWeight:600, 
        fontSize:18
    },
    buttons: {
        margin: 15,
    },
    nameHome: {
        color:"white", 
        fontWeight:700, 
        fontSize:18
    },
    genderHome:{
        color:"white", 
        fontWeight:500, 
        fontSize:16
    },
    heightHome:{
        color:"white", 
        fontWeight:400, 
        fontSize:15
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
    },
    cardContainer: {
        padding:5
    },
    cardGap: {
        marginVertical:1
    },
    cardText: {
        color:"white", 
        fontSize:16, 
        fontWeight:600
    },
    loading: {
        flex:1 , 
        justifyContent:"center" , 
        alignItems:"center"
    }
});

export default styles;