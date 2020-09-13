"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_1 = require("react");
const react_native_1 = require("react-native");
const recyclerlistview_1 = require("recyclerlistview");
const CustomBaseScrollView_1 = require("./CustomBaseScrollView");
const DefaultViewPageIndicator_1 = require("./DefaultViewPageIndicator");
const useDataState_1 = require("./hooks/useDataState");
const usePlayState_1 = require("./hooks/usePlayState");
let itemWidth;
const SlideShow = ({ initialIndex, duration, items, rowRenderer, multiplier, style, indicatorStyle, autoScroll }) => {
    const recyclerList = react_1.useRef(null);
    const intialialScrollIndex = (multiplier / 2) * items.length + initialIndex;
    const [currentIndexFake, setCurrentIndexFake] = react_1.useState(intialialScrollIndex);
    const [isPlaying, setIsPlaying] = usePlayState_1.default(autoScroll);
    const [_dataSource, _layoutProvider] = useDataState_1.default(items, multiplier, style);
    react_1.useEffect(() => {
        if (autoScroll && isPlaying) {
            const timerId = setTimeout(() => {
                const updatedFakeIndex = (currentIndexFake + 1) % (multiplier * items.length + 1);
                recyclerList.current.scrollToIndex(updatedFakeIndex, true);
            }, 3000);
            return () => clearTimeout(timerId);
        }
    }, [currentIndexFake, isPlaying, autoScroll]);
    let scrollValue = new react_native_1.Animated.Value(0);
    const scrollToIndex = (index, animation) => {
        recyclerList.current.scrollToIndex(index, animation);
    };
    const onVisibleIndicesChanged = (item) => {
        if (item.length === 1) {
            if (item[0] === 0 || item[0] === multiplier * items.length) {
                const centerIndex = (multiplier / 2) * items.length;
                scrollToIndex(centerIndex, false);
            }
            else {
                // Its in case of else only because it will be called nextime if it is going into above if condition reason for that is scrollToIndex
                // currentIndexFake = item[0]
                setCurrentIndexFake(item[0]);
            }
        }
    };
    const setScrollValue = (value) => {
        //Normalize value from fake index to actual index
        value = value % items.length;
        if (value < 0)
            value = 0;
        //Don't animate if you are at actual index 0 in left size and last index in right side
        if (value > items.length - 1)
            value = currentIndexFake % items.length === 0 ? 0 : items.length - 1;
        scrollValue.setValue(value);
    };
    const onSCroll = ({ nativeEvent: { contentOffset: { x } } }) => {
        setScrollValue(x / itemWidth);
    };
    const onItemLayout = ({ nativeEvent: { layout: { width } } }) => {
        itemWidth = width;
    };
    const onScrollAnimationEnd = () => {
        setIsPlaying(true);
    };
    const onScrollBeginDrag = () => {
        setIsPlaying(false);
    };
    //Only render RLV once you have the data
    return (React.createElement(react_native_1.View, { style: style },
        _layoutProvider && _dataSource && React.createElement(recyclerlistview_1.RecyclerListView, { initialRenderIndex: intialialScrollIndex, onLayout: onItemLayout, onScroll: onSCroll, ref: recyclerList, isHorizontal: true, onScrollEndDrag: onScrollAnimationEnd, onScrollBeginDrag: onScrollBeginDrag, externalScrollView: CustomBaseScrollView_1.default, dataProvider: _dataSource, layoutProvider: _layoutProvider, rowRenderer: rowRenderer, onVisibleIndicesChanged: onVisibleIndicesChanged }),
        React.createElement(react_native_1.View, { style: indicatorStyle },
            React.createElement(DefaultViewPageIndicator_1.default, { activePage: 0, pageCount: items.length, scrollOffset: 0, scrollValue: scrollValue }))));
};
SlideShow.defaultProps = {
    initialIndex: 0,
    duration: 3000,
    multiplier: 2,
    autoScroll: true,
    style: {
        width: react_native_1.Dimensions.get('screen').width,
        height: react_native_1.Dimensions.get('screen').height,
    },
    indicatorStyle: {
        alignItems: 'center',
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
    }
};
exports.default = SlideShow;
//# sourceMappingURL=SlideShow.js.map