import { useState } from "react";
import useFetch from "./services/hooks/usefetch";
import { fetchMovies } from "./services/api";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { images } from "./constants/images";
import MovieCard from "./components/MovieCard";
import { icons } from "./constants/icons";
import SearchBar from "./components/SearchBar";

const search = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: searchTerm }));

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute w-full z-0"
        resizeMode="cover"
      />

      <FlatList
        className="px-5"
        data={data?.results || []}
        keyExtractor={(item) => item?.id?.toString()}
        renderItem={({ item }) => <MovieCard {...item} />}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>

            <View className="my-5">
              <SearchBar
                placeholder="Search movies"
                value={searchTerm}
                onChangeText={(text) => setSearchTerm(text)}
              />
            </View>
            
            {moviesLoading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-3"
              />
            )}
            {moviesError && (
              <Text className="text-red-500 text-center px-5 my-3">
                Error: {moviesError?.message}
              </Text>
            )}
            {!moviesLoading &&
              !moviesError &&
              data?.results?.length > 0 &&
              searchTerm.trim() && (
                <Text className="text-xl text-white font-bold">
                  Search Result{" "}
                  <Text className="text-accent">{searchTerm}</Text>
                </Text>
              )}
          </>
        }
      />
    </View>
  );
};

export default search;
