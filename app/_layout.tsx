import { Stack } from "expo-router";
import "./global.css";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <>
      <StatusBar hidden />
      <Stack>
        <Stack.Screen options={{ headerShown: false }} name="(tabs)" />
        <Stack.Screen options={{ headerShown: false }} name="movies/[id]" />
      </Stack>
    </>
  );
}
