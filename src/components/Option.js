
import * as React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Entypo } from '@expo/vector-icons';

export default function Button({ title, onPress, icon, color }) {
    return (
        <TouchableOpacity
            onPress={() => onPress()} 
            style={styles.Button}
        >
            <Entypo
                name={icon}
                size={28}
                color={color ? color : 'white'}
            />
            <Text style={styles.text} >{title}</Text>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    Button: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white',
        marginLeft: 10
    }

})
