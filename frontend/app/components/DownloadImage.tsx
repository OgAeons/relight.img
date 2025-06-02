import React from "react";
import { TouchableOpacity, Text, Alert } from "react-native";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

type Props = {
  imageUri: string; 
};

export const DownloadImage: React.FC<Props> = ({ imageUri }) => {
  const handleDownload = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission required", "Please allow access to save the image.");
        return;
      }

      // Extract just the base64 and rename the file
      const base64Code = imageUri.split("base64,")[1];
      const filename = `${FileSystem.documentDirectory}relighted_${Date.now()}.jpg`;

      // Save the image file
      await FileSystem.writeAsStringAsync(filename, base64Code, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // save to device media library
      await MediaLibrary.saveToLibraryAsync(filename);

      Alert.alert("Success", "Image saved to gallery!");
    } catch (err) {
      console.error("Download failed:", err);
      Alert.alert("Download Failed", "There was a problem saving the image.");
    }
  };

  return (
    <TouchableOpacity 
      className="bg-green-600 px-4 py-2 rounded-lg mb-4"
      onPress={handleDownload}
    >
      <Text className="text-white text-lg text-center">Download Image</Text>
    </TouchableOpacity>
  );
};
