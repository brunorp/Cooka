import React, { Component } from 'react';
import CardView from 'react-native-cardview'
import { View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';

export default class RecipesSearched extends Component {
    constructor(props){
        super(props)
    }
  render() {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={this.props.onPress}>
            <View style={{ width: 200, height: 150}}>
                <Image style={styles.img} resizeMode='contain' source={this.props.source}/>
            </View>
            <View style={styles.resultBox}>
                <Text style={styles.title}>{this.props.title}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 16,  marginLeft: 24}}>
                    <Text style={styles.subtitle}>Ready in: </Text>
                    <Text style={styles.answer}>{this.props.ready} minutes.</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 24}}>
                    <Text style={styles.subtitle}>servings: </Text>
                    <Text style={styles.answer}>{this.props.servings}</Text>
                </View>   
            </View>
        </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
    resultBox: {
        width: 200,
        height: 150,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        marginRight: 16,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
    },
    img: {
        flex: 1, 
        width: null,
        height: null,
        resizeMode: 'cover',
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16
    },
    title: {
        fontSize: 18,
        fontFamily: 'ComicNeue-Bold',
        color: '#000',
        textAlign: 'center'
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
    }
})