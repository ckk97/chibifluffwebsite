import React, { useRef, useEffect } from 'react';
import { View, Text, Pressable, Animated as RNAnimated, Platform } from 'react-native';
import { Link } from 'expo-router';
import Svg, { Path } from 'react-native-svg';
import { SketchyBorder } from '../atoms/SketchyBorder';
import { useBudgetStore } from '../../store/useBudgetStore';
import { useHeaderStore } from '../../store/useHeaderStore';

/**
 * ScallopedHeader - Refined to match the exact spacing and pill-style nav of the mockup.
 */
export const ScallopedHeader = () => {
  const { cartItems } = useBudgetStore();
  const totalItems = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  const isVisible = useHeaderStore(s => s.isVisible);
  const translateY = useRef(new RNAnimated.Value(0)).current;

  useEffect(() => {
    RNAnimated.spring(translateY, {
      toValue: isVisible ? 0 : -120,
      useNativeDriver: true,
      friction: 8,
      tension: 40
    }).start();
  }, [isVisible]);

  return (
    <RNAnimated.View 
      className="absolute top-0 left-0 right-0 z-50 pt-10 pb-2" 
      style={{ 
        transform: [{ translateY }],
        backgroundColor: '#F9D6D8' // Force exact brand pink
      }}
    >
       <View className="px-10 flex-row justify-between items-center h-16">
          {/* Logo with hand-drawn feel */}
          <Link href="/" asChild>
            <Pressable>
              <SketchyBorder variance={2} padding={8} backgroundColor="white" doubleLine={false}>
                <Text className="font-black text-chibi-brown tracking-tighter text-lg uppercase px-2">CHiBi FLuFF</Text>
              </SketchyBorder>
            </Pressable>
          </Link>
          
          {/* Pill Navigation */}
          <View className="flex-row gap-3">
            <Link href="/treats" asChild>
              <Pressable className="bg-white/30 border border-chibi-brown/10 px-6 py-2 rounded-full">
                <Text className="text-chibi-brown font-black text-xs uppercase">Treats</Text>
              </Pressable>
            </Link>
            <Link href="/reviews" asChild>
              <Pressable className="bg-white/30 border border-chibi-brown/10 px-6 py-2 rounded-full">
                <Text className="text-chibi-brown font-black text-xs uppercase">Reviews</Text>
              </Pressable>
            </Link>
            <Link href="/story" asChild>
              <Pressable className="bg-white/30 border border-chibi-brown/10 px-6 py-2 rounded-full">
                <Text className="text-chibi-brown font-black text-xs uppercase">Our Story</Text>
              </Pressable>
            </Link>
          </View>

          {/* Action Icons */}
          <View className="flex-row gap-3">
             <Link href="/cart" asChild>
               <Pressable className="relative w-11 h-11 bg-white rounded-2xl border-2 border-chibi-brown items-center justify-center shadow-sm">
                  <Text className="text-xl">🧺</Text>
                  {totalItems > 0 && (
                    <View className="absolute -top-2 -right-2 bg-red-500 border-2 border-chibi-brown w-6 h-6 rounded-full items-center justify-center z-50">
                      <Text className="font-black text-[10px] text-white">{totalItems}</Text>
                    </View>
                  )}
               </Pressable>
             </Link>
             <Link href="/account" asChild>
               <Pressable className="w-11 h-11 bg-white rounded-2xl border-2 border-chibi-brown items-center justify-center shadow-sm">
                  <Text className="text-xl">👤</Text>
               </Pressable>
             </Link>
          </View>
       </View>

       {/* Scalloped Bottom Edge - Tighter half-circles */}
       <View className="absolute -bottom-5 left-0 right-0 h-6">
          <Svg width="100%" height="24" preserveAspectRatio="none" viewBox="0 0 100 20">
             <Path 
               d="M0 0 V10 Q 1.5 20, 3 10 T 6 10 T 9 10 T 12 10 T 15 10 T 18 10 T 21 10 T 24 10 T 27 10 T 30 10 T 33 10 T 36 10 T 39 10 T 42 10 T 45 10 T 48 10 T 51 10 T 54 10 T 57 10 T 60 10 T 63 10 T 66 10 T 69 10 T 72 10 T 75 10 T 78 10 T 81 10 T 84 10 T 87 10 T 90 10 T 93 10 T 96 10 T 99 10 L 100 10 V 0 Z" 
               fill="#F9D6D8" 
             />
          </Svg>
       </View>
    </RNAnimated.View>
  );
};
