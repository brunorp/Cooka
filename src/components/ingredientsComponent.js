import React, { Component } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

export default class IngredientsComponent extends Component {
  render() {
    return (
        <View>
            <View key={this.props.key} style={styles.horizontal}>
                <View style={{width: 50, height: 50, marginRight: 16}}>
                    <Image style={styles.img} source={this.props.source}/>
                </View>  
                <Text style={styles.ingredientsName}>{this.props.name}</Text>
            </View>
            <View style={styles.hr}/>
        </View>
    )
  }
}

const styles = StyleSheet.create({
    hr: {
        borderWidth: 1,
        borderColor: 'rgba(219, 219, 219, 0.2)',
        marginVertical: 8
    },
    horizontal: {
        flexDirection: 'row', 
        alignItems: 'center', 
        marginTop: 8
    },
    img: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain'
    },
    ingredientsName: {
        fontSize: 16,
        fontFamily: 'ComicNeue-Regular',
        color: '#000', 
        width: 200
    },
})