import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import MaskedView from '@react-native-masked-view/masked-view';
import { images } from '@/constants/images';

const TrendingCard = ({movie: {$id, title, poster_url } , index} : TrendingCardProps) => {
  return (
    <Link asChild href={`/movies/${$id}`} key={index}>
        <TouchableOpacity className='w-32 relative pl-5'>
            <Image source={{uri : poster_url}} className='w-32 h-48 rounded-lg'/>
            <View className='absolute bottom-9 -left-2 px-2 py-1 rounded-full'>
                <MaskedView maskElement={
                    <Text className='text-white font-bold text-6xl'>
                        {index + 1}
                    </Text>
                }>
                    <Image source={images.rankingGradient} className='size-14' resizeMode='cover'/>
                </MaskedView>
            </View>
            <Text className='text-light-200 text-sm font-bold mt-2' numberOfLines={2}>{title}</Text>
        </TouchableOpacity>
    </Link>
  )
}

export default TrendingCard