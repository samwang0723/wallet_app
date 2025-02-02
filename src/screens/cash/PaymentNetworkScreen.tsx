import React from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { RootStackParamList } from '@/navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/cash/Header/Header';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '@/styles/theme';

type PaymentNetworkScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'PaymentNetwork'
>;

type PaymentNetworkScreenRouteProp = RouteProp<
  RootStackParamList,
  'PaymentNetwork'
>;

type PaymentNetworkScreenProps = {
  navigation: PaymentNetworkScreenNavigationProp;
  route: PaymentNetworkScreenRouteProp;
};

export const PaymentNetworkScreen: React.FC<PaymentNetworkScreenProps> = ({
  route,
}) => {
  const { paymentNetworks } = route.params;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Choose Deposit Method" showBackButton />
      <ScrollView
        style={styles.content}
        contentContainerStyle={{ padding: SPACING.md }}
        showsVerticalScrollIndicator={false}
      >
        {/* Transaction List */}
        {paymentNetworks.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => { navigation.navigate('Deposit'); }}
          >
            <View style={styles.textContainer}>
              {/* Icon on the left */}
              <View style={styles.methodContainer}>
                <Ionicons
                  name={item.iconName as any}
                  size={22}
                  color={COLORS.text}
                />
                <Text style={styles.methodTitle}>{item.title}</Text>
              </View>

              {/* Text content */}
              <View style={styles.textContainer}>
                {/* Description */}
                <Text style={styles.methodDescription}>{item.description}</Text>
                {item.recommended && (
                  <View style={styles.recommendedBadge}>
                    <Text style={styles.recommendedText}>Recommended</Text>
                  </View>
                )}
              </View>
            </View>
            <View style={styles.separator} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
