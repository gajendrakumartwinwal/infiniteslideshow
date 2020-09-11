import * as React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import SlideShow from "./src/SlideShow";
// import SlideShow from "react-native-slide-show-library";

class App extends React.Component{

    constructor(props){
        super(props)
        this.state = {}
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

    render(): React.ReactNode {
        return (
            <SlideShow duration={500} style={
                {
                    height: 500,
                    width: Dimensions.get('screen').width
                }
            } items={[1, 2, 3, 4]} rowRenderer={this.rowRenderer}/>
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
        margin: 1,
        justifyContent: 'center',
        backgroundColor: '#e2e200',
        alignItems: 'center',
    },
});

export default App
