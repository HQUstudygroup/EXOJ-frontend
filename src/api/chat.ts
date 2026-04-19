export async function chatAPI(params: {
    baseURL: string;
    session_id: string;
    prompt: string;
    signal?: AbortSignal;
}) {
    const { baseURL, session_id, prompt, signal } = params;

    const response = await fetch(`${baseURL}/chat`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            session_id,
            prompt,
        }),
        signal,
    });

    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

    return response;
}
