// import { View, Text, Image, TextInput } from 'react-native'
// import React from 'react'
// import { icons } from '@/constants/icons'

// interface Props {
//     placeholder: string,
//     onPress?: () => void,
//     value?: string,
//     onChangeText?: (text: string) => void
// }

// const SearchBar = ({placeholder, onPress, value, onChangeText }:Props) => {
//   return (
//     <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
//         <Image source={icons.search} className='size-5' resizeMode='contain' tintColor="#ab8bff"/>
//         <TextInput 
//             onPress={onPress}
//             placeholder={placeholder}
//             value={value}
//             onChangeText={onChangeText}
//             placeholderTextColor={"#a88b5d"}
//             className='flex-1 ml-2 text-white'
//         />
//     </View>
//   )
// }

// export default SearchBar

import { View, TextInput, Image } from "react-native";

import { icons } from "@/constants/icons";

interface Props {
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onPress?: () => void;
}

const SearchBar = ({ placeholder, value, onChangeText, onPress }: Props) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      <Image
        source={icons.search}
        className="w-5 h-5"
        resizeMode="contain"
        tintColor="#AB8BFF"
      />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        className="flex-1 ml-2 text-white"
        placeholderTextColor="#A8B5DB"
      />
    </View>
  );
};

export default SearchBar;