import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, Pressable, Image, useWindowDimensions, Animated } from 'react-native';
import { useLocalSearchParams, useRouter, Link } from 'expo-router';
import { ScallopedHeader } from '../../components/organisms/ScallopedHeader';
import { ScallopedFooter } from '../../components/organisms/ScallopedFooter';
import { SketchyBorder } from '../../components/atoms/SketchyBorder';
import { Feather } from '@expo/vector-icons';
import { useBudgetStore } from '../../store/useBudgetStore';
import { useSmartHeaderScroll } from '../../hooks/useSmartHeaderScroll';
import { HeaderSpacer } from '../../components/atoms/HeaderSpacer';
import { animate } from 'animejs';

const MOCK_PRODUCT_DETAIL = {
  id: 'chicken-jerky',
  title: 'Premium Chicken Jerky',
  basePrice: { amount: 14.99, currency: 'MYR' },
  rating: 5,
  reviews: 128,
  isPork: false,
  description: "Our signature air-dried chicken jerky is crafted with love and a sprinkle of magic. Made from single-ingredient, human-grade chicken breast, these tender strips are slowly dehydrated to lock in flavor and nutrients. Perfect for good boys, sweet girls, and every wagging tail in between.",
  insideTheBag: [
    { type: 'positive', title: '100% Free-Range Chicken Breast:', text: 'Sourced from happy, local farms.' },
    { type: 'positive', title: 'Vitamin E (Mixed Tocopherols):', text: 'A natural preservative to keep things fresh and healthy.' },
    { type: 'negative', title: 'Absolutely no grains, fillers, or artificial anything.' }
  ],
  sizes: [
    { label: '50g Starter', multiplier: 1 },
    { label: '100g Jumbo', multiplier: 1.8 } // e.g., $26.98
  ],
  images: [
    require('../../assets/images/salmon_skin.png'), // using available mock images
    require('../../assets/images/beef_jerky.png'),
    require('../../assets/images/salmon_skin.png'),
  ]
};

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { addItem } = useBudgetStore();
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const handleScroll = useSmartHeaderScroll();

  const [activeSizeIndex, setActiveSizeIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const activeSize = MOCK_PRODUCT_DETAIL.sizes[activeSizeIndex];
  const unitPrice = MOCK_PRODUCT_DETAIL.basePrice.amount * activeSize.multiplier;
  const totalPrice = unitPrice * quantity;

  const btnAnimObj = useRef({ scale: 1 });
  const btnRef = useRef(null);

  const animateBtn = (direction: 'in' | 'out') => {
    animate(btnAnimObj.current, {
      scale: direction === 'in' ? 0.95 : 1,
      duration: direction === 'in' ? 100 : 300,
      easing: 'easeOutQuad',
      update: () => {
        if (btnRef.current) {
           const node = btnRef.current as any;
           if (node.setNativeProps) {
             node.setNativeProps({
               style: { transform: [{ scale: btnAnimObj.current.scale }] }
             });
           } else if (node.style) {
             node.style.transform = `scale(${btnAnimObj.current.scale})`;
           }
        }
      }
    });
  };

  const handleAddToBox = () => {
    // Add multiple quantities by calling addItem multiple times
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: `${MOCK_PRODUCT_DETAIL.id}-${activeSizeIndex}`,
        name: `${MOCK_PRODUCT_DETAIL.title} (${activeSize.label})`,
        basePrice: { amount: unitPrice, currency: 'MYR' },
        tags: [activeSize.label],
        isPork: MOCK_PRODUCT_DETAIL.isPork,
        image: MOCK_PRODUCT_DETAIL.images[0]
      }, false);
    }
    // Optionally navigate to cart or show success
    router.push('/cart');
  };

  return (
    <View className="flex-1 bg-chibi-cream">
      <ScallopedHeader />
      
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 60, paddingTop: 120 }} onScroll={handleScroll} scrollEventThrottle={16}>
        <View className="max-w-6xl mx-auto w-full px-6 pb-12">
          
          {/* Breadcrumb */}
          <Link href="/treats" className="mb-6">
            <Text className="font-bold text-chibi-brown/50 hover:text-chibi-brown">← Back to Menu</Text>
          </Link>

          <View className="flex-col md:flex-row gap-12">
            
            {/* Left Column: Gallery */}
            <View className="flex-1 md:flex-[1.2]">
              <SketchyBorder variance={2} backgroundColor="#F9F6F0" padding={16} className="mb-6 shadow-sm">
                <View className="aspect-square bg-[#F7F2EE] rounded-xl items-center justify-center overflow-hidden">
                  <Image 
                    source={MOCK_PRODUCT_DETAIL.images[0]} 
                    style={{ width: '80%', height: '80%' }} 
                    resizeMode="contain" 
                  />
                  {/* Decorative badge */}
                  <View className="absolute top-4 left-4 bg-[#E4F1B3] px-4 py-1 rounded-full border border-chibi-brown/20 transform -rotate-3">
                    <Text className="font-black text-xs text-chibi-brown">Air Dried</Text>
                  </View>
                </View>
              </SketchyBorder>

              <View className="flex-row gap-4">
                {MOCK_PRODUCT_DETAIL.images.map((img, idx) => (
                  <View key={idx} className="flex-1 aspect-square">
                    <SketchyBorder variance={1} backgroundColor={idx === 1 ? '#FDECEC' : idx === 2 ? '#E4F1B3' : 'white'} padding={8}>
                      <Image source={img} style={{ width: '100%', height: '100%', opacity: 0.8 }} resizeMode="contain" />
                    </SketchyBorder>
                  </View>
                ))}
              </View>
            </View>

            {/* Right Column: Content */}
            <View className="flex-1 md:flex-[1.5]">
              
              {/* Header */}
              <View className="mb-6">
                <Text className="font-black text-4xl md:text-5xl text-chibi-brown mb-2 tracking-tighter">
                  {MOCK_PRODUCT_DETAIL.title}
                </Text>
                <View className="flex-row items-end gap-4 mb-2">
                  <Text className="font-black text-2xl text-chibi-brown/80">${unitPrice.toFixed(2)}</Text>
                  <View className="flex-row items-center mb-1">
                    {[...Array(MOCK_PRODUCT_DETAIL.rating)].map((_, i) => (
                      <Feather key={i} name="star" size={16} color="#EAB308" />
                    ))}
                    <Text className="font-bold text-chibi-brown/50 text-sm ml-2">({MOCK_PRODUCT_DETAIL.reviews} reviews)</Text>
                  </View>
                </View>
              </View>

              {/* Description */}
              <View className="mb-8 relative">
                {/* Wavy sketchy border for description */}
                <SketchyBorder variance={4} backgroundColor="white" padding={24} className="shadow-sm">
                  <Text className="font-medium text-chibi-brown/80 text-lg leading-8">
                    {MOCK_PRODUCT_DETAIL.description}
                  </Text>
                </SketchyBorder>
                {/* Cute heart floating */}
                <View className="absolute -top-3 -right-3 w-8 h-8 bg-[#FDECEC] rounded-full border border-chibi-brown/20 items-center justify-center transform rotate-12">
                   <Feather name="heart" size={14} color="#832742" />
                </View>
              </View>

              {/* Inside the Bag */}
              <View className="mb-10 pl-2">
                <View className="flex-row items-center mb-4 gap-2">
                   <Text className="text-xl">🍂</Text>
                   <Text className="font-black text-2xl text-chibi-brown tracking-tighter">Inside the Bag</Text>
                </View>
                
                <View className="gap-4">
                  {MOCK_PRODUCT_DETAIL.insideTheBag.map((feature, idx) => (
                    <View key={idx} className="flex-row items-start pr-4">
                      {feature.type === 'positive' ? (
                        <View style={{ marginTop: 4, marginRight: 12 }}>
                          <Feather name="check-circle" size={20} color="#84A98C" />
                        </View>
                      ) : (
                        <View style={{ marginTop: 4, marginRight: 12 }}>
                          <Feather name="x-circle" size={20} color="#DC2626" />
                        </View>
                      )}
                      <Text className={`font-medium text-lg leading-7 ${feature.type === 'negative' ? 'text-chibi-brown/40 line-through' : 'text-chibi-brown/80'}`}>
                        {feature.title && <Text className="font-bold text-chibi-brown">{feature.title} </Text>}
                        {feature.text}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Customize Panel */}
              <SketchyBorder variance={2} backgroundColor="#FDECEC" borderColor="#E8B4B8" padding={24}>
                <View className="absolute -top-4 left-6 bg-white px-4 py-1 border border-[#E8B4B8] border-dashed rounded-md transform -rotate-2">
                  <Text className="font-black text-[#832742] text-sm">Customize Your Treat Box</Text>
                </View>
                
                <View className="mt-4">
                  {/* Size Toggle */}
                  <Text className="font-black text-[#832742] mb-3">Select Size:</Text>
                  <View className="flex-row gap-3 mb-8">
                    {MOCK_PRODUCT_DETAIL.sizes.map((size, idx) => {
                      const isActive = activeSizeIndex === idx;
                      return (
                        <Pressable 
                          key={idx}
                          onPress={() => setActiveSizeIndex(idx)}
                          className={`flex-1 py-4 border-2 ${isActive ? 'bg-[#832742] border-[#832742]' : 'bg-transparent border-[#832742]'} items-center justify-center`}
                          style={{ borderRadius: 4 }}
                        >
                          <Text className={`font-black ${isActive ? 'text-white' : 'text-[#832742]'}`}>
                            {size.label}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>

                  {/* Quantity Stepper */}
                  <Text className="font-black text-[#832742] mb-3">Quantity:</Text>
                  <View className="flex-row mb-8">
                    <View className="flex-row items-center bg-[#FDF6F6] border-2 border-[#832742]/20 px-2 py-2" style={{ borderRadius: 8 }}>
                      <Pressable 
                        onPress={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 items-center justify-center"
                      >
                        <Feather name="minus" size={18} color="#832742" />
                      </Pressable>
                      <Text className="font-black text-xl text-[#832742] px-6 w-16 text-center">{quantity}</Text>
                      <Pressable 
                        onPress={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 items-center justify-center"
                      >
                        <Feather name="plus" size={18} color="#832742" />
                      </Pressable>
                    </View>
                  </View>

                  {/* Add to Box CTA */}
                  <Animated.View ref={btnRef}>
                    <Pressable 
                      onPress={handleAddToBox}
                      onPressIn={() => animateBtn('in')}
                      onPressOut={() => animateBtn('out')}
                      className="bg-[#E4F1B3] border-[3px] border-chibi-brown py-5 rounded-xl shadow-[4px_4px_0px_rgba(74,66,62,1)] items-center justify-center flex-row"
                    >
                      <Text className="text-xl mr-3">🐾</Text>
                      <Text className="font-black text-2xl text-chibi-brown tracking-tighter">
                        Add to Box - ${totalPrice.toFixed(2)}
                      </Text>
                    </Pressable>
                  </Animated.View>

                </View>
              </SketchyBorder>

            </View>

          </View>
        </View>
        <ScallopedFooter />
      </ScrollView>
    </View>
  );
}
