import {SafeScreen} from '@/components';
import React, {useCallback, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {RadioButton} from 'react-native-paper';
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {RootStackParamList} from '@/navigation/types';
import {SortOption} from '@/types';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {typeData} from '@/constants';
import {Dropdown} from 'react-native-element-dropdown';
import {filtersStorage} from '@/services/storage';
import getStoredObjects from '@/utils/getStoredObject';

type FilterScreenRouteProp = RouteProp<RootStackParamList, 'filter'>;

const Filter = () => {
  const router = useRoute<FilterScreenRouteProp>();
  const navigation = useNavigation();
  const {onApplyFilter, currentSort} = router.params;
  const [sortField, setSortField] = useState<SortOption['field']>(
    currentSort?.field ?? 'Title',
  );
  const [sortOrder, setSortOrder] = useState<SortOption['order']>(
    currentSort?.order ?? 'asc',
  );
  const [selectedType, setSelectedType] = useState('movie');

  useFocusEffect(
    useCallback(() => {
      const filters = getStoredObjects(filtersStorage, 'filters');
      if (filters) {
        const {field, order, type} = filters;
        setSortField(field);
        setSortOrder(order);
        setSelectedType(type);
      }
    }, [navigation]),
  );

  // handlers
  const handleApplyFilter = () => {
    const filters = {
      field: sortField,
      order: sortOrder,
      type: selectedType,
    };
    onApplyFilter(filters);
    filtersStorage.set('filters', JSON.stringify(filters));
    navigation.goBack();
  };

  const handleOnChangeSortFieldValue = (value: string) => {
    setSortField(value as SortOption['field']);
  };

  const handleOnChangeSortOrderValue = (value: string) => {
    setSortOrder(value as SortOption['order']);
  };

  const handleSelectMovieType = (item: (typeof typeData)[0]) => {
    setSelectedType(item.value);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleResetFilters = () => {
    setSortField('Title');
    setSortOrder('asc');
    setSelectedType('movie');
    filtersStorage.delete('filters');
  };

  return (
    <SafeScreen>
      <View style={styles.container}>
        <View style={styles.headerView}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <ChevronLeftIcon size={28} color="white" />
          </TouchableOpacity>
        </View>
        <Text style={styles.sectionTitle}>Sort By</Text>
        <View style={styles.optionContainer}>
          <RadioButton.Group
            onValueChange={handleOnChangeSortFieldValue}
            value={sortField}>
            <View style={styles.radioItem}>
              <RadioButton.Android
                value="Title"
                color="white"
                uncheckedColor="white"
              />
              <Text style={styles.radioLabel}>Title</Text>
            </View>
            <View style={styles.radioItem}>
              <RadioButton.Android
                value="Year"
                color="white"
                uncheckedColor="white"
              />
              <Text style={styles.radioLabel}>Year</Text>
            </View>
          </RadioButton.Group>
        </View>

        <Text style={styles.sectionTitle}>Order</Text>
        <View style={styles.optionContainer}>
          <RadioButton.Group
            onValueChange={handleOnChangeSortOrderValue}
            value={sortOrder}>
            <View style={styles.radioItem}>
              <RadioButton.Android
                value="asc"
                color="white"
                uncheckedColor="white"
              />
              <Text style={styles.radioLabel}>Ascending</Text>
            </View>
            <View style={styles.radioItem}>
              <RadioButton.Android
                value="desc"
                color="white"
                uncheckedColor="white"
              />
              <Text style={styles.radioLabel}>Descending</Text>
            </View>
          </RadioButton.Group>
        </View>
        <Text style={styles.sectionTitle}>Type</Text>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.dropdownPlaceholder}
          selectedTextStyle={styles.dropdownSelectedText}
          data={typeData}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select type"
          value={selectedType}
          onChange={handleSelectMovieType}
        />

        <TouchableOpacity
          style={styles.applyButton}
          onPress={handleApplyFilter}>
          <Text style={styles.applyButtonText}>Apply</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.applyButton, styles.resetButton]}
          onPress={handleResetFilters}>
          <Text style={[styles.applyButtonText, styles.resetButtonText]}>Reset Filters</Text>
        </TouchableOpacity>
      </View>
    </SafeScreen>
  );
};

export default Filter;
