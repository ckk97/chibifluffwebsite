import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Animated, Image, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { ScallopedHeader } from '../../components/organisms/ScallopedHeader';
import { ScallopedFooter } from '../../components/organisms/ScallopedFooter';
import { SketchyBorder } from '../../components/atoms/SketchyBorder';
import { useBudgetStore } from '../../store/useBudgetStore';
import { MOCK_PRODUCTS } from '../../types/products';
import { useSmartHeaderScroll } from '../../hooks/useSmartHeaderScroll';
import { HeaderSpacer } from '../../components/atoms/HeaderSpacer';

export default function BudgetBoxScreen() {
  const router = useRouter();
  const handleScroll = useSmartHeaderScroll();
  const { budget, currentTotal, cartItems, isSurprise, setBudget, addItem, setSurpriseMode } = useBudgetStore();
  const [budgetInput, setBudgetInput] = useState(budget.toString());
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const cardWidth = isMobile ? '100%' : '48%';

  const surpriseBtnRef = useRef(null);
  const surpriseAnimObj = useRef({ scale: 1 });

  const handleBudgetChange = (text: string) => {
    setBudgetInput(text);
    const val = parseInt(text, 10);
    if (!isNaN(val)) {
      setBudget(val);
    }
  };

  const remaining = Math.max(0, budget - currentTotal);
  const progressPercent = Math.min(100, Math.max(0, (currentTotal / Math.max(1, budget)) * 100));

  // Animation removed

  return (
    <View className="flex-1 bg-chibi-cream">
      <ScallopedHeader />
      <ScrollView className="flex-1 px-4 pb-6" contentContainerStyle={{ paddingBottom: 100, paddingTop: 120 }} onScroll={handleScroll} scrollEventThrottle={16}>
        
        <Text className="font-black text-4xl text-chibi-brown text-center mb-6">
          Name Your Budget
        </Text>

        <View className="flex-row justify-center mb-8 gap-4">
           <Pressable onPress={() => setSurpriseMode(false)} className={`px-6 py-2 rounded-full ${!isSurprise ? 'bg-chibi-sage' : 'bg-chibi-tan/20'}`}>
             <Text className={`font-black ${!isSurprise ? 'text-chibi-brown' : 'text-chibi-brown/50'}`}>DIY Box</Text>
           </Pressable>
           <Pressable onPress={() => setSurpriseMode(true)} className={`px-6 py-2 rounded-full ${isSurprise ? 'bg-chibi-sage' : 'bg-chibi-tan/20'}`}>
             <Text className={`font-black ${isSurprise ? 'text-chibi-brown' : 'text-chibi-brown/50'}`}>Surprise Me</Text>
           </Pressable>
        </View>

        <SketchyBorder variance={4} backgroundColor="white" padding={20} className="mb-8">
          <Text className="font-bold text-lg text-chibi-brown/60 text-center mb-4">What is your budget?</Text>
          <View className="flex-row items-center justify-center">
            <Text className="text-5xl font-black text-chibi-brown mr-2">RM</Text>
            <TextInput
              className="text-5xl font-black text-chibi-pink border-b-4 border-chibi-pink/50 min-w-[100px] text-center"
              value={budgetInput}
              onChangeText={handleBudgetChange}
              keyboardType="number-pad"
            />
          </View>
          {budget < 30 && <Text className="text-center text-red-400 mt-4 font-bold">Minimum budget is RM30</Text>}
        </SketchyBorder>

        {!isSurprise ? (
          <>
            <View className="mb-10">
              <View className="flex-row justify-between mb-2">
                <Text className="font-black text-chibi-brown">Current: RM{currentTotal}</Text>
                <Text className="font-black text-chibi-brown/60">Remaining: RM{remaining}</Text>
              </View>
              
              <SketchyBorder variance={2} padding={4} backgroundColor="rgba(249, 214, 216, 0.2)" className="h-12 justify-center">
                 <View 
                   className="h-full bg-chibi-sage rounded-xl" 
                   style={{ width: `${progressPercent}%` }}
                 />
              </SketchyBorder>
            </View>

            <Text className="font-black text-2xl text-chibi-brown mb-4">Add to Box</Text>
            <View className="mb-8 flex-row flex-wrap justify-between">
              {MOCK_PRODUCTS.map((product) => (
                <SnackCard key={product.id} product={product} remaining={remaining} addItem={addItem} cardWidth={cardWidth} />
              ))}
            </View>

            <Pressable 
              disabled={currentTotal !== budget}
              onPress={() => router.push('/cart')}
              className={`py-4 rounded-full border-2 border-chibi-brown items-center justify-center ${currentTotal === budget ? 'bg-chibi-sage shadow-md active:scale-95' : 'bg-gray-300 opacity-50'}`}
            >
              <Text className="font-black text-xl text-chibi-brown">
                {currentTotal === budget ? 'Checkout Now' : 'Fill Your Budget to Checkout'}
              </Text>
            </Pressable>
          </>
        ) : (
          <View className="flex-1 items-center justify-center py-20">
             <Text className="font-black text-2xl text-chibi-brown text-center mb-8">
               Let us curate the perfect selection for RM{budget}!
             </Text>
             <View>
               <Pressable 
                 onPress={() => router.push('/cart')}
                 className="bg-chibi-pink py-6 px-10 rounded-[30px] border-4 border-chibi-brown shadow-lg"
                 style={{ transform: [{ rotate: '-2deg' }] }}
               >
                 <Text className="font-black text-3xl text-white text-center">
                   Surprise My Pet! 🎁
                 </Text>
                 <Text className="font-bold text-white/80 text-center mt-2">Value: RM{budget}</Text>
               </Pressable>
             </View>
          </View>
        )}
        <ScallopedFooter />
      </ScrollView>
    </View>
  );
}

const SnackCard = ({ product, remaining, addItem, cardWidth }: any) => {
  const canAfford = product.price <= remaining;

  // Hardcode local paths for testing to verify asset pipeline
  let imageSource = product.image;
  if (product.name === 'Premium Beef Jerky') imageSource = require('../../assets/images/beef_jerky.png');
  if (product.name === 'Salmon Skin Crisps') imageSource = require('../../assets/images/salmon_skin.png');

  return (
    <View style={{ width: cardWidth, marginBottom: 16 }}>
      <SketchyBorder variance={2} backgroundColor="#FFFDF6" padding={12}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image 
            source={imageSource} 
            style={{ width: 60, height: 60, marginRight: 16 }} 
            resizeMode="contain" 
          />
          
          <View style={{ flex: 1 }}>
            <Text className="font-black text-lg text-chibi-brown leading-tight mb-1">{product.name}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text className="text-chibi-brown/60 font-bold">RM{product.price}</Text>
              
              <View style={{ width: 60, height: 32 }}>
                <Pressable
                  disabled={!canAfford}
                  onPress={() => {
                    console.log('📦 Budget Box Add Clicked:', product.name);
                    addItem(product, true);
                  }}
                  style={{
                    backgroundColor: canAfford ? 'rgba(249, 214, 216, 0.4)' : '#E5E7EB',
                    paddingHorizontal: 12,
                    paddingVertical: 4,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: '#4A423E',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: canAfford ? 1 : 0.5,
                    width: '100%',
                    height: '100%'
                  }}
                >
                  <Text style={{ fontWeight: '900', fontSize: 14, color: '#4A423E' }}>Add</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </SketchyBorder>
    </View>
  );
};
