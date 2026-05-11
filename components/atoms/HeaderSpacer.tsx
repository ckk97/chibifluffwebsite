import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { useHeaderStore } from '../../store/useHeaderStore';

/**
 * HeaderSpacer - Animates its height to push content down when header is visible
 * and collapses to allow content to fill the space when header is hidden.
 */
export const HeaderSpacer = () => {
  const isVisible = useHeaderStore(s => s.isVisible);
  const height = useRef(new Animated.Value(isVisible ? 100 : 0)).current;

  useEffect(() => {
    Animated.spring(height, {
      toValue: isVisible ? 100 : 0,
      useNativeDriver: false, // height requires JS driver
      friction: 10,
      tension: 40,
    }).start();
  }, [isVisible]);

  return <Animated.View style={{ height }} />;
};
