import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    Dimensions,
    Platform,
    Button,
} from 'react-native';

const itemWidth = Dimensions.get('window').width;
const MARGIN = 60//Dimensions.get('window').width / 2.5
let counter = 1

export default class App extends Component {
    constructor(props) {
        super(props);
        this.index = 0;
        this.users = []
        for (let i = 0; i < 10; i++) {
            this.users[i] = {
                key: '5a31077f6dda99e234ad6727',
                name: i,
                company: 'EXOVENT',
                email: 'cathygilliam@exovent.com',
            }
        }
    }

    render() {
        return (
            <View>
                <FlatList
                    style={{ height: 400, marginTop: 100}}
                    ref={(ref) => (this.flatlist = ref)}
                    data={this.users}
                    ItemSeparatorComponent={this.renderSeparator}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: '5%' }}
                    // keyExtractor={this.props.keyExtractor}
                    onScrollEndDrag={(e) => {
                        // this.pagination(e.nativeEvent.velocity.x);
                    }}
                    snapToAlignment={'center'}
                    // getItemLayout={this.getItemLayout}
                    horizontal
                    renderItem={this.renderItem}
                />
                <Button
                    style={{ height: 50 }}
                    onPress={this.onPress}
                    title="Press Me"
                />
            </View>
        );
    }

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: '100%',
                    width: 20,
                    backgroundColor: "#CED0CE"
                }}
            />
        );
    };

    onPress = () => {
        this.flatlist.scrollToIndex({ animated: true, index: (counter++%this.users.length) });
    };


    getItemLayout = (data, index) => ({
        length: itemWidth,
        offset: itemWidth * index,
        index,
    });

    pagination = (velocity) => {
        let nextIndex;
        if (Platform.OS == 'ios')
            nextIndex = velocity > 0 ? this.index + 1 : this.index - 1;
        else nextIndex = velocity < 0 ? this.index + 1 : this.index - 1;
        if (this.isLegitIndex(nextIndex, this.users.length)) {
            this.index = nextIndex;
        }
        this.flatlist.scrollToIndex({ index: this.index, animated: true });
    };

    isLegitIndex(index, length) {
        if (index < 0 || index >= length) return false;
        return true;
    }

    renderItem = ({ item }) => (
        <View
            style={{
                borderColor: 'red',
                borderWidth: 1,
                width: 200,
                backgroundColor: '#e2e2e2',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Text>{item.name}</Text>
        </View>
    );

}
