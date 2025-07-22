import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/hooks/usefetch";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";

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

    <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10,
        }}
      >
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
          <MovieCard {...item}/>
        )}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 10,
          paddingTop: 10,
          minHeight: "100%",
        }}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{
          justifyContent: "center", 
          marginBottom: 16,
          gap: 16,
        }}
        className="mt-2 pb-12"
        scrollEnabled={false}
      />
    )}
    </ScrollView>
  </View>
);
}
