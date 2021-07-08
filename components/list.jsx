import React, { Component } from 'react';
import { FlatList, View, Text, Image, StyleSheet } from 'react-native';

class List extends Component {
    constructor() {
        super();
        this.state = {
            countries: [""],
        };
    }
    componentDidMount() {
        fetch('http://restcountries.eu/rest/v2/all').then(data => {
            return data.json()
        }).then(json => {
            this.setState({
                countries: json
            })
        })
    } catch(error) {
        console.error(error);
    }

    renderItemList({ item }) {
        return (
            <View style={styles.itemContainer}>
                <Image source={{ uri: item.flag }} style={styles.image} />
                <View style={styles.textContainer}>
                    <Text>{item.name}</Text>
                    <Text>{item.capital}</Text>
                </View>
            </View>
        );
    }
    renderItemSeparator() {
        return (
            <View style={{ height: 1, backgroundColor: 'blue' }}></View>

        )
    }

    render() {
        return (
            <View style={styles.container} >
                <FlatList
                    data={this.state.countries}
                    renderItem={this.renderItemList}
                    ItemSeparatorComponent={this.renderItemSeparator}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        margin: 10,
        alignItems: 'center'
    },
    textContainer: {
        flex: 2,
        fontSize: 32,
        fontFamily: 'Ubuntu-Bold'
    },
    image: {
        height: 80,
        flex: 3,
        borderRadius: 50
    },
})
export default List;