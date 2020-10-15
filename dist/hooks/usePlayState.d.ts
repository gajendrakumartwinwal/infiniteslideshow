import { Dispatch, SetStateAction } from 'react';
export default function usePlayState(autoScroll: boolean): [boolean, Dispatch<SetStateAction<boolean>>];
