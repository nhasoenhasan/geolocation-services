import React from 'react';
import { View, StyleSheet } from 'react-native';

const PinIcon = ({ size = 60, color = '#E91E63' }) => {
  return (
    <View style={[styles.container, { width: size, height: size * 1.6 }]}>
      <View 
        style={[
          styles.pinBody, 
          { 
            width: size, 
            height: size, 
            backgroundColor: color,
            borderTopLeftRadius: size / 2,
            borderTopRightRadius: size / 2,
            borderBottomLeftRadius: size / 2,
            borderBottomRightRadius: 0,
            transform: [{ rotate: '45deg' }]
          }
        ]}
      >
        <View 
          style={[
            styles.innerCircle, 
            { 
              width: size * 0.3, 
              height: size * 0.3,
              borderRadius: (size * 0.3) / 2,
              transform: [{ rotate: '45deg' }]
            }
          ]} 
        />
      </View>
    </View>
  );
};

export default PinIcon

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinBody: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  innerCircle: {
    backgroundColor: '#FFFFFF',
    position: 'absolute',
  },
});
