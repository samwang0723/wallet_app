import React from 'react';
import { View } from 'react-native';
import Text from '@/components/ui/Text';
import { theme } from '@/themes';

/**
 * DailyLimit component showing the usage bar, limit info, and extra text.
 */
interface DailyLimitProps {
  used: number; // e.g. 5000
  total: number; // e.g. 25000
}

export const DailyLimit: React.FC<DailyLimitProps> = ({ used, total }) => {
  const progressPercent = Math.min((used / total) * 100, 100);
  return (
    <>
      <View
        className="flex-row justify-between items-center bg-cardBackground border-b border-border"
        style={{
          borderColor: theme.colors.border,
          backgroundColor: theme.colors.cardBackground,
        }}
      >
        <Text
          variant="md"
          weight="medium"
          color="secondaryText"
          className="my-3 mx-4"
        >
          Daily Limit
        </Text>
      </View>
      <View className="p-4">
        {/* Usage text e.g. "$5,000 / 25,000 CAD" */}
        <Text variant="base" color="secondaryText" className="mb-2.5">
          ${used.toLocaleString()}/{total.toLocaleString()} CAD
        </Text>

        {/* Progress bar */}
        <View
          className="h-1.5 rounded overflow-hidden mb-1.5"
          style={{ backgroundColor: '#1f283c' }}
        >
          <View
            className="h-1.5"
            style={{
              width: `${progressPercent}%`,
              backgroundColor: theme.colors.transactionStatus,
            }}
          />
        </View>

        {/* Min/Max limit info */}
        <Text variant="base" color="secondaryText" className="mt-1">
          You may withdraw between $100 and $25,000 CAD at a time
        </Text>
      </View>
    </>
  );
};
