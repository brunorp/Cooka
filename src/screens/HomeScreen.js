import React, { Component } from 'react';
import { SafeAreaView, Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import SearchBar from '../components/searchBar'
import MealTimes from '../components/mealTimes';
import Recommended from '../components/recommended';

export default class HomeScreen extends Component {
    constructor(props){
        super(props);

        this.state = {
            users: [],
            searchValue: '',
        }
    }

    _handleSubmitEditing(){
        let words = this.state.searchValue.replace(/ +/g, ',')
        this.props.navigation.navigate('Result', {ingredients: words});
    }

    render(){
        const mealTime = [ 
            {id: 1, bgColor: 'rgba(255, 250, 127, 0.8)', icon: require('../../assets/images/cherry.png'), title: 'breakfast'},
            {id: 2, bgColor: 'rgba(133, 233, 123, 0.7)', icon: require('../../assets/images/lunch.png'), title: 'lunch'},
            {id: 3, bgColor: 'rgba(128, 211, 243, 0.7)', icon: require('../../assets/images/dinner.png'), title: 'dinner'},
            {id: 4, bgColor: 'rgba(200, 110, 200, 0.5)', icon: require('../../assets/images/cherry.png'), title: 'dinner'}
        ]

        const recommendedFoods = [
            {id: 1, source: require('../../assets/images/salad.jpg'), title: 'Vegetable salad', cal: '124'},
            {id: 2, source: require('../../assets/images/cookedMeal.jpg'), title: 'Cooked meal', cal: '250'}
        ]
        return(
            <SafeAreaView style={styles.container}>
                    <View>
                        <Text style={styles.title}>Search</Text>
                        <Text style={styles.subtitle}>for recipes</Text>
                        <View style={{marginTop: 32}}>
                            <Text style={styles.description}>Search by recipe name or ingredients</Text>
                        </View>     
                    </View>  
                    <View style={{marginTop: 32}}>
                        <SearchBar 
                            onChangeText={text => this.setState({searchValue: text})}
                            placeholder="Search"
                            placeholderTextColor="#c9c9c9"
                            blurOnSubmit={true}
                            onSubmitEditing={() => this._handleSubmitEditing()}
                        />
                    </View>
                    <View style={styles.mealTimes}>
                        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                            {mealTime.map((data, index) => { 
                                return <MealTimes source={data.icon} key={data.id} title={data.title} style={{backgroundColor: data.bgColor}}/>
                            })}
                        </ScrollView>
                    </View>
                    <View style={styles.horizontal}>
                        <Text style={styles.subtitle2}>Recommended</Text>
                        <TouchableOpacity>
                            <Text style={styles.textButton}>View all</Text>
                        </TouchableOpacity>       
                    </View>
                    <View style={[styles.mealTimes, {marginTop: 16}]}>
                        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                            {recommendedFoods.map((data, index) => (
                                <Recommended key={data.id} source={data.source} title={data.title} cal={data.cal} />    
                            ))}
                        </ScrollView>
                    </View>                  
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 16,
        marginTop: 56,
    },
    title: {
        fontSize: 32,
        fontFamily: 'ComicNeue-Bold',
        color: '#1B1B13'
    },
    subtitle: {
        fontSize: 24,
        fontFamily: 'ComicNeue-Regular',
        color: '#1B1B13'
    },
    subtitle2: {
        fontSize: 22,
        fontFamily: 'ComicNeue-Bold',
        color: '#1B1B13'
    },
    description: {
        fontSize: 16,
        fontFamily: 'ComicNeue-Light',
        color: '#808080'
    }, 
    textButton: {
        fontSize: 18,
        fontFamily: 'ComicNeue-Light',
        color: 'rgba(75, 129, 227, 1)'
    },
    mealTimes: {
        marginTop: 52,
        display: 'flex',
        flexDirection: 'row',
    },
    horizontal: {
        marginTop: 52,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 16
    }
})