/// <reference types="react" />
import { BaseScrollView } from 'recyclerlistview';
export default class CustomBaseScrollView extends BaseScrollView {
    private readonly scrollViewRef;
    constructor(props: any);
    scrollTo(...args: any[]): void;
    render(): JSX.Element;
}
