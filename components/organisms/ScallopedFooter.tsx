import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { SketchyBorder } from '../atoms/SketchyBorder';
import { useHeaderStore } from '../../store/useHeaderStore';

/**
 * ScallopedFooter - Restored to DOM and simplified to be compact.
 */
export const ScallopedFooter = () => {
  const isFooterVisible = useHeaderStore(s => s.isFooterVisible);

  if (!isFooterVisible) return null;

  return (
    <View className="w-[80%] self-center py-2 items-center mb-10">
       <View style={{ width: '100%' }}>
          <SketchyBorder variance={4} backgroundColor="#FFFDF6" padding={12} doubleLine={true}>
             <View className="flex-row justify-between items-center mb-3 px-4">
                {/* Links */}
                <View className="flex-row gap-6">
                   {['Privacy Policy', 'Shipping Policy', 'Contact'].map((item) => (
                     <Pressable key={item}>
                        <Text className="text-chibi-brown font-black text-[10px] opacity-70">{item}</Text>
                     </Pressable>
                   ))}
                </View>

                {/* Social Icons */}
                <View className="flex-row gap-3">
                   <Pressable className="w-7 h-7 rounded-full border border-chibi-brown/20 items-center justify-center bg-white">
                      <Text className="font-black text-chibi-brown text-[8px]">f</Text>
                   </Pressable>
                   <Pressable className="w-7 h-7 rounded-full border border-chibi-brown/20 items-center justify-center bg-white">
                      <Text className="font-black text-chibi-brown text-[8px]">ig</Text>
                   </Pressable>
                </View>
             </View>

             {/* Divider line */}
             <View className="w-full h-[0.5px] bg-chibi-brown/5 mb-3 mx-4" />

             {/* Copyright Information */}
             <View className="px-4">
                <Text className="text-center text-chibi-brown/30 font-bold text-[8px] uppercase tracking-widest">
                   © 2024 Chibi Fluff Pet Jerky. All rights reserved.
                </Text>
             </View>
          </SketchyBorder>
       </View>
    </View>
  );
};
