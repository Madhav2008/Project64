import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Header } from 'react-native-elements';
import dictionary from '../localdb';

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      isSearchPressed: false,
      isLoading: false,
      word: 'Loading...',
      lexicalCategory: '',
      definition: '',
    };
  }

  getWord = (text) => {
    var text = text.toLowerCase();
    try {
      var word = dictionary[text]['word'];
      var lexicalCategory = dictionary[text]['lexicalCategory'];
      var definition = dictionary[text]['definition'];
      this.setState({
        word: word,
        lexicalCategory: lexicalCategory,
        definition: definition,
      });
    } catch (err) {
      alert('Sorry, This Word Is Not Available In This Dictionary Now.');
      this.setState({
        text: '',
        isSearchPressed: false,
      });
    }
  };

  render() {
    return (
      <View>
        <Header
          style={styles.header}
          backgroundColor={'lightgreen'}
          centerComponent={{
            text: 'Pocket Dictionary',
            style: { fontFamily: 'Rockwell', fontSize: 20,fontWeight: 'bold' },
          }}
        />

        <Image
          style={styles.image}
          source={{
            uri:
              'https://kathyabsher.com/files/2020/03/Glossary-Funny.jpg',
          }}
        />

        <Text style={styles.text1}>Search a word here.</Text>

        <TextInput
          style={styles.inputBox}
          onChangeText={(text) => {
            this.setState({
              text: text,
              isSearchPressed: false,
              word: 'Please wait...',
              lexicalCategory: '',
              examples: [],
              defination: '',
            });
          }}
          value={this.state.text}
        />

        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            this.setState({ isSearchPressed: true });
            this.getWord(this.state.text);
          }}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
        <View style={styles.outputContainer}>
          <Text style={{ fontSize: 20}}>
            {this.state.isSearchPressed && this.state.word === 'Loading...'
              ? this.state.word
              : ''}
          </Text>
          {this.state.word !== 'Loading...' ? (
            <View style={{ justifyContent: 'center', marginLeft: 10 }}>
              <View style={styles.detailsContainer}>
                <Text style={styles.detailsTitle}>Word : </Text>
                <Text style={styles.text}>{this.state.word}</Text>
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.detailsTitle}>Type : </Text>
                <Text style={styles.text}>{this.state.lexicalCategory}</Text>
              </View>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                <Text style={styles.detailsTitle}>Definition : </Text>
                <Text style={styles.text}>{this.state.definition}</Text>
              </View>
            </View>
          ) : null}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  image: {
    width: 180,
    height: 220,
    marginTop: 30,
    marginLeft: 80,
    borderColor: 'black',
    borderRadius: 20,
    borderWidth: 5,
  },
  text: {
    fontFamily: 'Rockwell',
    fontSize: 18,
    fontWeight:'bold',
    color: 'black',
  },
  text1: {
    fontFamily: 'Rockwell',
    fontSize: 20,
    fontWeight:'bold',
    color: 'black',
    marginLeft: 80,
    marginTop: 10,
  },
  inputBox: {
    marginTop: 10,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 3,
    borderRadius: 10,
    borderColor: 'black',
    backgroundColor: 'lightgreen',
    fontFamily: 'Rockwell, one stroke script',
    fontSize: 25,
    fontWeight:'bold',
    color: 'red',
  },
  searchButton: {
    backgroundColor: 'royalblue',
    textAlign: 'center',
    marginTop: 20,
    width: 170,
    height: 40,
    marginLeft: 90,
    padding: 7,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 20,
  },
  searchButtonText: {
    fontFamily: 'Rockwell',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  outputContainer: {
    flex: 0.7,
    alignItems: 'center',
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsTitle: {
    fontFamily: 'Rockwell',
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
