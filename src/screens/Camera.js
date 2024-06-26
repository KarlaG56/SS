import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image, Alert, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as MediaLibrary from "expo-media-library";
import { Camera } from 'expo-camera';
import Button from '../components/Capture';
import Option from '../components/Option';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const Camara = () => {
    const navigation = useNavigation();
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(null);
    const [image, setImage] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
    const cameraRef = useRef(null);

    useEffect(() => {
        const requestPermissions = async () => {
            const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus === 'granted');

            const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync();
            setHasMediaLibraryPermission(mediaStatus === 'granted');
        };

        requestPermissions();
    }, []);

    const takePicture = async () => {
        if (cameraRef.current) {
            try {
                const { uri } = await cameraRef.current.takePictureAsync({
                    quality: 1,
                    ratio: '1:1'
                });
                setImage(uri);

            } catch (e) {
                console.log(e);
            }
        }
    };

    const saveImage = async () => {
        if (image) {
            try {
                const uri = await MediaLibrary.createAssetAsync(image);
                navigation.navigate('Description', { image: uri });  // Cambia 'Result' a 'Description'
            } catch (e) {
                console.log(e);
            }
        }
    };

    const toggleFlash = () => {
        setFlash(
            flash === Camera.Constants.FlashMode.off
                ? Camera.Constants.FlashMode.on
                : Camera.Constants.FlashMode.off
        );
    };

    const pickImageFromLibrary = async () => {
        if (hasMediaLibraryPermission) {
            try {
                const { uri } = await MediaLibrary.launchImageLibraryAsync();
                if (uri) {
                    setImage(uri);
                }
            } catch (e) {
                console.log(e);
            }
        } else {
            Alert.alert('No access to media library');
        }
    };

    if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            {!image && (
                <View style={styles.topBar}>
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={toggleFlash}
                    >
                        <Ionicons name={flash === Camera.Constants.FlashMode.off ? "flash-off" : "flash"} size={24} color="white" />
                    </TouchableOpacity>
                </View>
            )}
            {!image ? (
                <Camera
                    style={styles.camarast}
                    type={type}
                    flashMode={flash}
                    ref={cameraRef}
                />
            ) : (
                <Image source={{ uri: image }} style={styles.camarast} />
            )}

            <View style={styles.bottomBar}>
                <View style={styles.iconscontainer}>

                </View>
                {image ? (
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 50,
                        }}
                    >
                        <Option title={'Repetir'} icon={'retweet'} onPress={() => setImage(null)} />
                        <Option title={'Guardar'} icon={'check'} onPress={saveImage} />
                    </View>
                ) : (
                    <View style={styles.iconscontainer}>
                        <Button onPress={takePicture} />
                    </View>
                )}
                <View style={styles.iconscontainer} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        
    },
    topBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '17%',
        width: '100%',
        zIndex: 1,
        justifyContent: 'center',

    },

    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 68,
        zIndex: 1,
    },
    iconButton: {
        padding: 10,
    },
    iconscontainer: {
        width: 150,
        height: 80,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    camarast: {
        width: width * 1,
        height: height * 0.61,
        borderRadius: 15,
        overflow: 'hidden',
        marginTop:147
    },
});

export default Camara;
