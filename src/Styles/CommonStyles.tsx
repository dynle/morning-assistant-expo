import { Dimensions, StyleSheet } from "react-native";

const width= Dimensions.get("window").width

export const commonStyle = StyleSheet.create({
    buttonStyle: {
        width:"30%",
        minWidth:150,
        borderRadius: 20,
        backgroundColor: "#F3EDE1",
        // shadowColor:"#000",
        // shadowOffset:{width:0,height:4},
        // shadowOpacity:4,
        // shadowRadius:3
    },
});
