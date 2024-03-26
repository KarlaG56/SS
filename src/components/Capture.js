
import * as React from 'react';
import {  TouchableOpacity, StyleSheet} from 'react-native';

export default function Button({ onPress }) {
    return (
        <TouchableOpacity
            onPress={() => onPress()} 
            style={styles.captureButton}
        >
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    captureButton: {
        borderWidth: 2,
        borderColor: 'white',
        width: 70,
        height: 70,
        borderRadius: 35,
        alignSelf: 'center',
    },
})
