import * as React from 'react';
import { Dimensions, ScrollView } from 'react-native';
import { BaseScrollView } from 'recyclerlistview';


export default class CustomBaseScrollView extends BaseScrollView {
    private readonly scrollViewRef: React.RefObject<ScrollView>;
    constructor(props) {
        super(props);
        this.scrollViewRef = React.createRef();
        this.scrollTo = this.scrollTo.bind(this);
    }


    scrollTo(...args) {
        if (this.scrollViewRef.current) {
            this.scrollViewRef.current.scrollTo(...args);
        }
    }

    render() {
        return (
            <ScrollView
                ref={this.scrollViewRef}
                {...this.props}
                snapToAlignment={'center'}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                decelerationRate={'fast'}
            >
                {this.props.children}
            </ScrollView>
        );
    }
}
