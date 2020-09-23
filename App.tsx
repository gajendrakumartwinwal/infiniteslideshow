import * as React from 'react';
import {StyleSheet, Text, View, Dimensions, Button} from 'react-native';
// import SlideShow from "./src/SlideShow";
import SlideShow from "./dist/index";

class App extends React.Component{

    constructor(props){
        super(props)
        this.state = {items: [1,2,3,4,5]}
    }
    rowRenderer = (type: number, data: any) => {
        return (
            <View style={styles.item}>
                <Text>
                    {data}
                </Text>
            </View>
        );
    };

    onPress = () => {
        this.setState({items: [1]})
    }

    render(): React.ReactNode {
        // alert('yes i am here!')
        return (
            <View>
                <SlideShow
                    indicatorStyle={{
                        alignItems: 'center',
                        // position: 'absolute',
                        bottom: 10,
                        left: 0,
                        right: 0,
                    }}
                    autoScroll={false}
                    duration={3000}
                    style={{
                        height: 500,
                        width: Dimensions.get('screen').width
                    }}
                    multiplier={2}
                    items={this.state.items}
                    rowRenderer={this.rowRenderer}/>
                    <Button title={'Clicke me'} onPress={this.onPress}/>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#e2e200',
        alignItems: 'center',
    },
});

export default App
