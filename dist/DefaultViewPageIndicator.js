"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const DOT_SIZE = 6;
const DOT_SAPCE = 4;
let styles = react_native_1.StyleSheet.create({
    tab: {
        alignItems: 'center',
    },
    tabs: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dot: {
        width: DOT_SIZE,
        height: DOT_SIZE,
        borderRadius: DOT_SIZE / 2,
        backgroundColor: '#E0E1E2',
        marginLeft: DOT_SAPCE,
        marginRight: DOT_SAPCE,
    },
    curDot: {
        position: 'absolute',
        width: DOT_SIZE,
        height: DOT_SIZE,
        borderRadius: DOT_SIZE / 2,
        backgroundColor: '#80ACD0',
        marginHorizontal: DOT_SAPCE,
        bottom: 0,
    },
});
class DefaultViewPageIndicator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewWidth: 0,
        };
        this.renderIndicator = this.renderIndicator.bind(this);
    }
    renderIndicator(page) {
        return (React.createElement(react_native_1.TouchableOpacity, { style: styles.tab, key: 'idc_' + page, onPress: () => this.props.goToPage(page) },
            React.createElement(react_native_1.View, { style: styles.dot })));
    }
    render() {
        const pageCount = this.props.pageCount;
        const itemWidth = DOT_SIZE + (DOT_SAPCE * 2);
        const offset = (this.state.viewWidth - itemWidth * pageCount) / 2 + itemWidth * this.props.activePage;
        //var left = offset;
        const offsetX = itemWidth * (this.props.activePage - this.props.scrollOffset);
        const left = this.props.scrollValue.interpolate({
            inputRange: [0, 1], outputRange: [offsetX, offsetX + itemWidth]
        });
        const indicators = [];
        for (var i = 0; i < pageCount; i++) {
            indicators.push(this.renderIndicator(i));
        }
        return (React.createElement(react_native_1.View, { style: styles.tabs, onLayout: (event) => {
                const viewWidth = event.nativeEvent.layout.width;
                if (!viewWidth || this.state.viewWidth === viewWidth) {
                    return;
                }
                this.setState({
                    viewWidth: viewWidth,
                });
            } },
            indicators,
            React.createElement(react_native_1.Animated.View, { style: [styles.curDot, { left }] })));
    }
}
exports.default = DefaultViewPageIndicator;
//# sourceMappingURL=DefaultViewPageIndicator.js.map