/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useCallback } from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  SafeAreaView,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import Text from '@/components/ui/Text';
import { theme } from '@/themes';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/navigation/types';
import { Header } from '@/components/cash/Header/Header';

type OccupationListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'OccupationList'
>;

type OccupationListScreenRouteProp = RouteProp<
  RootStackParamList,
  'OccupationList'
>;

type OccupationListScreenProps = {
  navigation: OccupationListScreenNavigationProp;
  route: OccupationListScreenRouteProp;
};

// Create a callback ref to store the occupation selection callback
let occupationCallback: ((occupation: string) => void) | null = null;

export const setOccupationCallback = (
  callback: (occupation: string) => void
) => {
  occupationCallback = callback;
};

const occupations = [
  'Clergy',
  'Community Service Social Worker',
  'Creative Animator',
  'Creative Designer',
  'Creative Director',
  'Creative Writer Artist',
  'Creative Performer',
  'Driver Bus',
  'Driver Cab Limo',
  'Driver Construction',
  'Driver Delivery',
  // Add more occupations as needed
];

export const OccupationListScreen: React.FC<OccupationListScreenProps> = ({
  navigation,
  route,
}) => {
  const { currentValue } = route.params;
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredOccupations, setFilteredOccupations] = useState(occupations);

  const handleSearch = useCallback((text: string) => {
    setSearchQuery(text);
    const filtered = occupations.filter((occupation) =>
      occupation.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredOccupations(filtered);
  }, []);

  const handleSelect = (occupation: string) => {
    if (occupationCallback) {
      occupationCallback(occupation);
    }
    navigation.goBack();
  };

  const renderItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      className="px-4 py-5 border-b"
      style={{
        backgroundColor:
          item === currentValue ? theme.colors.cardBackground : undefined,
        borderColor: theme.colors.border,
      }}
      onPress={() => handleSelect(item)}
      testID={`occupation-item-${item}`}
    >
      <Text variant="md" color="text">
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: theme.colors.background }}
    >
      {/* Header */}
      <Header title="Occupation" showBackButton />
      {/* Search Bar */}
      <View className="px-4 pb-4">
        <View
          className="flex-row items-center rounded-lg px-4 border"
          style={{
            backgroundColor: theme.colors.cardBackground,
            borderColor: theme.colors.border,
          }}
        >
          <Text variant="lg" color="secondaryText" className="mr-2">
            🔍
          </Text>
          <TextInput
            value={searchQuery}
            onChangeText={handleSearch}
            placeholder="Search"
            placeholderTextColor={theme.colors.secondaryText}
            className="flex-1 py-4"
            style={{
              fontSize: 16,
              color: theme.colors.text,
            }}
            testID="occupation-search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => handleSearch('')}
              testID="clear-search"
            >
              <Text color="secondaryText" variant="xxl">
                ×
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Occupation List */}
      <FlatList
        data={filteredOccupations}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        testID="occupation-list"
        className="px-4"
      />
    </SafeAreaView>
  );
};
