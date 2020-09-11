import {Dispatch, SetStateAction, useState} from 'react';

export default function usePlayState(autoScroll: boolean): [boolean, Dispatch<SetStateAction<boolean>>] {
    const [isPlaying, setIsPlaying] = useState<boolean>(autoScroll)
    const setIsPlayingWrapper = (isplaying) => {
        autoScroll && setIsPlaying(isplaying)
    }

    return [isPlaying, setIsPlayingWrapper]
}
