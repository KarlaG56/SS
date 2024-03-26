import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const Description = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity 
                    style={styles.backButton}
                >
                </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.content}>
                <View style={styles.signContainer}>
                    <View style={styles.sign} />
                    <Text style={styles.signTitle}>Sign #1</Text>
                    <Text style={styles.descriptionText}>
                        Escribe aquí tu texto Escribe aquí tu texto Escribe aquí tu texto 
                        Escribe aquí tu texto Escribe aquí tu texto Escribe aquí tu texto 
                        Escribe aquí tu texto Escribe aquí tu texto Escribe aquí tu texto 
                        Escribe aquí tu texto Escribe aquí tu texto Escribe aquí tu texto.
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingBottom: 50,
    },
    backButton: {
    },
    backText: {
        fontSize: 15, 
        color: 'black',
    },
    content: {
        paddingHorizontal: 20,
    },
    signContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    sign: {
        backgroundColor: '#D3D3D3',
        width: '60%',
        height: 200, 
        borderRadius: 10,
        marginBottom:25 
    },
    signTitle: {
        fontSize: 19,  
        fontWeight: 'bold',
        marginBottom: 30, 
    },
    descriptionText: {
        fontSize: 16, 
        color: 'black',
        marginTop: 10, 
        textAlign: 'center',
    },
});

export default Description;