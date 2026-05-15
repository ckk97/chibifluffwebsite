import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, Pressable, StyleSheet, Image, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SketchyBorder } from '../../components/atoms/SketchyBorder';
import { ScallopedHeader } from '../../components/organisms/ScallopedHeader';
import { ScallopedFooter } from '../../components/organisms/ScallopedFooter';
import { useUserStore } from '../../store/useUserStore';
import { useAuthStore } from '../../store/useAuthStore';
import { StatusBar } from 'expo-status-bar';

/**
 * AccountPage - Implements real client-side image uploads using expo-image-picker.
 */
export default function AccountPage() {
  const { 
    fullName, email, phone, avatar, pets, isLoading, fetchProfile,
    setFullName, setEmail, setPhone, setAvatar, addPet, removePet, updatePetImage 
  } = useUserStore();
  const authUser = useAuthStore((s) => s.user);

  // Prefer locally-picked avatar > Google profile picture > null
  const displayAvatar = avatar || authUser?.profilePicture || null;

  useEffect(() => {
    fetchProfile();
  }, []);

  
  const [newPetName, setNewPetName] = useState('');
  const [newPetDate, setNewPetDate] = useState('');
  const [newPetImage, setNewPetImage] = useState<string | null>(null);

  const pickImage = async (target: 'user' | 'newPet' | string) => {
    // Request permission (needed for mobile, usually automatic on web)
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      if (target === 'user') {
        setAvatar(uri);
      } else if (target === 'newPet') {
        setNewPetImage(uri);
      } else {
        updatePetImage(target, uri);
      }
    }
  };

  const handleAddPet = () => {
    if (newPetName && newPetDate) {
      addPet({ 
        name: newPetName, 
        birthday: newPetDate, 
        icon: newPetImage || '🐾' 
      });
      setNewPetName('');
      setNewPetDate('');
      setNewPetImage(null);
    }
  };

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <ScallopedHeader />
      
      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#4A423E" />
          <Text className="mt-4 text-chibi-brown font-bold">Loading your profile...</Text>
        </View>
      ) : (
        <ScrollView 
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header Section */}

        <View className="items-center py-16 px-10">
           <Pressable onPress={() => pickImage('user')} className="relative mb-8 active:scale-95 transition-transform">
              <View className="w-32 h-32 rounded-full border-2 border-chibi-brown border-dashed items-center justify-center bg-white shadow-sm overflow-hidden">
               {displayAvatar ? (
                   <Image source={{ uri: displayAvatar }} className="w-full h-full" />
                 ) : (
                   <Text className="text-6xl">👩‍🎨</Text>
                 )}
              </View>
              <View className="absolute bottom-0 right-0 w-10 h-10 bg-[#4A423E] rounded-full items-center justify-center border-2 border-white shadow-lg">
                 <Text className="text-white text-xs font-black">✎</Text>
              </View>
           </Pressable>
           <Text className="text-5xl font-black text-chibi-brown mb-4 tracking-tighter text-center">Hello, {fullName ? fullName.split(' ')[0] : 'Human'}!</Text>
           <Text className="text-center text-chibi-brown/60 text-xl font-medium max-w-xl leading-8">
              Manage your details and keep your furry friends' information up to date for special treat deliveries!
           </Text>
        </View>

        {/* Two-Column Grid */}
        <View className="px-10 flex-row gap-10 items-start mb-20">
           
           {/* LEFT COLUMN: Your Account */}
           <View className="flex-1">
              <SketchyBorder variance={2} backgroundColor="#F7F2EE" padding={32} borderColor="#4A423E" strokeWidth={2}>
                 <View className="flex-row items-center gap-3 mb-8">
                    <Text className="text-3xl">🪪</Text>
                    <Text className="text-3xl font-black text-chibi-brown tracking-tighter uppercase">Your Account</Text>
                 </View>
                 <View className="w-full h-[1px] bg-chibi-brown/10 mb-8 border-dashed border" />

                 {/* Form Fields */}
                 <View className="gap-6 mb-10">
                    <View>
                       <Text className="text-[10px] font-black text-chibi-brown/50 uppercase mb-3 ml-2 tracking-widest">Full Name</Text>
                       <TextInput 
                          value={fullName}
                          onChangeText={setFullName}
                          className="bg-[#FAF9F6] border-2 border-chibi-brown/10 rounded-2xl p-5 text-lg font-bold text-chibi-brown shadow-sm"
                       />
                    </View>
                    <View>
                       <Text className="text-[10px] font-black text-chibi-brown/50 uppercase mb-3 ml-2 tracking-widest">Email Address</Text>
                       <TextInput 
                          value={email}
                          onChangeText={setEmail}
                          className="bg-[#FAF9F6] border-2 border-chibi-brown/10 rounded-2xl p-5 text-lg font-bold text-chibi-brown shadow-sm"
                       />
                    </View>
                    <View>
                       <Text className="text-[10px] font-black text-chibi-brown/50 uppercase mb-3 ml-2 tracking-widest">Phone Number</Text>
                       <TextInput 
                          value={phone}
                          onChangeText={setPhone}
                          className="bg-[#FAF9F6] border-2 border-chibi-brown/10 rounded-2xl p-5 text-lg font-bold text-chibi-brown shadow-sm"
                       />
                    </View>
                 </View>

                 <Pressable className="self-start active:scale-95 transition-transform">
                    <SketchyBorder variance={1} padding={14} backgroundColor="#F9D6D8" doubleLine={false} borderColor="#4A423E">
                       <View className="flex-row items-center gap-2 px-6">
                          <Text className="text-sm font-black text-chibi-brown uppercase tracking-tighter">Save Changes</Text>
                       </View>
                    </SketchyBorder>
                 </Pressable>
              </SketchyBorder>
           </View>

           {/* RIGHT COLUMN: Your Furry Friends */}
           <View className="flex-[1.2]">
              <SketchyBorder variance={3} backgroundColor="#FDF2F4" padding={32} borderColor="#4A423E" strokeWidth={2}>
                 <View className="flex-row justify-between items-center mb-8">
                    <View className="flex-row items-center gap-3">
                       <Text className="text-3xl">🐰</Text>
                       <Text className="text-3xl font-black text-chibi-brown tracking-tighter uppercase">Your Furry Friends</Text>
                    </View>
                    <View className="bg-white px-3 py-1 rounded-full border border-chibi-brown/20 border-dashed">
                       <Text className="text-[10px] font-black text-chibi-brown/40 uppercase">{pets.length} Pets</Text>
                    </View>
                 </View>
                 <View className="w-full h-[1px] bg-chibi-brown/10 mb-8 border-dashed border" />

                 {/* Pet List */}
                 <View className="gap-4 mb-10">
                    {pets.map((pet) => (
                      <View key={pet.id} className="bg-white rounded-3xl border-2 border-chibi-brown/10 p-5 flex-row justify-between items-center shadow-sm">
                         <View className="flex-row items-center gap-5">
                            <Pressable 
                               onPress={() => pickImage(pet.id)}
                               className="w-16 h-16 bg-chibi-pink/10 rounded-full items-center justify-center border border-chibi-brown/10 active:scale-90 overflow-hidden shadow-inner"
                            >
                               {pet.icon.startsWith('http') || pet.icon.startsWith('/') || pet.icon.startsWith('data:') ? (
                                 <Image source={{ uri: pet.icon }} className="w-full h-full" />
                               ) : (
                                 <Text className="text-3xl">{pet.icon}</Text>
                               )}
                            </Pressable>
                            <View>
                               <Text className="text-2xl font-black text-chibi-brown tracking-tighter">{pet.name}</Text>
                               <Text className="text-chibi-brown/50 font-bold text-xs uppercase">🎂 Born: {pet.birthday}</Text>
                            </View>
                         </View>
                         <View className="flex-row gap-2">
                            <Pressable className="w-10 h-10 bg-white rounded-xl border border-chibi-brown/10 items-center justify-center active:scale-90 shadow-sm">
                               <Text className="text-xs">✎</Text>
                            </Pressable>
                            <Pressable 
                               onPress={() => removePet(pet.id)}
                               className="w-10 h-10 bg-[#F9D6D8] rounded-xl border border-chibi-brown/10 items-center justify-center active:scale-90 shadow-sm"
                            >
                               <Text className="text-xs">🗑️</Text>
                            </Pressable>
                         </View>
                      </View>
                    ))}
                 </View>

                 {/* Add Pet Form */}
                 <View className="p-8 border-2 border-chibi-brown/10 rounded-3xl border-dashed bg-white/40">
                    <View className="flex-row items-center gap-2 mb-6">
                       <Text className="text-2xl">⊕</Text>
                       <Text className="text-xl font-black text-chibi-brown uppercase tracking-tighter">Add a New Friend</Text>
                    </View>
                    <View className="flex-row gap-6 mb-8">
                       <Pressable 
                         onPress={() => pickImage('newPet')}
                         className="w-20 h-20 bg-white rounded-2xl border-2 border-chibi-brown/10 items-center justify-center active:scale-95 shadow-sm overflow-hidden"
                       >
                          {newPetImage ? (
                            <Image source={{ uri: newPetImage }} className="w-full h-full" />
                          ) : (
                            <View className="items-center">
                              <Text className="text-2xl">📸</Text>
                              <Text className="text-[8px] font-black text-chibi-brown/40 uppercase mt-1">Upload</Text>
                            </View>
                          )}
                       </Pressable>
                       <View className="flex-1 gap-4">
                          <View>
                             <Text className="text-[10px] font-black text-chibi-brown/40 uppercase mb-2 ml-1 tracking-widest">Pet Name</Text>
                             <TextInput 
                                value={newPetName}
                                onChangeText={setNewPetName}
                                placeholder="e.g. Barnaby"
                                className="bg-white rounded-xl border-2 border-chibi-brown/5 p-4 text-sm font-bold text-chibi-brown shadow-inner"
                             />
                          </View>
                          <View>
                             <Text className="text-[10px] font-black text-chibi-brown/40 uppercase mb-2 ml-1 tracking-widest">Pet Birthday</Text>
                             <TextInput 
                                value={newPetDate}
                                onChangeText={setNewPetDate}
                                placeholder="May 12, 2020"
                                className="bg-white rounded-xl border-2 border-chibi-brown/5 p-4 text-sm font-bold text-chibi-brown shadow-inner"
                             />
                          </View>
                       </View>
                    </View>

                    <Pressable onPress={handleAddPet} className="active:scale-95 transition-transform">
                       <SketchyBorder variance={1} padding={16} backgroundColor="#FBE8E1" doubleLine={false} borderColor="#4A423E">
                          <View className="flex-row items-center justify-center gap-3">
                             <Text className="text-xl">🐾</Text>
                             <Text className="text-sm font-black text-chibi-brown uppercase tracking-tighter">Add Pet to Family</Text>
                          </View>
                       </SketchyBorder>
                    </Pressable>
                 </View>
              </SketchyBorder>
           </View>
        </View>

        <ScallopedFooter />

      </ScrollView>
      )}
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
    paddingBottom: 40,
  },
});
