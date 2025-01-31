import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

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
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>Daily Limit</Text>
      </View>
      <View style={styles.dailyLimitContainer}>
        {/* Usage text e.g. "$5,000 / 25,000 CAD" */}
        <Text style={styles.limitText}>
          ${used.toLocaleString()}/{total.toLocaleString()} CAD
        </Text>

        {/* Progress bar */}
        <View style={styles.progressBarBackground}>
          <View
            style={[styles.progressBarFill, { width: `${progressPercent}%` }]}
          />
        </View>

        {/* Min/Max limit info */}
        <Text style={styles.limitNote}>
          You may withdraw between $100 and $25,000 CAD at a time
        </Text>
      </View>
    </>
  );
};
