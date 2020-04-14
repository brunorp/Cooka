import React, { Component }from 'react';
import { View, SafeAreaView, Image, FlatList, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import RecipesSearched from '../components/recipesSearched';
import CardView from 'react-native-cardview'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import settings from '../public/settings';

export default class ResultScreen extends Component {
    constructor(props){
        super(props)

        this.state = {
            activeSlide:0,
            recipes: [],
            isLoading: true
        }

        this._renderItem = this._renderItem.bind(this)
    }

    async getRecipes() {
        const { ingredients } = this.props.route.params;
        try{
            const req = await fetch(`${settings.URL}search?query=${ingredients}&number=10&instructionsRequired=true&apiKey=${settings.API_KEY}`);
            const result = await req.json();
            for(let items of result.results){
                this.state.recipes.push(items);
            }
        }
        catch(err){
            console.log(err)
        }
        finally{
            this.setState({isLoading: false});
        }
    }

    componentDidMount(){
        this.getRecipes();
    }

    get pagination () {
        const { recipes, activeSlide } = this.state;
        return (
            <Pagination
              dotsLength={recipes.length}
              activeDotIndex={activeSlide}
              containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0)', height: 70}}
              dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 1,
                  backgroundColor: 'rgba(0, 0, 0, 0.92)'
              }}
              inactiveDotStyle={{
                  // Define styles for inactive dots here
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
        );
    }

    _renderItem({item,index}){
        return (
            <RecipesSearched 
            title={item.title} 
            source={{uri: `https://spoonacular.com/recipeImages/${item.image}`}}
            ready={item.readyInMinutes}
            servings={item.servings}
            onPress={() => this.props.navigation.navigate('Instructions', {
                                                                            id: item.id, 
                                                                            title: item.title, 
                                                                            servings: item.servings,
                                                                            readyInMinutes: item.readyInMinutes,
                                                                            img: item.image
                                                                        })}
            />
        )
    }

    render(){
        return (       
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Image style={styles.img} source={require('../../assets/images/cookedMeal.jpg')} />
                </View>
                <CardView
                cardElevation={7}
                cardMaxElevation={7}     
                style={styles.resultBox}>
                    <Text style={styles.title}>Recipes</Text>
                    <Text style={styles.description}>Take advantage of our list of recipes made for you!</Text>
                    {this.state.isLoading ? <ActivityIndicator /> : (
                        <View style={{alignItems:'center', marginLeft: -16}}>
                            <Carousel
                            ref={ref => this._carousel = ref}
                            data={this.state.recipes}
                            renderItem={this._renderItem}
                            sliderWidth={250}
                            layoutCardOffset={9}
                            itemWidth={200}
                            layout={'default'}
                            onSnapToItem = { index => this.setState({activeSlide:index}) }
                            />
                            {this.pagination}
                        </View>
                    )}
                   
                </CardView>
            </SafeAreaView>    
        
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        width: '100%',
        height: 210,  
    },
    img: {
        flex: 1, 
        width: null,
        height: null,
        resizeMode: 'cover',
    },
    resultBox: {
        height: 480,
        marginLeft: 32,
        backgroundColor: '#FFF',
        marginTop: -110,
        paddingTop: 16,
        paddingLeft: 16
    },
    title: {
        fontSize: 32,
        fontFamily: 'ComicNeue-Bold',
        color: '#1B1B13'  
    },
    description: {
        fontSize: 16,
        fontFamily: 'ComicNeue-Light',
        color: '#808080',
        marginTop: 8,
        marginBottom: 24,
        marginRight: 30
    },
})
