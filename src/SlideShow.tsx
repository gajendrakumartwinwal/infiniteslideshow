import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import {Animated, Dimensions, FlexAlignType, View} from 'react-native';
import {RecyclerListView,} from 'recyclerlistview';
import CustomBaseScrollView from './CustomBaseScrollView';
import DefaultViewPageIndicator from './DefaultViewPageIndicator';
import useDataState from "./hooks/useDataState";
import usePlayState from "./hooks/usePlayState";

interface SlidShowProps {
    initialIndex: number,
    duration: number,
    multiplier: number,
    autoScroll: boolean,
    items: any[],
    rowRenderer: (type: string | number, data: any, index: number) => null;
    style: {
        width: number,
        height: number,
    },
    indicatorStyle: {
        alignItems: FlexAlignType,
        position?: 'absolute' | 'relative';
        bottom: number,
        left: number,
        right: number,
    }
}

let itemWidth : number
const SlideShow = (
    {
        initialIndex,
        duration,
        items,
        rowRenderer,
        multiplier,
        style,
        indicatorStyle,
        autoScroll
    }: SlidShowProps
) => {
    const recyclerList = useRef(null)
    const intialialScrollIndex = (multiplier / 2) * items.length + initialIndex
    const [currentIndexFake, setCurrentIndexFake] = useState<number>(intialialScrollIndex)
    const [isPlaying, setIsPlaying] = usePlayState(autoScroll)
    const [_dataSource, _layoutProvider] = useDataState(items, multiplier, style)


    useEffect(() => {
        if (autoScroll && isPlaying && multiplier > 0) {
            const timerId = setTimeout(() => {
                const updatedFakeIndex = (currentIndexFake + 1) % (multiplier * items.length + 1)
                recyclerList.current.scrollToIndex(updatedFakeIndex, true)
            }, 3000)
            return () => clearTimeout(timerId)
        }
    }, [currentIndexFake, isPlaying, autoScroll, multiplier])


    let scrollValue = new Animated.Value(0)
    const scrollToIndex = (index: number, animation: boolean) => {
        recyclerList.current.scrollToIndex(index, animation)
    }

    const onVisibleIndicesChanged = (item) => {
        if (item.length === 1) {
            if (item[0] === 0 || item[0] === multiplier * items.length) {
                const centerIndex = (multiplier / 2) * items.length
                scrollToIndex(centerIndex, false)
            } else {
                // Its in case of else only because it will be called nextime if it is going into above if condition reason for that is scrollToIndex
                // currentIndexFake = item[0]
                setCurrentIndexFake(item[0])
            }
        }
    }


    const setScrollValue = (value: number) => {
        //Normalize value from fake index to actual index
        value = value % items.length
        if (value < 0) value = 0
        //Don't animate if you are at actual index 0 in left size and last index in right side
        if (value > items.length - 1) value = currentIndexFake % items.length === 0 ? 0 : items.length - 1
        scrollValue.setValue(value)
    }
    const onSCroll = ({nativeEvent: {contentOffset: {x}}}) => {
        setScrollValue(x / itemWidth)
    };
    const onItemLayout = ({nativeEvent: {layout: {width}}}) => {
        itemWidth = width
    }

    const onScrollAnimationEnd = () => {
        setIsPlaying(true)
    }

    const onScrollBeginDrag = () => {
        setIsPlaying(false)
    }
    //Only render RLV once you have the data
    return (
        <View style={style}>
            {_layoutProvider && _dataSource && <RecyclerListView
                initialRenderIndex={intialialScrollIndex}
                onLayout={onItemLayout}
                onScroll={onSCroll}
                ref={recyclerList}
                isHorizontal
                onScrollEndDrag={onScrollAnimationEnd}
                onScrollBeginDrag={onScrollBeginDrag}
                externalScrollView={CustomBaseScrollView}
                dataProvider={_dataSource}
                layoutProvider={_layoutProvider}
                rowRenderer={rowRenderer}
                onVisibleIndicesChanged={onVisibleIndicesChanged}
            />}
            <View style={indicatorStyle}>
                <DefaultViewPageIndicator activePage={0} pageCount={items.length} scrollOffset={0} scrollValue={scrollValue}/>
            </View>
        </View>
    );
}

SlideShow.defaultProps = {
    initialIndex: 0,
    duration: 3000,
    multiplier: 0,
    autoScroll: true,
    style: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
    },
    indicatorStyle: {
        alignItems: 'center',
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
    }
}
export default SlideShow
