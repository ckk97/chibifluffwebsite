import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import { animate } from 'animejs';
import { ScallopedHeader } from '../../components/organisms/ScallopedHeader';
import { ScallopedFooter } from '../../components/organisms/ScallopedFooter';
import { HeaderSpacer } from '../../components/atoms/HeaderSpacer';
import { SketchyBorder } from '../../components/atoms/SketchyBorder';
import { useAuthStore } from '../../store/useAuthStore';
import { useSmartHeaderScroll } from '../../hooks/useSmartHeaderScroll';

const BouncyButton = ({ title, onPress }: { title: string, onPress: () => void }) => {
  const btnRef = useRef<View>(null);

  const handlePressIn = () => {
    const obj = { scale: 1 };
    animate(obj, {
      scale: 0.95,
      duration: 100,
      easing: 'easeOutQuad',
      update: () => {
        const node = btnRef.current as any;
        if (!node) return;
        if (node.setNativeProps) {
          node.setNativeProps({ style: { transform: [{ scale: obj.scale }] } });
        }
        const webStyle = node.style || (node.target && node.target.style);
        if (webStyle) webStyle.transform = `scale(${obj.scale})`;
      }
    });
  };

  const handlePressOut = () => {
    const obj = { scale: 0.95 };
    animate(obj, {
      scale: 1,
      duration: 400,
      easing: 'easeOutElastic(1, .5)',
      update: () => {
        const node = btnRef.current as any;
        if (!node) return;
        if (node.setNativeProps) {
          node.setNativeProps({ style: { transform: [{ scale: obj.scale }] } });
        }
        const webStyle = node.style || (node.target && node.target.style);
        if (webStyle) webStyle.transform = `scale(${obj.scale})`;
      }
    });
  };

  return (
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={onPress}>
      <View ref={btnRef}>
        <SketchyBorder variance={3} backgroundColor="#4A423E" padding={16} doubleLine={false}>
          <Text className="text-white text-center font-black text-lg uppercase tracking-wider">{title}</Text>
        </SketchyBorder>
      </View>
    </Pressable>
  );
};

export default function VerifyScreen() {
  const [code, setCode] = useState('');
  const handleScroll = useSmartHeaderScroll();
  const router = useRouter();
  const { registrationEmail, login, clearRegistration } = useAuthStore();

  const handleVerify = () => {
    // Mock successful verification
    login('mock-jwt-token-123');
    clearRegistration();
    router.replace('/');
  };

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <ScallopedHeader />
      <ScrollView onScroll={handleScroll} scrollEventThrottle={16} contentContainerStyle={styles.scrollContent}>
        <HeaderSpacer />
        
        <View className="px-6 flex-1 justify-center items-center py-20">
          <View className="w-full max-w-sm">
            <SketchyBorder variance={4} backgroundColor="#FFF" padding={32}>
              <View className="items-center mb-6">
                <SketchyBorder variance={2} padding={16} backgroundColor="#F9D6D8" doubleLine={false}>
                  <Feather name="mail" size={48} color="#4A423E" />
                </SketchyBorder>
              </View>

              <Text className="text-3xl font-black text-chibi-brown mb-2 text-center tracking-tighter">
                Check Your Mail
              </Text>
              <Text className="text-center text-chibi-brown/70 font-medium mb-8 leading-6">
                We've sent a 6-digit code to{'\n'}
                <Text className="font-bold text-chibi-brown">{registrationEmail || "your email"}</Text>
              </Text>
              
              <View className="mb-8">
                <SketchyBorder variance={2} padding={4} doubleLine={false}>
                  <TextInput 
                    className="w-full px-4 py-4 font-black text-center text-chibi-brown text-3xl tracking-[16px] outline-none"
                    placeholder="------"
                    placeholderTextColor="#B5A49D"
                    value={code}
                    onChangeText={setCode}
                    keyboardType="number-pad"
                    maxLength={6}
                  />
                </SketchyBorder>
              </View>

              <BouncyButton title="Verify Code" onPress={handleVerify} />
              
              <Pressable className="mt-8 items-center" onPress={() => router.replace('/login')}>
                <Text className="text-chibi-brown/70 font-bold text-sm">
                  Back to Login
                </Text>
              </Pressable>
            </SketchyBorder>
          </View>
        </View>

        <View className="h-40" />
        <ScallopedFooter />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F9D6D8' }, // matches chibi-pink
  scrollContent: { flexGrow: 1 }
});
