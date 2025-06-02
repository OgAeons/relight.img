import React from "react";
import { Text, Alert, TouchableOpacity, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";

type Props = {
    onSelectImage: (uri: string) => void;
};

export const ImageSelector: React.FC<Props> = ({ onSelectImage }) => {
    // camera and media library permission requests
    const permission = async () => {
        try {
            const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
            let mediaPermission = { granted: true };        // Android 13+
            if(Platform.OS == 'android' && Platform.Version < 33) {        // < Android 13 
                mediaPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
            }

            if(!cameraPermission.granted || !mediaPermission.granted) {
                Alert.alert('Permission required', 'Please grant permissions for both camera and media library access.');
                return false;
            };
    
            return true;
            
        } catch(err) {
            console.warn("Permission Error: ", err);
            Alert.alert("Error", "Unable to request permissions.");
            return false;
        }
    };

    // select image from media library
    const pickImage = async () => {
        const image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if(!image.canceled) {
            onSelectImage(image.assets[0].uri)
        }
    };

    // take photo using camera
    const takePhoto = async () => {
        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 1,
        });

        if(!image.canceled) {
            onSelectImage(image.assets[0].uri)
        }
    };

    // handle camera or gallery selection
    const handleImageSelection = async () => {
        if(!permission) return;

        Alert.alert('Select Image Source', 'Choose an Option', 
            [
                { text: "Cancel", style: "cancel" },
                { text: "Camera", onPress: takePhoto },
                { text: "Gallery", onPress: pickImage },
            ],
            { cancelable: true }
        );
    };

    return (
        <TouchableOpacity
            onPress={handleImageSelection}
            className="bg-gray-100 px-4 py-2 mb-4 rounded-lg"
        >
            <Text className="text-gray-600 text-lg text-center">Select an Image</Text>
        </TouchableOpacity>
    )
};