import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, Image, Button } from 'react-native';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';

const Description = ({ route }) => {
    const { image } = route.params;
    const [predictions, setPredictions] = useState([]);
    let model;

    useEffect(() => {
        const loadModel = async () => {
            try {
                const modelJson = require('../assets/Modelo/model.json');
                const modelWeights = require('../assets/Modelo/combined_model.bin');

                model = await tf.loadLayersModel(tf.io.bundleResource(modelJson, modelWeights));

                console.log('Modelo cargado');
            } catch (error) {
                console.error('Error al cargar el modelo', error);
            }
        }

        loadModel();
    }, []);

    const predict = async (imagePath) => {
        const imageTensor = await loadImage(imagePath);
        const tensor = tf.browser.fromPixels(imageTensor)
            .resizeBilinear([224, 224])
            .expandDims()
            .toFloat();

        try {
            const preds = await model.predict(tensor).data();
            setPredictions(preds);
            console.log('Predicciones:', preds);
        } catch (error) {
            console.error('Error en la predicción', error);
        }
    }

    const loadImage = async (imagePath) => {
        try {
            const response = await fetch(imagePath);
            const blob = await response.blob();

            return tf.browser.fromPixels(await blobToImage(blob));
        } catch (error) {
            console.error('Error al cargar la imagen', error);
        }
    }

    const blobToImage = async (blob) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64data = reader.result;
                const img = new Image();
                img.src = base64data;
                img.onload = () => resolve(img);
            };
            reader.readAsDataURL(blob);
        });
    }

    const handlePredict = async () => {
        await predict(image.uri);
    }

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
                    <Button title="Predecir" onPress={handlePredict} />
                    {predictions.length > 0 && (
                        <View>
                            <Text>Predicciones:</Text>
                            <Text>{JSON.stringify(predictions)}</Text>
                        </View>
                    )}
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
        marginBottom: 10,
    },
    descriptionText: {
        fontSize: 16,
        color: 'black',
        marginTop: 10,
        textAlign: 'center',
    },
});

export default Description;
