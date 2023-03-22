import * as React from 'react';
import {StyleSheet, TouchableOpacity, View, Animated} from 'react-native';

const DOT_SIZE = 6;
const DOT_SAPCE = 4;

let styles = StyleSheet.create({
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

class DefaultViewPageIndicator extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      viewWidth: 0,
    };
    this.renderIndicator = this.renderIndicator.bind(this);
  }

  renderIndicator(page) {
    return (
      <TouchableOpacity
        style={styles.tab}
        key={'idc_' + page}
        onPress={() => this.props.goToPage(page)}>
        <View style={[styles.dot, this.props.dotStyle]} />
      </TouchableOpacity>
    );
  }

  render() {
    const pageCount = this.props.pageCount;
    const itemWidth = DOT_SIZE + DOT_SAPCE * 2;
    const offset =
      (this.state.viewWidth - itemWidth * pageCount) / 2 +
      itemWidth * this.props.activePage;

    //var left = offset;
    const offsetX =
      itemWidth * (this.props.activePage - this.props.scrollOffset);
    const left = this.props.scrollValue.interpolate({
      inputRange: [0, 1],
      outputRange: [offsetX, offsetX + itemWidth],
    });

    const indicators = [];
    for (var i = 0; i < pageCount; i++) {
      indicators.push(this.renderIndicator(i));
    }

    return (
      <View
        style={styles.tabs}
        onLayout={(event) => {
          const viewWidth = event.nativeEvent.layout.width;
          if (!viewWidth || this.state.viewWidth === viewWidth) {
            return;
          }
          this.setState({
            viewWidth: viewWidth,
          });
        }}>
        {indicators}
        <Animated.View
          style={[styles.curDot, {left}, this.props.activeDotStyle]}
        />
      </View>
    );
  }
}

export default DefaultViewPageIndicator;
