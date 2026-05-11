import React, { useRef, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Image, Animated } from 'react-native';
import { SketchyBorder } from '../components/atoms/SketchyBorder';
import { ScallopedHeader } from '../components/organisms/ScallopedHeader';
import { ScallopedFooter } from '../components/organisms/ScallopedFooter';
import { StatusBar } from 'expo-status-bar';

/**
 * OurStoryPage - Implements the brand's origin story with high-fidelity "Perfectly Imperfect" patterns.
 */
export default function OurStoryPage() {
  const storyFloat = useRef(new Animated.Value(0)).current;
  const processFloat = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Story animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(storyFloat, { toValue: 1, duration: 4000, useNativeDriver: true }),
        Animated.timing(storyFloat, { toValue: 0, duration: 4000, useNativeDriver: true }),
      ])
    ).start();

    // Process animation (slightly offset)
    Animated.loop(
      Animated.sequence([
        Animated.timing(processFloat, { toValue: 1, duration: 3500, useNativeDriver: true }),
        Animated.timing(processFloat, { toValue: 0, duration: 3500, useNativeDriver: true }),
      ])
    ).start();
  }, [storyFloat, processFloat]);

  const storyTranslateY = storyFloat.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -15],
  });

  const processTranslateY = processFloat.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -12],
  });

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <ScallopedHeader />
      
      <ScrollView 
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HERO SECTION: Once Upon a Treat */}
        <View className="px-10 py-16 flex-row gap-12 items-center">
          <View className="flex-[1.2]">
            <Text className="text-5xl font-black text-chibi-brown mb-8 leading-tight">
              Once Upon a Treat...
            </Text>
            <Text className="text-xl text-chibi-brown/70 mb-10 leading-8 font-medium">
              It all started in a tiny kitchen with a very picky Golden Retriever named Barnaby. 
              We couldn't find treats that were both healthy and delicious, so we rolled up 
              our sleeves and started baking.
            </Text>
            
            <Pressable className="self-start">
               <SketchyBorder variance={2} padding={12} backgroundColor="#F9D6D8/20">
                  <Text className="font-black text-chibi-brown px-4">Meet the Bakers</Text>
               </SketchyBorder>
            </Pressable>
          </View>

          {/* Hero Illustration 3D Animated */}
          <View className="flex-1">
             <Animated.View style={{ transform: [{ translateY: storyTranslateY }] }}>
                <SketchyBorder variance={5} padding={10} backgroundColor="white">
                    <View className="aspect-[4/3] rounded-3xl overflow-hidden items-center justify-center bg-[#FFFDF6]">
                        <Image 
                            source={require('../assets/images/story_3d.png')}
                            style={{ width: '100%', height: '100%' }}
                            resizeMode="cover"
                        />
                    </View>
                </SketchyBorder>
             </Animated.View>
          </View>
        </View>

        {/* SECTION TITLE: Handmade with Love */}
        <View className="items-center py-10">
           <Text className="text-4xl font-black text-chibi-brown mb-2">Handmade with Love</Text>
           <View className="w-32 h-[2px] bg-chibi-brown/20 border-dashed border" />
        </View>

        {/* CORE VALUES: 3 Column Grid */}
        <View className="px-10 flex-row gap-8 mb-20">
          {[
            { title: 'Pure Ingredients', text: 'Only the finest organic flours, real peanut butter, and fresh pumpkin.', icon: '❤️' },
            { title: 'Small Batches', text: 'Every treat is hand-rolled and cut in our local bakery to ensure premium quality.', icon: '🥧' },
            { title: 'Giving Back', text: 'A portion of every sale goes directly to local animal rescues to help pets.', icon: '🐾' }
          ].map((item, idx) => (
            <View key={idx} className="flex-1">
               <SketchyBorder variance={4} backgroundColor="white" padding={32} className="h-full">
                  <View className="items-center">
                     <View className="w-16 h-16 rounded-full border border-chibi-brown/30 border-dashed items-center justify-center mb-6">
                        <Text className="text-2xl">{item.icon}</Text>
                     </View>
                     <Text className="text-2xl font-black text-chibi-brown mb-4 text-center">{item.title}</Text>
                     <Text className="text-center text-chibi-brown/60 font-medium leading-6">{item.text}</Text>
                  </View>
               </SketchyBorder>
            </View>
          ))}
        </View>

        {/* PROCESS SECTION: From Our Oven to Their Tummy */}
        <View className="px-10 mb-20">
           <SketchyBorder variance={3} padding={48} backgroundColor="#F7F2EE">
              <View className="flex-row gap-12 items-center">
                 {/* 3D Animated Process Illustration */}
                 <View className="flex-1">
                    <Animated.View style={{ transform: [{ translateY: processTranslateY }] }}>
                        <SketchyBorder variance={2} padding={8} borderColor="white" backgroundColor="white">
                            <View className="aspect-square rounded-2xl overflow-hidden bg-white shadow-sm">
                                <Image 
                                    source={require('../assets/images/process_3d.png')}
                                    style={{ width: '100%', height: '100%' }}
                                    resizeMode="cover"
                                />
                            </View>
                        </SketchyBorder>
                    </Animated.View>
                 </View>

                 {/* Text Content */}
                 <View className="flex-1">
                    <View className="bg-chibi-sage/20 self-start px-4 py-1 rounded-full border border-chibi-brown/20 mb-6">
                       <Text className="text-[10px] font-black text-chibi-brown uppercase">The Process</Text>
                    </View>
                    <Text className="text-4xl font-black text-chibi-brown mb-6">From Our Oven to Their Tummy</Text>
                    <Text className="text-lg text-chibi-brown/70 leading-8 font-medium mb-6">
                       We believe that treat time is more than just a snack—it's a moment of connection. 
                       That's why we spend hours perfecting our recipes, ensuring they are packed with 
                       nutrients but free from artificial preservatives.
                    </Text>
                    <Text className="text-lg text-chibi-brown/70 leading-8 font-medium italic">
                       Our signature "Pup-kin Spice" took 42 tries to get right, but seeing the 
                       tail wags makes every failed batch worth it.
                    </Text>
                 </View>
              </View>
           </SketchyBorder>
        </View>

        <ScallopedFooter />

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFDF6',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 120,
    paddingBottom: 40,
  },
});
