const _scrollDirection = (currentOffset, oldOffset) => {
    const dif = currentOffset - (oldOffset || 0);

    if (Math.abs(dif) === 0) {
        return 0;
    } else if (dif < 0) {
        return -1;
    } else {
        return 1;
    }
};
export default _scrollDirection
