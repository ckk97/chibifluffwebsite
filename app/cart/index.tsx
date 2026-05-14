import React, { useRef } from 'react';
import { View, Text, ScrollView, Pressable, Image, Platform, Animated } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { ScallopedHeader } from '../../components/organisms/ScallopedHeader';
import { ScallopedFooter } from '../../components/organisms/ScallopedFooter';
import { SketchyBorder } from '../../components/atoms/SketchyBorder';
import { useBudgetStore } from '../../store/useBudgetStore';
import { useSmartHeaderScroll } from '../../hooks/useSmartHeaderScroll';
import { HeaderSpacer } from '../../components/atoms/HeaderSpacer';
import { Feather } from '@expo/vector-icons';
import { animate } from 'animejs';

export default function CartScreen() {
  const router = useRouter();
  const handleScroll = useSmartHeaderScroll();
  const { budget, cartItems, isSurprise, canCheckout, addItem, removeItem, deleteItem } = useBudgetStore();

  const boxItems = cartItems.filter(item => item.isPartOfBox);
  const standardItems = cartItems.filter(item => !item.isPartOfBox);
  
  // If surprise mode is on, the box total is exactly the budget
  const boxTotal = isSurprise ? budget : boxItems.reduce((acc, item) => acc + (item.basePrice.amount * item.quantity), 0);
  const standardTotal = standardItems.reduce((acc, item) => acc + (item.basePrice.amount * item.quantity), 0);
  const grandTotal = boxTotal + standardTotal;

  const remaining = Math.max(0, budget - boxTotal);
  const progressPercent = Math.min(100, Math.max(0, (boxTotal / Math.max(1, budget)) * 100));
  
  const hasPork = cartItems.some(item => item.isPork);

  const isEmpty = cartItems.length === 0 && !isSurprise;
  const isLocked = !canCheckout;

  const btnAnimObj = useRef({ scale: 1 });
  const btnRef = useRef(null);

  const animateBtn = (direction: 'in' | 'out') => {
    if (isLocked) return;
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

  return (
    <View className="flex-1 bg-chibi-cream">
      <ScallopedHeader />
      
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100, paddingTop: 120 }} onScroll={handleScroll} scrollEventThrottle={16}>
        <View className="max-w-6xl mx-auto w-full px-4 pb-8">
          
          <View className="flex-row items-center mb-8">
            <Feather name="shopping-bag" size={24} color="#6E5C50" className="mr-3" />
            <Text className="font-black text-3xl text-chibi-brown">Your Cart</Text>
          </View>

          {/* 2-Column Layout */}
          <View className="flex-col lg:flex-row gap-8">
            
            {/* Left Column: Items */}
            <View className="flex-[2] flex-col gap-8">
              
              {/* Pork Warning - Driven by API isPork flag */}
              {hasPork && (
                <SketchyBorder variance={2} backgroundColor="#FEF2F2" borderColor="#EF4444" padding={16} className="mb-4">
                  <View className="flex-row items-start">
                    <Feather name="alert-triangle" size={20} color="#DC2626" className="mt-1 mr-3" />
                    <View className="flex-1">
                      <Text className="font-black text-red-600 mb-1">Contains Pork Items</Text>
                      <Text className="font-bold text-red-700/80 leading-tight">
                        Heads up! Your cart includes items from our Pork Series.
                      </Text>
                    </View>
                  </View>
                </SketchyBorder>
              )}

              {/* Section 1: Your Treat Box */}
              {(boxItems.length > 0 || isSurprise) && (
                <View>
                  <View className="flex-row items-center mb-4">
                    <Text className="font-black text-xl text-chibi-brown">🎁 Your Treat Box</Text>
                    {isSurprise && (
                      <View className="ml-3 bg-chibi-pink/20 px-2 py-0.5 rounded border border-chibi-pink/30">
                        <Text className="text-[10px] font-black text-chibi-pink uppercase tracking-widest">Surprise Me</Text>
                      </View>
                    )}
                  </View>
                  
                  {isSurprise ? (
                    <SketchyBorder variance={1} backgroundColor="white" padding={20}>
                      <View className="flex-row items-center">
                         <View className="bg-chibi-pink/10 p-3 rounded-2xl mr-4">
                            <Feather name="gift" size={32} color="#D14D72" />
                         </View>
                         <View className="flex-1">
                            <Text className="font-black text-lg text-chibi-brown">Curated Surprise Selection</Text>
                            <Text className="font-bold text-chibi-brown/50">Customized for your pet's budget</Text>
                         </View>
                         <Text className="font-black text-xl text-chibi-brown">RM {budget.toFixed(2)}</Text>
                      </View>
                    </SketchyBorder>
                  ) : (
                    <View className="gap-4">
                      {boxItems.map((item) => (
                        <CartItemCard 
                          key={`${item.id}-box`} 
                          item={item} 
                          addItem={() => addItem(item, true)} 
                          removeItem={() => removeItem(item.id, true)}
                          deleteItem={() => deleteItem(item.id, true)}
                        />
                      ))}
                    </View>
                  )}
                </View>
              )}

              {/* Section 2: Extra Add-ons */}
              {standardItems.length > 0 && (
                <View>
                  <Text className="font-black text-xl text-chibi-brown mb-4">✨ Extra Add-ons</Text>
                  <View className="gap-4">
                    {standardItems.map((item) => (
                      <CartItemCard 
                        key={`${item.id}-standard`} 
                        item={item} 
                        addItem={() => addItem(item, false)} 
                        removeItem={() => removeItem(item.id, false)}
                        deleteItem={() => deleteItem(item.id, false)}
                      />
                    ))}
                  </View>
                </View>
              )}

              {cartItems.length === 0 && !isSurprise && (
                <View className="py-20 items-center justify-center">
                  <Text className="font-black text-chibi-brown/30 text-2xl">Cart is empty!</Text>
                  <Link href="/treats" asChild>
                    <Pressable className="mt-4 bg-chibi-sage px-6 py-3 rounded-full">
                      <Text className="font-black text-chibi-brown">Browse Treats</Text>
                    </Pressable>
                  </Link>
                </View>
              )}
            </View>

            {/* Right Column: Order Summary */}
            <View className="flex-1 min-w-[300px]">
              <SketchyBorder variance={3} backgroundColor="#FFFDF6" padding={24}>
                <Text className="font-black text-xl text-chibi-brown mb-6">Order Summary</Text>
                
                {/* Progress Area (Only for DIY Box) */}
                {!isSurprise && boxItems.length > 0 && (
                  <View className="bg-white p-4 rounded-2xl border border-chibi-brown/10 mb-6">
                    <View className="flex-row justify-between mb-3">
                      <Text className="font-black text-chibi-brown">Box Completion</Text>
                      <Text className="font-bold text-chibi-brown/60">RM {boxTotal.toFixed(2)} / RM {budget.toFixed(2)}</Text>
                    </View>
                    
                    <View className="h-4 bg-gray-200 rounded-full overflow-hidden mb-3">
                      <View className="bg-chibi-pink h-full" style={{ width: `${progressPercent}%` }} />
                    </View>

                    <Text className="font-black text-center text-sm text-chibi-brown/70">
                      {remaining > 0 ? `RM ${remaining.toFixed(2)} more to complete box!` : 'Box is perfectly full! 🎉'}
                    </Text>
                  </View>
                )}

                {/* Totals Breakdown */}
                <View className="border-b border-dashed border-chibi-brown/20 pb-4 mb-4">
                  {(boxItems.length > 0 || isSurprise) && (
                    <View className="flex-row justify-between mb-2">
                      <Text className="font-bold text-chibi-brown/80">Treat Box</Text>
                      <Text className="font-bold text-chibi-brown">RM {boxTotal.toFixed(2)}</Text>
                    </View>
                  )}
                  {standardItems.length > 0 && (
                    <View className="flex-row justify-between mb-2">
                      <Text className="font-bold text-chibi-brown/80">Add-ons</Text>
                      <Text className="font-bold text-chibi-brown">RM {standardTotal.toFixed(2)}</Text>
                    </View>
                  )}
                  <View className="flex-row justify-between">
                    <Text className="font-bold text-chibi-brown/80">Shipping</Text>
                    <Text className="font-bold italic text-chibi-brown/50">Calculated next</Text>
                  </View>
                </View>

                <View className="flex-row justify-between mb-8">
                  <Text className="font-black text-2xl text-chibi-brown">Total</Text>
                  <Text className="font-black text-2xl text-chibi-brown">RM {grandTotal.toFixed(2)}</Text>
                </View>

                {/* Finalize Order Button - Driven by store canCheckout */}
                <Animated.View ref={btnRef}>
                  <Pressable
                    disabled={isLocked}
                    onPressIn={() => animateBtn('in')}
                    onPressOut={() => animateBtn('out')}
                    className={`py-4 rounded-xl items-center justify-center flex-row ${isLocked ? 'bg-gray-200 opacity-60' : 'bg-chibi-sage shadow-md'}`}
                  >
                    {isLocked && (
                      <View style={{ marginRight: 8 }}>
                        <Feather name="lock" size={16} color="#9CA3AF" />
                      </View>
                    )}
                    <Text className={`font-black text-lg ${isLocked ? 'text-gray-400' : 'text-chibi-brown'}`}>
                      Finalize Order
                    </Text>
                  </Pressable>
                </Animated.View>
                
                {isLocked && !isEmpty && (
                  <Text className="text-center text-xs font-bold text-red-400 mt-3">
                    Box must be exactly RM {budget.toFixed(2)} to checkout.
                  </Text>
                )}

              </SketchyBorder>
            </View>

          </View>

        </View>
        <ScallopedFooter />
      </ScrollView>
    </View>
  );
}

const CartItemCard = ({ item, addItem, removeItem, deleteItem }: { item: any, addItem: () => void, removeItem: () => void, deleteItem: () => void }) => {
  const baseId = item.id.split('-').slice(0, -1).join('-') || item.id;

  let imageSource = item.image || { uri: item.imageUrl };
  if (typeof imageSource === 'string' && imageSource.startsWith('http')) {
    imageSource = { uri: imageSource };
  }

  return (
    <SketchyBorder variance={1} backgroundColor="white" padding={12}>
      <View className="flex-row">
        <Link href={`/treats/${baseId}`} asChild>
          <Pressable className="active:scale-95 transition-transform" style={{ transformOrigin: 'center' }}>
            <View className="bg-chibi-cream/50 p-2 rounded-xl border border-chibi-brown/10 mr-4">
              <Image source={imageSource} style={{ width: 60, height: 60 }} resizeMode="contain" />
            </View>
          </Pressable>
        </Link>

        <View className="flex-1 justify-between py-1">
          <View className="flex-row justify-between items-start">
            <View className="flex-1">
              <Link href={`/treats/${baseId}`} asChild>
                <Pressable className="active:opacity-60">
                  <Text className="font-black text-lg text-chibi-brown mb-1 pr-4">{item.name}</Text>
                </Pressable>
              </Link>
              <View className="bg-chibi-tan/20 self-start px-3 py-1 rounded-lg border border-chibi-brown/10">
                <Text className="font-black text-xs text-chibi-brown/80">100g</Text>
              </View>
            </View>
            
            <Pressable onPress={deleteItem} className="p-2 -mr-2 -mt-2">
              <Feather name="x" size={20} color="#9CA3AF" />
            </Pressable>
          </View>

          <View className="flex-row justify-between items-end mt-4">
            <View className="flex-row items-center bg-chibi-cream rounded-full border border-chibi-brown/20 px-1 py-1">
              <Pressable onPress={removeItem} className="w-8 h-8 items-center justify-center rounded-full bg-white shadow-sm border border-chibi-brown/10">
                <Feather name="minus" size={14} color="#6E5C50" />
              </Pressable>
              <Text className="font-black text-chibi-brown px-4 min-w-[40px] text-center">{item.quantity}</Text>
              <Pressable onPress={addItem} className="w-8 h-8 items-center justify-center rounded-full bg-white shadow-sm border border-chibi-brown/10">
                <Feather name="plus" size={14} color="#6E5C50" />
              </Pressable>
            </View>

            <Text className="font-black text-lg text-chibi-brown">RM {item.lineTotalAmount.toFixed(2)}</Text>
          </View>
        </View>
      </View>
    </SketchyBorder>
  );
};
