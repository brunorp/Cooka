import React, { Component } from 'react';
import { View, SafeAreaView, Text, Image, StyleSheet, Dimensions, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import settings from '../public/settings';
import InstructionsComponent from '../components/instructionsComponent';
import IngredientsComponent from '../components/ingredientsComponent';

const screenHeight = Math.round(Dimensions.get('window').height);

export default class InstructionsScreen extends Component {
  constructor(props){
    super(props);
    
    this.state = { 
      isLoading: true,
      info: [],
      instructions: [],
      ingredients: []
    }
  }

  async getInstructions() {
    const { id } = this.props.route.params;
    try{
      const reqInfo = await fetch(`${settings.URL}${id}/information?apiKey=${settings.API_KEY}`);
      const resInfo = await reqInfo.json();
      for (const item of resInfo.extendedIngredients) {
        this.state.ingredients.push(item);
      }
      for (const item of resInfo.analyzedInstructions[0].steps) {
        this.state.instructions.push(item);
      }
      this.state.info.push(resInfo.aggregateLikes, resInfo.vegetarian)
    }
    catch(err){
      console.log(err)
    }
    finally{
      this.setState({isLoading: false})
    }
  }

  componentDidMount(){
    this.getInstructions();
  }

  renderItem({ item }) {
    return (
      <IngredientsComponent 
        key={item.id}
        name={item.original}
        source={{uri: `https://spoonacular.com/cdn/ingredients_100x100/${item.image}`}}
      />
    );
  }

  renderInstruction({item}) {
    return(
      <InstructionsComponent 
        number={item.number}
        step={item.step}
      />
    )
  }

  render() {
    const { img, title, servings, readyInMinutes } = this.props.route.params;
    return (
      <SafeAreaView style={{flex:1}}>
          <View style={styles.header}>
            <Image style={styles.img} source={{uri: `https://spoonacular.com/recipeImages/${img}`}}/>
          </View>
          <ScrollView style={styles.containerInfo}>
            <View style={{borderWidth: 3, alignSelf: 'center', width: 65, borderColor: 'rgba(219, 219, 219, 0.8)', borderRadius: 5, marginTop: 16}}/>
            <View style={{marginHorizontal:50}}>
              <Text style={styles.title}>{title}</Text>
              <View style={[styles.horizontal, {marginTop:16, justifyContent:'space-around'}]}>
                <View  style={styles.horizontal}>
                  <Text style={styles.subtitle}>servings: </Text>
                  <Text style={styles.answer}>{servings}</Text>
                </View>
                <View style={styles.horizontal}>
                  <Text style={styles.subtitle}>Ready in: </Text>
                  <Text style={styles.answer}>{readyInMinutes} min</Text>
                </View>
              </View>   
              <Text style={{...styles.title, fontSize: 22}}>Ingredients</Text>
            </View>
            {this.state.isLoading ? <ActivityIndicator /> : (
              <View style={styles.flat}>
                <FlatList 
                  showsVerticalScrollIndicator={false}
                  data={this.state.ingredients}
                  renderItem={this.renderItem}
                  keyExtractor={item => item.id}
                />
              </View>
            )}
            <Text style={{...styles.title, fontSize: 22}}>Instructions</Text>
            {this.state.isLoading ? <ActivityIndicator /> : (
              <View style={styles.flat}>
                <FlatList 
                  showsVerticalScrollIndicator={false}
                  data={this.state.instructions}
                  renderItem={this.renderInstruction}
                  keyExtractor={item => item.id}
                />
              </View>
            )}
            
          </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 300,  
  },
  img: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
  },
  containerInfo: {
    width: '100%',
    marginTop: -150,
    height: screenHeight - 150,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40
  },
  title: {
    fontSize: 24,
    fontFamily: 'ComicNeue-Bold',
    color: '#1B1B13',
    textAlign: 'center',
    marginTop: 24
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'ComicNeue-Regular',
    color: '#000'  
  },
  answer: {
    fontSize: 16,
    fontFamily: 'ComicNeue-Light',
    color: '#000'
  },
  horizontal: {
    flexDirection: 'row', 
    alignItems: 'center'
  },
  flat: {
    marginHorizontal:24, 
    marginTop: 24, 
    marginBottom: 24, 
    flex: 1
  }
})