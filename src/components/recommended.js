import React, { Component } from 'react';

import { View, TouchableOpacity, StyleSheet, Image, Text } from 'react-native';

// import { Container } from './styles';

export default class Recommended extends Component {
    constructor(props){
        super(props)
    }
  render() {
    return (
        <TouchableOpacity style={styles.recomBox}>
            <View style={{width: '100%', height: 130}}>
                <Image style={styles.imageBox} source={this.props.source} />
            </View>
            <View style={{marginTop: 8, marginLeft: 16}}>
                <Text style={styles.textStyle}>{this.props.title}</Text>
                <View style={styles.horizontal}>
                    <Text style={styles.textStyle}>{this.props.cal}</Text>
                    <Text style={styles.details}> Kcal</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
    recomBox: {
        borderRadius: 16,
        backgroundColor: '#FFF',
        width: 220,
        height: 200,
        marginRight: 16
    },
    imageBox: {
        flex: 1, 
        width: null,
        height: null,
        resizeMode: 'cover',
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16
    },
    horizontal: {
        marginTop: 8,
        flexDirection: 'row',
        alignItems: 'center'
    },
    textStyle: {
        fontSize: 18,
        fontFamily: 'ComicNeue-Bold',
        color: '#1B1B13'
    },
    details: {
        fontSize: 14,
        fontFamily: 'ComicNeue-Bold',
        color: '#e0d200'
    }
})