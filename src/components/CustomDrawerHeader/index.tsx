import React from 'react';
import SafeScreen from '../SafeScreen';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { View, Text } from 'react-native';
import styles from './styles';

const CustomDrawerHeader = (props: DrawerContentComponentProps) => {
  return (
    <SafeScreen>
      <DrawerContentScrollView 
        {...props}
        contentContainerStyle={styles.drawerContent}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Top Rated Movie</Text>
        </View>
        <DrawerItemList 
          {...props}
        />
      </DrawerContentScrollView>
    </SafeScreen>
  );
};

export default CustomDrawerHeader;