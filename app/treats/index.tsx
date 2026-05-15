import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SketchyBorder } from '../../components/atoms/SketchyBorder';
import { ProductCard } from '../../components/molecules/ProductCard';
import { ScallopedHeader } from '../../components/organisms/ScallopedHeader';
import { ScallopedFooter } from '../../components/organisms/ScallopedFooter';
import { StatusBar } from 'expo-status-bar';
import { useRouter, Link } from 'expo-router';
import { useBudgetStore } from '../../store/useBudgetStore';
import { useSmartHeaderScroll } from '../../hooks/useSmartHeaderScroll';

const TREATS_DATA = [
  { id: 'crunchy-chicken-strips', name: "Crunchy Chicken Strips", price: "$12.00", tag: "High Protein", category: "Chicken Series", description: "Pure, single-ingredient chicken breast dehydrated to perfection...", imageColor: "#E8DCC4", image: require('../../assets/images/chibi_pet_3d.png') },
  { id: 'pork-training-bites', name: "Pork Training Bites", price: "$9.50", tag: "No Preservatives", category: "Pork Series", description: "Perfectly sized soft chews for training sessions. Made with real pork...", imageColor: "#F7F2EE", image: require('../../assets/images/beef_jerky.png') },
  { id: 'crispy-duck-feet', name: "Crispy Duck Feet", price: "$15.00", tag: "Grain Free", category: "Duck Series", description: "Great for dental health and joint support. A natural source of glucosamine.", imageColor: "#D3D3D3", image: require('../../assets/images/salmon_skin.png') },
  { id: 'farmyard-mix', name: "Farmyard Mix", price: "$18.50", tag: "Fan Favorite", category: "All", description: "A delightful medley of chicken, duck, and pork bites for the undecided pup.", imageColor: "#E5E1D8", image: require('../../assets/images/process_3d.png') },
  { id: 'sweet-potato-biscuits', name: "Sweet Potato Biscuits", price: "$8.00", tag: "Vegan", category: "All", description: "Vegan friendly, easily digestible, and full of vitamins for a healthy coat.", imageColor: "#DED3C1", image: require('../../assets/images/story_3d.png') },
  { id: 'chicken-hearties', name: "Chicken Hearties", price: "$11.00", tag: "Iron Rich", category: "Chicken Series", description: "Rich in taurine and iron, these crunchy hearts are a nutritional powerhouse.", imageColor: "#F4EBD0", image: require('../../assets/images/chibi_pet_3d.png') },
  { id: 'pork-ear-strips', name: "Pork Ear Strips", price: "$14.00", tag: "Long Lasting", category: "Pork Series", description: "Tough and chewy strips that keep them occupied while cleaning teeth.", imageColor: "#EADDCB", image: require('../../assets/images/beef_jerky.png') },
];

const CATEGORIES = ['All', 'Chicken Series', 'Duck Series', 'Pork Series'];

export default function TreatsListingPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const router = useRouter();
  const { addItem } = useBudgetStore();
  const handleScroll = useSmartHeaderScroll();

  // Animation logic removed for stability

  const filteredTreats = useMemo(() => {
    if (activeCategory === 'All') return TREATS_DATA;
    return TREATS_DATA.filter(item => item.category === activeCategory);
  }, [activeCategory]);

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
        {/* Page Title & Intro */}
        <View className="items-center pb-16 px-10">
           <Text className="text-5xl font-black text-chibi-brown mb-4 tracking-tighter">Delicious Treats</Text>
           <Text className="text-center text-chibi-brown/60 text-xl font-medium max-w-2xl leading-8">
              Handcrafted with love and organic ingredients. Every bite is a tail-wagging adventure.
           </Text>
        </View>

        {/* Custom Budget Box CTA */}
        <View className="px-10 mb-12 items-center">
          <View className="w-full max-w-4xl">
            <Link href="/budget-box" asChild>
              <Pressable className="w-full rotate-1">
                <SketchyBorder variance={4} backgroundColor="#FBC02D" padding={20} className="items-center shadow-sm">
                  <Text className="font-black text-2xl text-chibi-brown text-center leading-9 px-4">
                    ✨ Try our new Custom Budget Box! You name the price, we pack the treats! ✨
                  </Text>
                </SketchyBorder>
              </Pressable>
            </Link>
          </View>
        </View>

        {/* Filter Bar - CLICKABLE BUG FIX */}
        <View className="flex-row justify-center gap-4 mb-16 px-10">
          {CATEGORIES.map((category) => (
            <Pressable 
              key={category} 
              onPress={() => setActiveCategory(category)}
              className="active:scale-95 transition-transform"
            >
               <SketchyBorder 
                variance={2} 
                padding={10} 
                backgroundColor={activeCategory === category ? "#F9D6D8" : "white"}
                doubleLine={false}
                borderColor={activeCategory === category ? "#4A423E" : "#D2B48C"}
               >
                  <Text 
                    className={`font-black px-4 uppercase text-xs tracking-widest ${
                      activeCategory === category ? 'text-chibi-brown' : 'text-chibi-brown/40'
                    }`}
                  >
                    {category}
                  </Text>
               </SketchyBorder>
            </Pressable>
          ))}
        </View>

        {/* Product Grid */}
        <View className="px-14 flex-row flex-wrap gap-x-10 gap-y-12 justify-center">
           {filteredTreats.map((item) => (
             <View key={item.id} className="w-full md:w-[30%] min-w-[320px]">
                <ProductCard 
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  tag={item.tag}
                  imageColor={item.imageColor}
                  image={item.image}
                  onAdd={() => addItem({
                    id: item.id.toString(),
                    name: item.name,
                    price: parseFloat(item.price.replace('$', '')),
                    tags: [item.tag],
                    image: item.image
                  }, false)}
                  onPress={() => router.push(`/treats/${item.id}`)}
                />
             </View>
           ))}
           
           {filteredTreats.length === 0 && (
             <View className="py-20 items-center">
                <Text className="text-2xl font-black text-chibi-brown/20 italic">No treats in this series yet! 🐾</Text>
             </View>
           )}
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
