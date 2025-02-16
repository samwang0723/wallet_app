/* eslint-disable  @typescript-eslint/no-explicit-any */
import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { RootStackParamList } from '@/navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/cash/Header/Header';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/themes';
import Text from '@/components/ui/Text';

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
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: theme.colors.background }}
    >
      <Header title="Choose Deposit Method" showBackButton />
      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        {/* Payment Network List */}
        {paymentNetworks.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => {
              navigation.navigate('Deposit');
            }}
          >
            <View className="mb-4">
              {/* Icon and Title Row */}
              <View className="flex-row items-center mb-2">
                <Ionicons
                  name={item.iconName as any}
                  size={22}
                  color={theme.colors.text}
                />
                <Text
                  variant="lg"
                  weight="semibold"
                  color="text"
                  className="ml-3"
                >
                  {item.title}
                </Text>
              </View>

              {/* Description and Badge */}
              <View>
                <Text variant="md" color="secondaryText" className="mb-2">
                  {item.description}
                </Text>
                {item.recommended && (
                  <View
                    className="self-start rounded px-2 py-1"
                    style={{
                      backgroundColor: theme.colors.actionButtonBackground,
                    }}
                  >
                    <Text variant="md" color="primary">
                      Recommended
                    </Text>
                  </View>
                )}
              </View>
            </View>
            <View
              className="h-px mb-4"
              style={{ backgroundColor: theme.colors.border }}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
