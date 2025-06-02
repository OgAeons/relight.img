import React, { useState, useRef } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { ImageSelector } from "./components/ImagePicker";
import { relightImage } from "./utils/RelightImage";
import { DownloadImage } from "./components/DownloadImage";

export default function Index() {
  const [ImageUri, setImageUri] = useState<string | null>(null)
  const [RelightedUri, setRelightedUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  // perform or cancel relight
  const handleRelight = async () => {
    if (!ImageUri) return;
    setLoading(true);
    setRelightedUri(null);
    const controller = new AbortController();
    abortControllerRef.current = controller;

    const result = await relightImage(ImageUri, controller);

    if (result) setRelightedUri(result);
    setLoading(false);
  };

  const cancelRelight = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setLoading(false);
    }
  };

  return (
    <View className="bg-white flex-1 justify-center items-center px-6">

      <View className="flex-row justify-center items-center mb-10">
        <Text className="text-5xl text-blue-600 font-bold leading-normal">Relight</Text>
        <Text className="text-5xl text-black font-bold leading-normal"> Images</Text>
      </View>

      <View className="flex-row gap-4">
        <ImageSelector onSelectImage={setImageUri}/>

        { ImageUri && (
          <TouchableOpacity 
            className="bg-red-400 px-4 py-2 mb-4 rounded-lg" 
            onPress={() => { 
              setImageUri(null)
              setRelightedUri(null)
            }}>
            <Text className="text-gray-100 text-lg text-center">Clear Image</Text> 
          </TouchableOpacity>
        )}
      </View>

      { ImageUri && (
        <View className="w-full items-start">
          <Image source={{ uri: ImageUri }} className="w-full h-[25vh] rounded mb-0 pb-0" resizeMode="contain" />
          <Text className="bg-blue-100 text-black text-xl text-center p-2 mb-6">Original Image</Text>
        </View>

      )}

      <View className="flex-row gap-4">
        <TouchableOpacity 
          className="bg-blue-600 px-6 py-3 mb-6 rounded-lg"
          onPress={handleRelight}
          disabled={loading}
        >
          <Text className="text-gray-100 text-xl text-center">
            {loading ? "Processing..." : "Relight Image"}
          </Text> 
        </TouchableOpacity>

        {loading && (
          <TouchableOpacity
            className="bg-gray-500 px-6 py-2 mb-6 rounded-lg"
            onPress={cancelRelight}
          >
            <Text className="text-white text-xl text-center pt-1">Cancel Relight</Text>
          </TouchableOpacity>
        )}
      </View>

      { RelightedUri && (
          <View className="w-full items-start">
            <Image source={{ uri: RelightedUri }} className="w-full h-[25vh] rounded mb-0 pb-0" resizeMode="contain" />
            <Text className="bg-blue-100 text-black text-xl text-center p-2 mb-4">Relighted Image</Text>
          </View>
      )}
      { RelightedUri && (
          <DownloadImage imageUri={RelightedUri} />
      )}
      

    </View>
  )}
