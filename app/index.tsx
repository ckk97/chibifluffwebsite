import React, { useRef, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Image, Animated } from 'react-native';
import { Link } from 'expo-router';
import { SketchyBorder } from '../components/atoms/SketchyBorder';
import { ScallopedHeader } from '../components/organisms/ScallopedHeader';
import { ScallopedFooter } from '../components/organisms/ScallopedFooter';
import { StatusBar } from 'expo-status-bar';
import { useSmartHeaderScroll } from '../hooks/useSmartHeaderScroll';

/**
 * HomePage - Refined with 3D Animated Hero image.
 */
export default function HomePage() {
  const handleScroll = useSmartHeaderScroll();
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [floatAnim]);

  const translateY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20],
  });

  const rotate = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['-1deg', '2deg'],
  });

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <ScallopedHeader />
      
      <ScrollView 
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* HERO SECTION */}
        <View className="relative">
          <View className="bg-dots absolute inset-0 opacity-40" pointerEvents="none" />
          
          <View className="px-10 pb-16">
            <SketchyBorder 
              variance={8} 
              backgroundColor="white" 
              padding={44}
              className="shadow-2xl"
            >
              <View className="flex-row items-center justify-between gap-12">
                {/* Hero Text */}
                <View className="flex-[1.2] items-start">
                  <Text className="text-6xl font-black text-chibi-brown mb-8 leading-[1.1]">
                    Welcome to{"\n"}Chibi Fluff Cafe
                  </Text>
                  <Text className="text-2xl text-chibi-brown/70 mb-12 leading-9 font-medium max-w-[500px]">
                    Wholesome, hand-crafted treats that make tails wag and hearts melt. 
                    Because every good boy and girl deserves the best.
                  </Text>
                  
                  <Link href="/treats" asChild>
                    <Pressable className="bg-chibi-brown px-12 py-5 rounded-full shadow-lg active:scale-95 transition-transform">
                      <View className="flex-row items-center gap-4">
                         <Text className="text-3xl">🫀</Text>
                         <Text className="text-white font-black text-2xl uppercase tracking-tighter">Shop Treats</Text>
                      </View>
                    </Pressable>
                  </Link>
                </View>

                {/* Hero 3D Animated Image */}
                <View className="flex-1 items-end pr-4">
                   <Animated.View style={{ transform: [{ translateY }, { rotate }] }}>
                      <SketchyBorder variance={4} strokeWidth={8} borderColor="white" padding={12} doubleLine={false}>
                        <View className="rounded-[48px] overflow-hidden bg-[#FFFDF6] shadow-inner">
                           <View className="w-[480px] h-[480px] items-center justify-center">
                              <Image
                                source={require('../assets/images/chibi_pet_3d.png')}
                                style={{ width: 480, height: 480 }}
                                resizeMode="cover"
                              />
                           </View>
                        </View>
                      </SketchyBorder>
                   </Animated.View>
                </View>
              </View>
            </SketchyBorder>
          </View>
        </View>

        {/* INTRO SECTION */}
        <View className="px-10 py-24 items-center bg-[#FFFDF6]">
          <View className="w-full max-w-5xl">
            <SketchyBorder 
              variance={4} 
              padding={64} 
              doubleLine={false} 
              dashed={true}
              backgroundColor="#F7F2EE" 
              borderColor="#4A423E"
              strokeWidth={1.5}
            >
               <View className="items-center">
                  <View className="w-20 h-20 mb-8 items-center justify-center">
                     <Text className="text-6xl rotate-[-5deg]">👋</Text>
                  </View>
                  <Text className="text-5xl font-black text-chibi-brown mb-8">Hello, Pet Parents!</Text>
                  <Text className="text-center text-chibi-brown/80 text-xl leading-10 font-medium max-w-[900px]">
                     At Chibi Fluff, we believe treats should be as delightful as the pets who eat them. 
                     That's why we use only simple, organic ingredients, mixed with a whole lot of love. 
                     No weird stuff, just pure, crunchy, chewy goodness.
                  </Text>
                  
                  <Link href="/story" asChild>
                    <Pressable className="mt-10 active:scale-95 transition-transform">
                       <SketchyBorder variance={2} padding={12} backgroundColor="white">
                          <Text className="font-black text-chibi-brown px-6">Learn Our Story →</Text>
                       </SketchyBorder>
                    </Pressable>
                  </Link>
               </View>
            </SketchyBorder>
          </View>
        </View>

        {/* BEST SELLERS SECTION */}
        <View className="px-14 py-10 bg-[#FFFDF6]">
           <View className="flex-row justify-between items-end mb-14 px-4">
              <View className="flex-row items-center gap-4">
                 <Text className="text-4xl">⭐</Text>
                 <Text className="text-5xl font-black text-chibi-brown tracking-tighter">Our Best Sellers</Text>
              </View>
              <Link href="/treats" asChild>
                <Pressable>
                  <Text className="text-chibi-brown/50 font-black text-lg underline uppercase tracking-widest">View all →</Text>
                </Pressable>
              </Link>
           </View>

           <View className="flex-row gap-10">
              {[1, 2, 3].map((i) => (
                <View key={i} className="flex-1">
                   <SketchyBorder variance={5} backgroundColor="white" padding={16} className="shadow-lg">
                      <View className="aspect-[4/3] bg-[#F7F2EE] rounded-2xl mb-6 relative overflow-hidden" />
                      <Text className="font-black text-2xl text-chibi-brown mb-3">Beefy Bites</Text>
                      <Text className="text-chibi-brown/60 mb-8 text-lg font-medium leading-6">100% grass-fed beef jerky strips. The classic favorite.</Text>
                      <View className="w-full h-[1px] bg-chibi-brown/10 mb-6 border-dashed" />
                      <View className="flex-row justify-between items-center">
                         <Text className="font-black text-3xl text-chibi-brown tracking-tighter">$12.99</Text>
                         <View className="w-14 h-14 bg-[#F9D6D8]/60 rounded-2xl border-2 border-chibi-brown items-center justify-center">
                            <Text className="text-2xl">🧺</Text>
                         </View>
                      </View>
                   </SketchyBorder>
                </View>
              ))}
           </View>
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
