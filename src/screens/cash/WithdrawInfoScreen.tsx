import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  LayoutChangeEvent,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/cash/Button/Button';
import { styles } from './styles';
import { Header } from '@/components/cash/Header/Header';
import { COLORS, SPACING } from '@/styles/theme';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/types';
import { parseLinkInText } from '@/utils';

// We’ll define the steps up front:
const steps = [
  {
    id: 'activate',
    title: 'Activate',
    description:
      "For bank accounts used for the first time, you are required to make a deposit from it first before it's enabled for withdrawals.",
    iconName: 'home-outline',
    iconColor: COLORS.text,
  },
  {
    id: 'request',
    title: 'Request',
    description:
      'Submit a request to withdraw USD via SWIFT from your cash account.',
    iconName: 'document-text-outline',
    iconColor: COLORS.text,
  },
  {
    id: 'review',
    title: 'Wait for our review',
    description:
      'Most withdrawals process within minutes, and we will notify you once your request has been approved. In some cases, such as your first withdrawal, a manual review of 1 to 3 days may be required.',
    iconName: 'time-outline',
    iconColor: COLORS.text,
  },
  {
    id: 'receive',
    title: 'Receive funds in bank account',
    description:
      'Withdrawal via SWIFT typically arrives in your bank account in 1-5 business days. Your bank may charge additional processing fee to receive SWIFT transactions.',
    iconName: 'checkmark-circle',
    // A green icon for the final step
    iconColor: COLORS.transactionStatus,
  },
];

export const WithdrawInfoScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const handleClick = () => {
    navigation.goBack();
  };
  const validIconNames = [
    'home-outline',
    'document-text-outline',
    'time-outline',
    'checkmark-circle', // Add all other valid icon names here
  ] as const;
  const helpText =
    'To learn more, visit our (Help Center)https://help.crypto.com';

  type IconName = (typeof validIconNames)[number];

  const isValidIconName = (name: string): name is IconName => {
    return validIconNames.includes(name as IconName);
  };

  const [partHeights, setPartHeights] = useState<number[]>([]);

  const handlePartLayout = (index: number) => (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setPartHeights((prevHeights) => {
      const newHeights = [...prevHeights];
      newHeights[index] = height - 10;
      return newHeights;
    });
  };

  useEffect(() => {
    // This effect will run after the component has been rendered
    // and partHeights state has been updated
  }, [partHeights]);
  return (
    <SafeAreaView style={styles.container}>
      {/* Title at top */}
      <Header title="Withdraw CAD" />

      {/* Large heading */}
      <Text style={styles.mainHeading}>Withdraw USD to your bank account</Text>

      {/* Steps list */}
      <ScrollView
        style={styles.stepsContainer}
        contentContainerStyle={{ padding: SPACING.md }} // Space above the button
        showsVerticalScrollIndicator={false}
      >
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          return (
            <View key={step.id} style={styles.stepRow}>
              {/* Left icon & vertical line (for first 3 steps) */}
              <View style={styles.iconContainer}>
                {isValidIconName(step.iconName) ? (
                  <Ionicons
                    name={step.iconName as IconName}
                    size={20}
                    color={step.iconColor}
                  />
                ) : (
                  <Text>Invalid icon name</Text>
                )}
                {/* Vertical connector line except for the last step */}
                {!isLast && (
                  <View
                    style={[
                      styles.verticalLine,
                      { height: partHeights[index] || 0 },
                    ]}
                  />
                )}
              </View>

              {/* Text content (title + description) */}
              <View style={styles.textContainer}>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text
                  style={styles.stepDescription}
                  onLayout={handlePartLayout(index)}
                >
                  {step.description}
                </Text>
              </View>
            </View>
          );
        })}

        {/* Footer info text */}
        {/* Wrap Text inside a View with flex: 1 */}
        <View style={{ flex: 1 }}>
          <Text style={styles.footerText}>
            {parseLinkInText(helpText).map((part, idx) => {
              if (part.type === 'text') {
                return part.text; // Return plain text directly
              } else if (part.type === 'link' && part.text && part.url) {
                return (
                  <Text
                    key={idx}
                    style={{ color: COLORS.primary }}
                    onPress={() => Linking.openURL(part.url)}
                  >
                    {part.text}
                  </Text>
                );
              }
              return null;
            })}
          </Text>
        </View>
      </ScrollView>

      {/* Fixed bottom button */}
      <View style={styles.bottomButton}>
        <Button onPress={handleClick} text="Got It" />
      </View>
    </SafeAreaView>
  );
};
