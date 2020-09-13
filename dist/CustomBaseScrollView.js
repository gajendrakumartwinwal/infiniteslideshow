"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const recyclerlistview_1 = require("recyclerlistview");
class CustomBaseScrollView extends recyclerlistview_1.BaseScrollView {
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
        return (React.createElement(react_native_1.ScrollView, Object.assign({ ref: this.scrollViewRef }, this.props, { snapToAlignment: 'center', showsHorizontalScrollIndicator: false, pagingEnabled: true, decelerationRate: 'fast' }), this.props.children));
    }
}
exports.default = CustomBaseScrollView;
//# sourceMappingURL=CustomBaseScrollView.js.map