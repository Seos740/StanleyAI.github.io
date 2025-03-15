var wordValues = {
    "please": 1.1, "thank": 1.2, "sorry": 2.0, "help": 3.1, "yes": 5.0,
    "no": 2.5, "goodbye": 2.3, "hello": 1.0, "mate": 1.4, "wow": 3.5,
    "amazing": 3.7, "awesome": 3.8, "how": 4.1, "what": 4.2, "why": 4.3,
    "can": 4.4, "i": 5.0, "you": 5.1, "good": 5.2, "bad": 2.7, "okay": 5.4,
    "sure": 5.5, "happening": 4.5, "excuse": 1.5, "confused": 4.6, "question": 4.7,
    "excited": 3.9, "nice": 1.6, "sad": 2.8, "bye": 2.9, "love": 1.3,
    "hate": 2.4, "great": 1.7, "understand": 4.8, "greetings": 1.8, "surprised": 3.6,
    "ready": 5.6, "problem": 2.6, "solution": 5.7, "confirm": 5.8
};

function getResponse() {
    var inputText = document.getElementById("userInput").value;
    console.log("Input: " + inputText);

    if (!inputText || inputText.trim() === "") {
        document.getElementById("responseOutput").innerHTML = "Sorry, I didn't receive any input. Could you please say something?";
        return;
    }

    var words = inputText.toLowerCase().replace(/[.,!?]/g, "").split(/\s+/);
    var values = [];

    for (var i = 0; i < words.length; i++) {
        var word = words[i].trim();
        if (wordValues[word]) {
            values.push(wordValues[word]);
        }
    }

    if (values.length === 0) {
        document.getElementById("responseOutput").innerHTML = "I'm not sure what you mean. Could you elaborate?";
        return;
    }

    var avgValue = values.reduce((a, b) => a + b, 0) / values.length;
    var closestWord = Object.keys(wordValues).reduce((prev, curr) => 
        Math.abs(wordValues[curr] - avgValue) < Math.abs(wordValues[prev] - avgValue) ? curr : prev);
    
    document.getElementById("responseOutput").innerHTML = generateDynamicResponse(closestWord, inputText);
}

function generateDynamicResponse(word, input) {
    var responseTemplates = [
        "I see you're talking about {word}. Can you tell me more?",
        "{word}? That's interesting! What do you mean exactly?",
        "It sounds like you are referring to {word}. Let's discuss this further!",
        "Ah, {word}! That's a fascinating topic!"
    ];
    
    var randomIndex = Math.floor(Math.random() * responseTemplates.length);
    return responseTemplates[randomIndex].replace("{word}", word);
}
