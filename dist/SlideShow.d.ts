/// <reference types="react" />
import { FlexAlignType } from 'react-native';
import { RecyclerListViewProps } from "recyclerlistview/dist/reactnative/core/RecyclerListView";
interface SlidShowProps {
    initialIndex: number;
    duration: number;
    multiplier: number;
    autoScroll: boolean;
    items: any[];
    rowRenderer: (type: string | number, data: any, index: number) => null;
    style: {
        width: number;
        height: number;
    };
    recyclerViewProps?: RecyclerListViewProps;
    indicatorStyle: {
        alignItems: FlexAlignType;
        position?: 'absolute' | 'relative';
        bottom: number;
        left: number;
        right: number;
    };
}
declare const SlideShow: {
    ({ initialIndex, duration, items, rowRenderer, multiplier, style, indicatorStyle, autoScroll, recyclerViewProps }: SlidShowProps): JSX.Element;
    defaultProps: {
        initialIndex: number;
        duration: number;
        multiplier: number;
        autoScroll: boolean;
        style: {
            width: number;
            height: number;
        };
        indicatorStyle: {
            alignItems: string;
            position: string;
            bottom: number;
            left: number;
            right: number;
        };
    };
};
export default SlideShow;
