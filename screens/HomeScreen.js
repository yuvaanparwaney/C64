import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Header } from 'react-native-elements';
import dictionary from '../database';
export default class HomeScreen extends Component{
  constructor() {
    super();
    this.state = {
      text: '',
      isSearchPressed: false,
      isLoading: false,
      word  : "Loading...",
      lexicalCategory :'',
      definition : ""
    };
  }

  getWord=(text)=>{
    var text = text.toLowerCase()
    try{
      var word = dictionary[text]["word"]
      var lexicalCategory = dictionary[text]["lexicalCategory"]
      var definition = dictionary[text]["definition"]
      this.setState({
        "word" : word,
        "lexicalCategory" : lexicalCategory,
        "definition" : definition
      })
    }
    catch(err){
      alert("Sorry This word is not available for now")
      this.setState({
        'text':'',
        'isSearchPressed':false
      })
    }
  }

  render(){
    return(
      <View style={{flex:1, borderWidth:2}}>
        <Header
          backgroundColor={'skyblue'}
          centerComponent={{
            text: 'Pocket Dictionary',
            style: { color: '#000000', fontSize: 25, fontSize: 25, fontWeight: 'bold' },
          }}
        />
        <View style={styles.inputBoxContainer}>
          <TextInput
            style={styles.inputBox}
            onChangeText={text => {
              this.setState({
                text: text,
                isSearchPressed: false,
                word  : "Loading...",
                lexicalCategory :'',
                examples : [],
                defination : ""
              });
            }}
            value={this.state.text}
          />

          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => {
              this.setState({ isSearchPressed: true });
              this.getWord(this.state.text)
            }}>
            <Text style={styles.searchText}>Search</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.outputContainer}>
          <Text style={{fontSize:25}}>
            {
              this.state.isSearchPressed && this.state.word === "Loading..."
              ? this.state.word
              : ""
            }
          </Text>
            {
              this.state.word !== "Loading..." ?
              (
                <View style={{justifyContent:'center', marginLeft:10 }}>
                  <View style={styles.detailsContainer}>
                    <Text style={styles.detailsTitle}>
                      Word :{" "}
                    </Text>
                    <Text style={{fontSize:12 }}>
                      {this.state.word}
                    </Text>
                  </View>
                  <View style={styles.detailsContainer}>
                    <Text style={styles.detailsTitle}>
                      Type :{" "}
                    </Text>
                    <Text style={{fontSize:12}}>
                      {this.state.lexicalCategory}
                    </Text>
                  </View>
                  <View style={{flexDirection:'row',flexWrap: 'wrap'}}>
                    <Text style={styles.detailsTitle}>
                      Definition :{" "}
                    </Text>
                    <Text style={{ fontSize:12}}>
                      {this.state.definition}
                    </Text>
                  </View>
                </View>
              )
              :null
            }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputBoxContainer: {
    flex:0.3,
    alignItems:'center',
    justifyContent:'center'
  },
  inputBox: {
    width: '85%',
    alignSelf: 'center',
    height: 45,
    textAlign: 'center',
    borderWidth: 5,
  },
  searchButton: {
    width: '50%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderWidth: 3,
    borderRadius: 11,
  },
  searchText:{
    fontSize: 25,
    fontWeight: 'bold'
  },
  outputContainer:{
    flex:1,
    alignItems:'center'
  },
  detailsContainer:{
    flexDirection:'row',
    alignItems:'center'
  },
  detailsTitle:{
    color:'lightgreen',
    fontSize:25,
    fontWeight:'bold'
  }
});