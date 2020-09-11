import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {BaseLayoutProvider, DataProvider, LayoutProvider} from "recyclerlistview";


/**
 * Example for multiplier 2
 *   *          1  2   3   4
 1   2   3   4   1   2   3   4   1
 0   1   2   3   4   5   6   7   8
 * @param items
 * @param multipler
 * @returns {any[]}
 */
export default function useDataState(items: object[], multipler: number, {height, width}: {height: number, width: number}): [DataProvider, BaseLayoutProvider] {
    const [_dataSource, set_dataSource] = useState<DataProvider>(null)
    const [_layoutProvider, set_layoutProvider] = useState<BaseLayoutProvider>(null)

    useEffect(() => {
        let dataProvider = new DataProvider((r1, r2) => {
            return r1 !== r2;
        });
        let i = 0
        let fakeItems = []
        for (; i < multipler; i++) {
            fakeItems = [...fakeItems, ...items]
        }
        set_dataSource(dataProvider.cloneWithRows([...fakeItems, items[0]]));
        set_layoutProvider(new LayoutProvider(
            (index) => {
                return 'FULL';
            },
            (type, dim) => {
                dim.width = width;
                dim.height = height;
            }
        ))
    }, [items, multipler])

    return [_dataSource, _layoutProvider]
}
