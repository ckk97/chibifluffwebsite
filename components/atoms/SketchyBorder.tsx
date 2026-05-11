import React, { useMemo, useState } from 'react';
import { View, LayoutChangeEvent, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface SketchyBorderProps {
  children: React.ReactNode;
  borderColor?: string;
  strokeWidth?: number;
  variance?: number;
  padding?: number;
  className?: string;
  backgroundColor?: string;
  doubleLine?: boolean;
  dashed?: boolean;
}

/**
 * SketchyBorder - Simplified version to ensure touch events propagate correctly.
 */
export const SketchyBorder: React.FC<SketchyBorderProps> = ({
  children,
  borderColor = "#4A423E",
  strokeWidth = 2,
  variance = 6,
  padding = 16,
  className = "",
  backgroundColor = "transparent",
  doubleLine = true,
  dashed = false,
}) => {
  const [layout, setLayout] = useState({ width: 0, height: 0 });

  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    if (Math.abs(width - layout.width) > 1 || Math.abs(height - layout.height) > 1) {
      setLayout({ width, height });
    }
  };

  const createPath = (v: number, seed: number) => {
    if (layout.width === 0) return "";
    const w = layout.width;
    const h = layout.height;
    
    const rnd = (s: number) => (Math.sin(s * 1.5) * v);

    const tl = { x: v + rnd(seed), y: v + rnd(seed + 1) };
    const tr = { x: w - v + rnd(seed + 2), y: v + rnd(seed + 3) };
    const br = { x: w - v + rnd(seed + 4), y: h - v + rnd(seed + 5) };
    const bl = { x: v + rnd(seed + 6), y: h - v + rnd(seed + 7) };

    const mt = { x: w / 2 + rnd(seed + 8), y: rnd(seed + 9) };
    const mr = { x: w + rnd(seed + 10), y: h / 2 + rnd(seed + 11) };
    const mb = { x: w / 2 + rnd(seed + 12), y: h + rnd(seed + 13) };
    const ml = { x: rnd(seed + 14), y: h / 2 + rnd(seed + 15) };

    return `M ${tl.x} ${tl.y} 
            Q ${mt.x} ${mt.y} ${tr.x} ${tr.y} 
            Q ${mr.x} ${mr.y} ${br.x} ${br.y} 
            Q ${mb.x} ${mb.y} ${bl.x} ${bl.y} 
            Q ${ml.x} ${ml.y} ${tl.x} ${tl.y}`;
  };

  const path1 = useMemo(() => createPath(variance, Math.random() * 500), [layout, variance]);
  const path2 = useMemo(() => createPath(variance * 1.2, Math.random() * 500), [layout, variance]);

  return (
    <View 
      onLayout={onLayout} 
      style={[{ padding, position: 'relative' }]}
      className={className}
    >
      {layout.width > 0 && (
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          <Svg width={layout.width} height={layout.height}>
            <Path d={path1} fill={backgroundColor} />
            
            <Path
              d={path1}
              stroke={borderColor}
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={dashed ? "8, 6" : undefined}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.8}
            />
            
            {doubleLine && !dashed && (
              <Path
                d={path2}
                stroke={borderColor}
                strokeWidth={strokeWidth * 0.5}
                fill="none"
                opacity={0.3}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </Svg>
        </View>
      )}
      <View style={{ zIndex: 1 }}>
        {children}
      </View>
    </View>
  );
};
