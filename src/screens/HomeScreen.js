import React, { useState, useRef } from 'react';
import { View, Animated, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/templates/Header';
import FamilyList from '../components/organisms/FamilyList';
import CalendarDatepicker from '../components/molecules/CalendarDatepicker';
import WeekDays from '../components/organisms/WeekDays';
import TimeBlockList from '../components/organisms/TimeBlockList';
import DailySchedule from '../components/organisms/DailySchedule';
import MockTasks from '../datas/MockTasks';
import Profiles from '../datas/Profiles';
import FloatingButton from '../components/atoms/FloatingButton';
import moment from 'moment';
import 'moment/locale/ko';
import colors from '../styles/colors';

moment.locale('ko');

const HomeScreen = () => {
  const scrollY = useRef(new Animated.Value(0)).current;

  // 주 상태 관리
  const [currentWeek, setCurrentWeek] = useState(moment().startOf('week')); // 현재 주의 시작일
  const [viewMode, setViewMode] = useState('week'); // 'week' 또는 'day' 상태 관리

  const weekDates = Array.from({ length: 7 }, (_, i) =>
    currentWeek.clone().add(i, 'days')
  );

  const familyListHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [100, 0],
    extrapolate: 'clamp',
  });

  const familyListOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.primary001 }}>
      <Header />

      <Animated.View
        style={[
          styles.familyListContainer,
          { height: familyListHeight, opacity: familyListOpacity },
        ]}
      >
        <FamilyList Profiles={Profiles} />
      </Animated.View>

      {/* CalendarDatepicker + Weekdays 컴포넌트 */}
      <View style={styles.datePickerContainer}>
        <CalendarDatepicker
          currentWeek={currentWeek}
          setCurrentWeek={setCurrentWeek}
          onChangeView={(newView) => setViewMode(newView === '주' ? 'week' : 'day')}
        />
        <WeekDays currentWeek={currentWeek} />
      </View>

      {/* 일정 렌더링 */}
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled={true}
      >
        <View style={styles.content}>
          {viewMode === 'week' ? (
            <View style={styles.timeblockContainer}>
              <TimeBlockList tasks={MockTasks} weekDates={weekDates} />
            </View>
          ) : (
            <View style={styles.dailyContent}>
              <DailySchedule tasks={MockTasks} selectedDate={moment()} />
            </View>
          )}
        </View>
      </ScrollView>

      <FloatingButton />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray050,
  },
  familyListContainer: {
    width: '100%',
    backgroundColor: '#FF7F00',
    paddingHorizontal: 0,
  },
  datePickerContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 10,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: colors.gray050,
  },
  scrollContent: {
    paddingBottom: 80,
    zIndex: 1,
  },
  content: {
    paddingLeft: 10,
  },
});

export default HomeScreen;
