const checkDuration = (data) => {
    if (!data.duration) {
        return 0
    }

    return data.duration;
}

export default checkDuration;