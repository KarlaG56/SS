import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>Bienvenido</Text>
            </View>

            <View style={styles.containerImg}>
                <Image style={styles.img} source={require('../assets/Warning.png')} />
            </View>

            <Button onPress={() => navigation.navigate('Camara')} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    containerImg: {
        width: '100%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch',
    },
    title: {
        fontSize: 39, 
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#0029A3'
    }
})

export default Home;
