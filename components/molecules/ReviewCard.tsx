import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import Svg, { Path } from 'react-native-svg';
import { SketchyBorder } from '../atoms/SketchyBorder';
import { Review } from '../../constants/reviews';

const WatercolorStar = ({ filled }: { filled: boolean }) => (
  <View className="m-0.5">
    <Svg width="20" height="20" viewBox="0 0 24 24">
      <Path
        d="M12 2.5L14.81 8.62L21.5 9.33L16.5 13.97L17.91 20.5L12 17.1L6.09 20.5L7.5 13.97L2.5 9.33L9.19 8.62L12 2.5Z"
        fill={filled ? "#FBC02D" : "transparent"}
        stroke="#FBC02D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={filled ? 0.7 : 0.2}
      />
    </Svg>
  </View>
);

const Tape = () => (
  <View 
    className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-4 bg-chibi-tan/30 z-20"
    style={{ transform: [{ rotate: '-3deg' }] }}
  />
);

const ApprovedStamp = () => (
  <View 
    className="absolute -bottom-2 -right-2 z-30"
    style={{ transform: [{ rotate: '-12deg' }] }}
  >
    <SketchyBorder
      variance={2}
      padding={4}
      borderColor="#FF6B6B"
      backgroundColor="rgba(255, 255, 255, 0.9)"
      doubleLine={false}
      className="px-2"
    >
      <Text className="text-[10px] font-black text-[#FF6B6B] uppercase tracking-widest">
        Approved
      </Text>
    </SketchyBorder>
  </View>
);

interface ReviewCardProps {
  review: Review;
  rotation?: number;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review, rotation = 0 }) => {
  const stars = Array.from({ length: 5 }, (_, i) => (
    <WatercolorStar key={i} filled={i < review.rating} />
  ));

  return (
    <View style={{ transform: [{ rotate: `${rotation}deg` }] }} className="mb-6">
      <SketchyBorder
        variance={4}
        padding={16}
        backgroundColor="#FFFDF6" // chibi-cream
        borderColor="#4A423E"    // chibi-brown
        doubleLine={true}
      >
        <View className="relative">
          {/* Pet Photo with Tape */}
          <View className="relative mb-4 items-center">
            <Tape />
            <View 
              className="w-full aspect-square bg-chibi-tan/10 overflow-hidden border-4 border-white shadow-sm"
              style={{ transform: [{ rotate: `${(Math.random() - 0.5) * 4}deg` }] }}
            >
              <Image
                source={{ uri: review.imageUri }}
                style={{ width: '100%', height: '100%' }}
                contentFit="cover"
                transition={500}
              />
            </View>
            {review.isPetApproved && <ApprovedStamp />}
          </View>

          {/* Pet Info */}
          <View className="flex-row justify-between items-center mb-2">
            <Text className="font-black text-chibi-brown text-lg">{review.petName}</Text>
            <View className="bg-chibi-sage/30 px-2 py-0.5 rounded-full border border-chibi-sage/50">
              <Text className="text-[10px] font-bold text-chibi-brown/70 uppercase">
                {review.petType}
              </Text>
            </View>
          </View>

          {/* Rating */}
          <View className="flex-row mb-3">
            {stars}
          </View>

          {/* Comment */}
          <Text className="text-chibi-brown/80 leading-5 text-sm italic">
            "{review.comment}"
          </Text>
        </View>
      </SketchyBorder>
    </View>
  );
};
