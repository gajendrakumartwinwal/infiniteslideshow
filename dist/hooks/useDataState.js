"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const recyclerlistview_1 = require("recyclerlistview");
/**
 * Example for multiplier 2
 *   *          1  2   3   4
 1   2   3   4   1   2   3   4   1
 0   1   2   3   4   5   6   7   8
 * @param items
 * @param multipler
 * @returns {any[]}
 */
function useDataState(items, multipler, { height, width }) {
    const [_dataSource, set_dataSource] = react_1.useState(null);
    const [_layoutProvider, set_layoutProvider] = react_1.useState(null);
    react_1.useEffect(() => {
        let dataProvider = new recyclerlistview_1.DataProvider((r1, r2) => {
            return r1 !== r2;
        });
        let i = 0;
        let fakeItems = [];
        for (; i < multipler; i++) {
            fakeItems = [...fakeItems, ...items];
        }
        set_dataSource(dataProvider.cloneWithRows([...fakeItems, items[0]]));
        set_layoutProvider(new recyclerlistview_1.LayoutProvider((index) => {
            return 'FULL';
        }, (type, dim) => {
            dim.width = width;
            dim.height = height;
        }));
    }, [items, multipler]);
    return [_dataSource, _layoutProvider];
}
exports.default = useDataState;
//# sourceMappingURL=useDataState.js.map