import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

const SegmentedControl = ({ segments, onSegmentPress, selectedSegment, label, isRequired }) => {
  return (
    <View style={styles.wrapper}>
      {/* 라벨과 (required) */}
      {label && (
        <View style={styles.labelContainer}>
          {isRequired && <Text style={styles.required}>*</Text>}
          <Text style={styles.label}>{label}</Text>
        </View>
      )}

      {/* 세그먼트 컨트롤 */}
      <View style={styles.container}>
        {segments.map((segment, index) => (
          <React.Fragment key={index}>
            <TouchableOpacity
              style={[
                styles.segment,
                selectedSegment === segment.value && styles.selectedSegment, // 선택된 세그먼트 강조
                index === 0 && styles.leftRounded, // 왼쪽 끝 모서리 둥글게
                index === segments.length - 1 && styles.rightRounded, // 오른쪽 끝 모서리 둥글게
              ]}
              onPress={() => onSegmentPress(segment.value)}
            >
              <Text
                style={[
                  styles.segmentText,
                  selectedSegment === segment.value && styles.selectedText, // 선택된 텍스트 강조
                ]}
              >
                {segment.label}
              </Text>
            </TouchableOpacity>

            {/* 세그먼트 구분선 추가 (마지막 세그먼트 제외) */}
            {index < segments.length - 1 && <View style={styles.divider} />}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  labelContainer: {
    flexDirection: 'row', // 라벨과 *를 한 줄로 배치
    alignItems: 'center',
    marginBottom: 16, // 라벨과 세그먼트 간 여백
  },
  required: {
    color: colors.primary001, // *의 색상
    fontSize: 16,
    fontFamily: fonts.semiBold,
    marginRight: 4, // *와 라벨 사이 여백
  },
  label: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: colors.gray800, // 라벨 텍스트 색상
  },
  container: {
    flexDirection: 'row',
    backgroundColor: colors.white000,
    borderRadius: 8,
    overflow: 'hidden', // 모서리 둥글게
    borderWidth: 1,
    borderColor: colors.gray200, // 테두리 색상
  },
  segment: {
    flex: 1, // 동일한 비율로 배치
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: colors.white000,
  },
  selectedSegment: {
    borderWidth: 2,
    borderColor: colors.primary001,
    backgroundColor: colors.primary005, // 선택된 세그먼트의 배경색
  },
  segmentText: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: colors.gray900,
  },
  selectedText: {
    color: colors.primary001, // 선택된 텍스트의 색상
    fontFamily: fonts.semiBold,
    fontSize: 16,
  },
  leftRounded: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  rightRounded: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  divider: {
    width: 1, // 구분선 두께
    backgroundColor: colors.gray200, // 구분선 색상
    height: '80%', // 구분선 높이
    alignSelf: 'center', // 세로 가운데 정렬
  },
});

export default SegmentedControl;
