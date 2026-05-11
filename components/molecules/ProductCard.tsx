import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { SketchyBorder } from '../atoms/SketchyBorder';

interface ProductCardProps {
  name: string;
  description: string;
  price: string;
  tag?: string;
  imageColor?: string;
  image?: any;
  onAdd?: () => void;
  onPress?: () => void;
}

/**
 * ProductCard Molecule - Refined for maximum stability.
 */
export const ProductCard: React.FC<ProductCardProps> = ({
  name,
  description,
  price,
  tag,
  imageColor = "#F7F2EE",
  image,
  onAdd,
  onPress
}) => {
  return (
    <View className="flex-1 min-w-[300px] mb-8 rotate-[0.5deg]">
      <SketchyBorder variance={5} backgroundColor="white" padding={16} className="shadow-lg">
        <Pressable onPress={onPress} className="active:opacity-80">
          {/* Product Image */}
          <View 
            className="aspect-[4/3] rounded-2xl mb-6 relative overflow-hidden shadow-inner items-center justify-center"
            style={{ backgroundColor: imageColor }}
          >
            {image ? (
              <Image 
                source={typeof image === 'string' ? { uri: image } : image} 
                className="w-full h-full"
                resizeMode="cover"
              />
            ) : (
              <View className="items-center justify-center opacity-10">
                <Text className="text-4xl font-black">🐾</Text>
              </View>
            )}
            
            {tag && (
              <View className="absolute top-4 right-4 bg-chibi-sage px-4 py-1 rounded-full border border-chibi-brown/20 shadow-sm">
                  <Text className="text-[10px] font-black text-chibi-brown/60 uppercase tracking-tighter">{tag}</Text>
              </View>
            )}
          </View>

          {/* Product Info */}
          <Text className="font-black text-2xl text-chibi-brown mb-3 leading-tight">{name}</Text>
          <Text className="text-chibi-brown/60 mb-8 text-lg font-medium leading-6 min-h-[48px]">
            {description}
          </Text>
        </Pressable>

        {/* Divider */}
        <View className="w-full h-[1px] bg-chibi-brown/10 mb-6 border-dashed" />

        {/* Price and Cart */}
        <View className="flex-row justify-between items-center">
          <Text className="font-black text-3xl text-chibi-brown tracking-tighter">{price}</Text>
          <Pressable 
            onPress={(e) => {
              e.stopPropagation();
              onAdd?.();
            }} 
            className="w-14 h-14 bg-chibi-pink/40 rounded-2xl border-2 border-chibi-brown items-center justify-center shadow-sm active:scale-90 transition-transform"
          >
            <Text className="text-2xl">🧺</Text>
          </Pressable>
        </View>
      </SketchyBorder>
    </View>
  );
};
