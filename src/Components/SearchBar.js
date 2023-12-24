
import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([
    {
      id: '1',
      sender: 'Alice',
      message: 'Hello, how are you?',
    },
    {
      id: '2',
      sender: 'Bob',
      message: 'I\'m doing well, thanks!',
    },
    {
      id: '3',
      sender: 'Alice',
      message: 'What\'s new?',
    },
    {
      id: '4',
      sender: 'Bob',
      message: 'Not much, just working on some projects.',
    },
    // ... add more messages as needed
  ]);

  const handleSearch = (text) => {
    setSearchQuery(text);

    // Filter the data based on the search input
    const filteredData = data.filter(
      (item) =>
        item.sender.toLowerCase().includes(text.toLowerCase()) ||
        item.message.toLowerCase().includes(text.toLowerCase())
    );
    // Update the displayed data
    setFilteredData(filteredData);
  };

  const handleClear = () => {
    setSearchQuery('');
    setFilteredData(data);
  };

  const [filteredData, setFilteredData] = useState(data);

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <MaterialCommunityIcons name="magnify" size={24} color="black" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={handleClear}>
            <MaterialCommunityIcons name="close" size={24} color="black" style={styles.icon} />
          </TouchableOpacity>
        )}
      </View>
      {searchQuery.length > 0 && (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => console.log(item.message)}>
              <View style={styles.messageContainer}>
                <Text style={styles.sender}>{item.sender}</Text>
                <Text style={styles.message}>{item.message}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    padding: 2,
  },
  input: {
    flex: 1,
    fontSize: 18,
  },
  icon: {
    marginHorizontal: 4,
  },
  messageContainer: {
    padding: 8,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  sender: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  message: {
    fontSize: 18,
  },
});

export default SearchBar;
