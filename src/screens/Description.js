import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import { decodeJpeg, bundleResourceIO } from '@tensorflow/tfjs-react-native';

const Description = ({ route }) => {
    const { image } = route.params;
    const [predictions, setPredictions] = useState([]);
    const [model, setModel] = useState(null);
    const classes = ['Apagar la luz', 'Area de trabajo', 'Escalera', 'Gel antibacterial', 'Lavado de manos',
    'Personal no autorizado', 'Riesgo electrico','Ruta de evacuacion hacia la izquierda', 'Ruta de evacuacion hacia la derecha', 
    'Sana distancia','Uso de cubrebocas'];


    useEffect(() => {
        tf.ready().then(() => {
            loadModel();
        });
    }, []);

    useEffect(() => {
        if (model && image) {
            predict(image.uri);
        }
    }, [model, image]);

    const loadModel = async () => {
        try {
            const modelJson = require('../assets/Modelo/model.json');
            const modelWeights = [
                require('../assets/Modelo/group1-shard1of8.bin'),
                require('../assets/Modelo/group1-shard2of8.bin'),
                require('../assets/Modelo/group1-shard3of8.bin'),
                require('../assets/Modelo/group1-shard4of8.bin'),
                require('../assets/Modelo/group1-shard5of8.bin'),
                require('../assets/Modelo/group1-shard6of8.bin'),
                require('../assets/Modelo/group1-shard7of8.bin'),
                require('../assets/Modelo/group1-shard8of8.bin'),
            ];
            const loadedModel = await tf.loadLayersModel(bundleResourceIO(modelJson, modelWeights));
            setModel(loadedModel);
            console.log('Modelo cargado');
        } catch (error) {
            console.error('Error al cargar el modelo:', error);
        }
    };

    const predict = async (imageUri) => {
        try {
            const response = await fetch(imageUri);
            const blob = await response.blob();
            const arrayBuffer = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsArrayBuffer(blob);
            });

            const imageData = new Uint8Array(arrayBuffer);
            const imageTensor = decodeJpeg(imageData);
            const resizedImageTensor = imageTensor.resizeBilinear([64, 64]).mean(2).expandDims(0).expandDims(-1).toFloat();
            const prediction = await model.predict(resizedImageTensor);
            const predictionData = prediction.dataSync();
            const predictionsArray = Array.from(predictionData);
            const predictedIndex = predictionsArray.indexOf(Math.max(...predictionsArray));
            setPredictions(classes[predictedIndex]);
            console.log('Predicciones:', predictionData);
        } catch (error) {
            console.error('Error al hacer la predicción:', error);
        }
    };



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
                    <Text style={styles.signTitle}>{JSON.stringify(predictions)}</Text>
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
