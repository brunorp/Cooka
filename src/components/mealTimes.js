import React, { PureComponent } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';

export default class MealTimes extends PureComponent {
    constructor(props){
        super(props);
    }
    render() {
        return(
            <TouchableOpacity style={[styles.box, this.props.style]}>
                <Image source={this.props.source} style={styles.img} />
                <Text style={styles.title}>{this.props.title}</Text>
            </TouchableOpacity>   
        )
    }
}

const styles = StyleSheet.create({
    box: {
        width: 100,
        height: 100,
        borderRadius: 16,
        marginRight: 12,
        paddingBottom: 8,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    title: {
        fontSize: 18,
        color: '#1B1B13',
        fontFamily: 'ComicNeue-Bold',
    },
    img: {
        width: 70,
        height: 70
    }
})