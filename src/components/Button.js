import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

const Button = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.btn} onPress={onPress}  >
            <Text style={styles.txt} >Empieza aquí</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: '#0029A3',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        width: '50%',
        height: '7%',
        borderRadius: 10
    },
    txt: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    }
})

export default Button;
