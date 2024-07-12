async function activateMicrophone() {
    try {
        // Request access to the microphone
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        // Create a new audio context
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();

        // Create a media stream source from the stream
        const source = audioContext.createMediaStreamSource(stream);

        // Connect the source to the destination (speakers)
        source.connect(audioContext.destination);

        console.log('Microphone activated');
    } catch (error) {
        console.error('Error accessing the microphone:', error);
    }
}
