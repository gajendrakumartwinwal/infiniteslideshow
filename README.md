
# react-native-slide-show-library

## Getting started

`$ npm install react-native-infiniteslideshow --save`

### Mostly automatic installation

`$ react-native link react-native-infiniteslideshow`




## Props


initialIndex,
        duration,
        items,
        rowRenderer,
        multiplier,
        style,
        indicatorStyle,
        autoScroll


| Property | Type | isRequired? | Default | Description |
| --- | :---: | :---: | :---: | --- |
| `initialIndex` | number | optional | 0 | initial index from where slider will start |
| `items` | number | required | - | array of items for the slideshow |
| `rowRenderer` | number | required | - | render individual item |
| `multiplier` | bool | optional | 2 | This multiplyer will be used to fake the duplicate array increase in case of for more smoothness |
| `style` | bool | required | {width, height} | height and width for the container required as its and slideshow and each item will have same height and width because of auto scroll |
| `indicatorStyle` | number | optional | indicator styling including spacing and alignment can be passed |
| `autoScroll` | string | optional | true | Enable auto scrolling |



## Demo
Expo Example: https://snack.expo.io/@gajendrakumar/slideshowexample


## Usage
```
import React from 'react';
import {StyleSheet, Text, View, Dimensions, Platform} from 'react-native';
import SlideShow from "./components/SlideShow";
// import SlideShow from "react-native-slide-show-library";

export default function App() {

    const rowRenderer = (type, data) => {
        return (
            <View style={styles.item}>
                <Text>
                    {data}
                </Text>
            </View>
        );
    };

    return (
        <SlideShow style={
            {
                height: 500,
                duration: 500,
                width: Platform === 'ios' ? Dimensions.get('screen').width : window.innerWidth
            }
        } items={[1, 2, 3, 4]} rowRenderer={rowRenderer}/>
    );
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

```

##Credit
https://github.com/Flipkart/recyclerlistview

##Licence
MIT
