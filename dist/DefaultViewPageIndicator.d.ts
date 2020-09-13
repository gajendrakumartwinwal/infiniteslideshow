import * as React from 'react';
import { Animated } from 'react-native';
interface State {
    viewWidth: number;
}
interface Props {
    pageCount: number;
    activePage: number;
    scrollOffset: number;
    scrollValue: Animated.Value;
    goToPage?: (page: number) => void;
}
declare class DefaultViewPageIndicator extends React.Component<Props, State> {
    constructor(props: any);
    renderIndicator(page: any): JSX.Element;
    render(): JSX.Element;
}
export default DefaultViewPageIndicator;
