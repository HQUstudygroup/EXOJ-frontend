function streamText(
    text: string,
    onChunk: (current: string) => void,
    totalDuration = 2000 // 总时长（ms）
) {
    const length = text.length;

    const delay = Math.max(10, totalDuration / length);

    let index = 0;

    function push() {
        if (index >= length) return;

        onChunk(text.slice(0, ++index));

        setTimeout(push, delay);
    }

    push();
}

export { streamText };
