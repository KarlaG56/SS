import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';

const Description = ({ route }) => {
    const { image } = route.params;

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
                    <Image source={{ uri: image.uri }} style={styles.image} />
                    <Text style={styles.signTitle}>Sign #1</Text>
                    <Text style={styles.descriptionText}>
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
    image: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
        borderRadius: 20,
        marginBottom: 20,
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
