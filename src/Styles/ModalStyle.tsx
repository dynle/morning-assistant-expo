import { Dimensions, StyleSheet } from "react-native";

export const modalStyle = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        width: "92%",
        height: "90%",
        margin: 20,
        backgroundColor: "#C4C4C4",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalTop: {
        flex: 1,
    },
    modalBottom: {
        flex: 5,
        width:Dimensions.get('window').width*0.85,
    },
    modalTopText: {
        fontSize: 50,
    },
    modalBottomText: {
        textAlign: "center",
        fontSize: 30,
        letterSpacing: 5,
        lineHeight: 50,
    },
    modalButton: {
        minWidth: "65%",
        borderRadius: 20,
        backgroundColor: "#F3EDE1",
        // shadowColor:"#000",
        // shadowOffset:{width:0,height:4},
        // shadowOpacity:4,
        // shadowRadius:3
    },
});
