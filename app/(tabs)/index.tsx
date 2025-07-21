import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import useFetch from "@/services/hooks/useHooks";
import { fetchMovies } from "@/services/api";
import { useEffect, useState } from "react";

export default function Index() {
  const router = useRouter();

  const {
    data,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));

  return (
  <View className="flex-1 bg-primary">
    <Image source={images.bg} className="absolute w-full z-0" />

    {/* Header Section */}
    <Image
      source={icons.logo}
      className="w-12 h-10 mt-20 mb-5 mx-auto"
    />

    {moviesLoading ? (
      <ActivityIndicator
        size="large"
        color="#0000ff"
        className="mt-10 mb-5 mx-auto"
      />
    ) : moviesError ? (
      <Text className="text-white text-center mt-10">
        Error: {moviesError?.message}
      </Text>
    ) : (
      <>
        <SearchBar
          onPress={() => router.push("/search")}
          placeholder="Search for a movie"
        />
        <Text className="text-lg text-white font-bold mt-5 mb-3">
          Latest Movies
        </Text>
      </>
    )}

    {/* Movie List */}
    {!moviesLoading && !moviesError && (
      <FlatList
        data={data?.results || []}
        keyExtractor={(item) => item?.id?.toString()}
        renderItem={({ item }) => (
          <Text className="text-sm text-white">{item.title}</Text>
        )}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 10,
          paddingTop: 10,
          minHeight: "100%",
        }}
        showsVerticalScrollIndicator={false}
      />
    )}
  </View>
);
}
