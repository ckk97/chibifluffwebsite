import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { animate } from 'animejs';
import { ScallopedHeader } from '../../components/organisms/ScallopedHeader';
import { ScallopedFooter } from '../../components/organisms/ScallopedFooter';
import { HeaderSpacer } from '../../components/atoms/HeaderSpacer';
import { SketchyBorder } from '../../components/atoms/SketchyBorder';
import { useAuthStore } from '../../store/useAuthStore';
import { useSmartHeaderScroll } from '../../hooks/useSmartHeaderScroll';

const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const getPasswordStrength = (password: string) => {
  if (password.length === 0) return 0;
  if (password.length < 6) return 1; 
  if (password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) {
    return 3; 
  }
  return 2;
};

const PasswordStrengthIndicator = ({ strength }: { strength: number }) => {
  const levels = [
    { color: '#B5A49D', label: '' }, 
    { color: '#FBC02D', label: 'Weak' }, 
    { color: '#D4E3A9', label: 'Medium' }, 
    { color: '#4A423E', label: 'Strong!' }, 
  ];

  if (strength === 0) return null;

  return (
    <View className="mt-2 flex-row items-center gap-2">
      <View className="flex-row gap-1">
        {[1, 2, 3].map((i) => (
          <Text 
            key={i} 
            style={{ 
              fontSize: 14, 
              opacity: i <= strength ? 1 : 0.2,
              color: i <= strength ? levels[strength].color : '#B5A49D'
            }}
          >
            🐾
          </Text>
        ))}
      </View>
      <Text style={{ color: levels[strength].color }} className="text-[10px] font-black uppercase tracking-widest">
        {levels[strength].label}
      </Text>
    </View>
  );
};

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

export default function LoginScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const handleScroll = useSmartHeaderScroll();
  const router = useRouter();
  
  const { login, setRegistrationEmail } = useAuthStore();
  const strength = getPasswordStrength(password);

  const handleSubmit = () => {
    if (!validateEmail(email)) {
      setEmailError('Oops! That email looks a bit wonky.');
      return;
    }
    setEmailError('');

    if (isLogin) {
      // Mock Login
      login('mock-jwt-token-123');
      router.replace('/');
    } else {
      // Mock Register
      setRegistrationEmail(email);
      router.push('/verify');
    }
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
              <Text className="text-4xl font-black text-chibi-brown mb-8 text-center tracking-tighter">
                {isLogin ? 'Welcome Back!' : 'Join the Pack!'}
              </Text>
              
              <View className="gap-6 mb-8">
                <View>
                  <SketchyBorder variance={2} padding={4} doubleLine={false}>
                    <TextInput 
                      className="w-full px-4 py-3 font-medium text-chibi-brown text-lg outline-none"
                      placeholder="Email Address"
                      placeholderTextColor="#B5A49D"
                      value={email}
                      onChangeText={(val) => {
                        setEmail(val);
                        if (emailError) setEmailError('');
                      }}
                      autoCapitalize="none"
                      keyboardType="email-address"
                    />
                  </SketchyBorder>
                  {emailError ? (
                    <View className="mt-1 ml-2">
                      <Text className="text-red-500 font-bold text-xs italic">
                        ~ {emailError}
                      </Text>
                    </View>
                  ) : null}
                </View>
                
                <View>
                  <SketchyBorder variance={2} padding={4} doubleLine={false}>
                    <TextInput 
                      className="w-full px-4 py-3 font-medium text-chibi-brown text-lg outline-none"
                      placeholder="Password"
                      placeholderTextColor="#B5A49D"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry
                    />
                  </SketchyBorder>
                  {!isLogin && <PasswordStrengthIndicator strength={strength} />}
                </View>
              </View>

              <BouncyButton title={isLogin ? "Log In" : "Create Account"} onPress={handleSubmit} />
              
              <Pressable className="mt-8 items-center" onPress={() => setIsLogin(!isLogin)}>
                <Text className="text-chibi-brown/70 font-bold text-sm">
                  {isLogin ? "New here? Create an Account" : "Already have an account? Log In"}
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
  root: { flex: 1, backgroundColor: '#F9D6D8' },
  scrollContent: { flexGrow: 1 }
});
