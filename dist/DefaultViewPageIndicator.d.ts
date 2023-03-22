import * as React from 'react';
import {Animated} from 'react-native';
interface State {
  viewWidth: number;
}
interface Props {
  pageCount: number;
  activePage: number;
  scrollOffset: number;
  scrollValue: Animated.Value;
  goToPage?: (page: number) => void;
  dotStyle?: {
    borderColor?: string;
    borderSize?: number;
    backgroundColor?: string;
  };
  activeDotStyle?: {
    borderSize?: number;
    borderColor?: string;
    backgroundColor?: string;
  };
}
declare class DefaultViewPageIndicator extends React.Component<Props, State> {
  constructor(props: any);
  renderIndicator(page: any): JSX.Element;
  render(): JSX.Element;
}
export default DefaultViewPageIndicator;
