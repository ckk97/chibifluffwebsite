import { useRef } from 'react';
import { NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { useHeaderStore } from '../store/useHeaderStore';

export const useSmartHeaderScroll = () => {
  const lastY = useRef(0);
  const { setIsVisible, setIsFooterVisible } = useHeaderStore();

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    const currentY = contentOffset.y;
    
    // Scrolling down
    if (currentY > lastY.current + 10 && currentY > 100) {
      setIsVisible(false);
    } 
    // Scrolling up
    else if (currentY < lastY.current - 10 || currentY <= 100) {
      setIsVisible(true);
    }
    
    // Footer trigger (Robust 80% threshold)
    const totalHeight = contentSize.height;
    const viewportHeight = layoutMeasurement.height;
    const currentBottom = currentY + viewportHeight;
    
    if (totalHeight > viewportHeight + 100) { // Only if page is actually scrollable
      const threshold = totalHeight * 0.8;
      const isPastThreshold = currentBottom > threshold;
      setIsFooterVisible(isPastThreshold);
    } else {
      // For very short pages, show footer when slightly scrolled
      setIsFooterVisible(currentY > 20);
    }
    
    lastY.current = currentY;
  };

  return handleScroll;
};
