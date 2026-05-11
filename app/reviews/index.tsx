import React, { useEffect, useRef, useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { animate } from 'animejs';
import { ReviewCard } from '../../components/molecules/ReviewCard';
import { ScallopedHeader } from '../../components/organisms/ScallopedHeader';
import { ScallopedFooter } from '../../components/organisms/ScallopedFooter';
import { HeaderSpacer } from '../../components/atoms/HeaderSpacer';
import { MOCK_REVIEWS, Review } from '../../constants/reviews';
import { useSmartHeaderScroll } from '../../hooks/useSmartHeaderScroll';

const AnimatedReviewCard = ({ review, index }: { review: Review, index: number }) => {
  const containerRef = useRef<View>(null);
  const cardRotation = useMemo(() => (index % 2 === 0 ? 1 : -1) * (Math.random() * 2 + 1), [index]);

  useEffect(() => {
    const animObj = { opacity: 0.4, translateY: 30 };
    
    const timeout = setTimeout(() => {
      animate(animObj, {
        opacity: 1,
        translateY: 0,
        duration: 1200,
        delay: index * 100,
        easing: 'easeOutElastic(1, .8)',
        update: () => {
          const node = containerRef.current as any;
          if (!node) return;

          if (node.setNativeProps) {
            node.setNativeProps({
              style: {
                opacity: animObj.opacity,
                transform: [
                  { translateY: animObj.translateY },
                  { rotate: `${cardRotation}deg` }
                ]
              }
            });
          } 
          
          const webStyle = node.style || (node.target && node.target.style);
          if (webStyle) {
            webStyle.opacity = animObj.opacity;
            webStyle.transform = `translateY(${animObj.translateY}px) rotate(${cardRotation}deg)`;
          }
        }
      });
    }, 500);
    return () => clearTimeout(timeout);
  }, []); // Only run on mount

  return (
    <View 
      ref={containerRef} 
      style={{ 
        opacity: 1, 
        transform: [{ translateY: 0 }, { rotate: `${cardRotation}deg` }] 
      }}
    >
      <ReviewCard review={review} />
    </View>
  );
};

export default function ReviewsPage() {
  const handleScroll = useSmartHeaderScroll();
  
  const leftColumn = MOCK_REVIEWS.filter((_, i) => i % 2 === 0);
  const rightColumn = MOCK_REVIEWS.filter((_, i) => i % 2 !== 0);

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
        <HeaderSpacer />
        
        {/* Page Title & Intro */}
        <View className="items-center pb-20 px-10">
          <Text className="text-6xl font-black text-chibi-brown mb-4 tracking-tighter text-center">
            Our Happy Fluffs
          </Text>
          <Text className="text-center text-chibi-brown/60 text-xl font-medium max-w-2xl leading-8">
            Don't just take our word for it! Here are some paws-itive stories from our community.
          </Text>
        </View>

        {/* Masonry Grid */}
        <View className="px-6 md:px-20 flex-row gap-6 md:gap-10">
          {/* Left Column */}
          <View className="flex-1 gap-8">
            {leftColumn.map((review, i) => (
              <AnimatedReviewCard key={review.id} review={review} index={i * 2} />
            ))}
          </View>
          
          {/* Right Column - Staggered with a margin top */}
          <View className="flex-1 gap-8 mt-12 md:mt-24">
            {rightColumn.map((review, i) => (
              <AnimatedReviewCard key={review.id} review={review} index={i * 2 + 1} />
            ))}
          </View>
        </View>

        {/* Bottom Padding for Footer Visibility */}
        <View className="h-40" />
        
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
    paddingTop: 20,
    paddingBottom: 40,
  },
});
