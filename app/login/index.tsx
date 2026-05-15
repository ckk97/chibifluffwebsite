import { FontAwesome } from '@expo/vector-icons';
import { useGoogleLogin } from '@react-oauth/google';
import { animate } from 'animejs';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { HeaderSpacer } from '../../components/atoms/HeaderSpacer';
import { SketchyBorder } from '../../components/atoms/SketchyBorder';
import { ScallopedFooter } from '../../components/organisms/ScallopedFooter';
import { ScallopedHeader } from '../../components/organisms/ScallopedHeader';
import { useSmartHeaderScroll } from '../../hooks/useSmartHeaderScroll';
import { useAuthStore } from '../../store/useAuthStore';

const GoogleBouncyButton = ({ title, onPress }: { title: string, onPress: () => void }) => {
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
        <SketchyBorder variance={3} backgroundColor="#FFFFFF" padding={16} doubleLine={false}>
          <View className="flex-row justify-center items-center gap-3">
            <FontAwesome name="google" size={20} color="#DB4437" />
            <Text className="text-chibi-brown font-black text-lg uppercase tracking-wider">{title}</Text>
          </View>
        </SketchyBorder>
      </View>
    </Pressable>
  );
};

export default function LoginScreen() {
  const [googleError, setGoogleError] = useState('');
  const handleScroll = useSmartHeaderScroll();
  const router = useRouter();

  const { login } = useAuthStore();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await fetch('http://localhost:8080/api/auth/google-callback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ idToken: tokenResponse.access_token })
        });

        if (res.ok) {
          const data = await res.json();
          login(data.token, data.user);
          router.replace('/account');
        } else {
          setGoogleError('Google login verification failed.');
        }
      } catch (err) {
        console.warn('Backend unavailable, mocking Google login for UI testing:', err);
        login('mock-google-jwt-token');
        router.replace('/budget-box');
      }
    },
    onError: () => setGoogleError('Google login popup failed.')
  });

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <ScallopedHeader />
      <ScrollView onScroll={handleScroll} scrollEventThrottle={16} contentContainerStyle={styles.scrollContent}>
        <HeaderSpacer />

        <View className="px-6 flex-1 justify-center items-center py-20">
          <View className="w-full max-w-sm">
            <SketchyBorder variance={4} backgroundColor="#FFF" padding={32}>
              <Text className="text-4xl font-black text-chibi-brown mb-8 text-center tracking-tighter">
                Welcome!
              </Text>

              <GoogleBouncyButton title="Continue with Google" onPress={() => handleGoogleLogin()} />

              {googleError ? (
                <View className="mt-4 items-center">
                  <Text className="text-red-500 font-bold text-xs italic">
                    ~ {googleError}
                  </Text>
                </View>
              ) : null}
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
  root: { flex: 1, backgroundColor: '#F9D6D8' },
  scrollContent: { flexGrow: 1 }
});
