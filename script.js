function getResponse() {
    // Get the user input from the textarea
    var inputText = document.getElementById("userInput").value;
    
    // Log the input for debugging
    console.log("Input: " + inputText);

    // Check if input is valid
    if (!inputText || inputText.trim() === "") {
        document.getElementById("responseOutput").innerHTML = "Sorry, I didn't receive any input. Could you please say something?";
        return;
    }

    // Define word-to-connotation mapping with 50 inputs and corresponding connotations
    var wordConnotations = {
        "please": 1,
        "thank": 1,
        "sorry": 2,
        "help": 3,
        "yes": 5,
        "no": 2,
        "goodbye": 2,
        "hello": 1,
        "mate": 1,
        "wow": 3,
        "amazing": 3,
        "awesome": 3,
        "how": 4,
        "what": 4,
        "why": 4,
        "can": 4,
        "i": 5,
        "you": 5,
        "good": 5,
        "bad": 2,
        "okay": 5,
        "sure": 5,
        "happening": 4,
        "excuse": 1,
        "confused": 4,
        "question": 4,
        "excited": 3,
        "nice": 1,
        "sad": 2,
        "bye": 2,
        "love": 1,
        "hate": 2,
        "great": 1,
        "understand": 4,
        "greetings": 1,
        "surprised": 3,
        "ready": 5,
        "problem": 2,
        "solution": 5,
        "confirm": 5
    };

    // Define connotation to response mapping with 50 responses
    var responseMapping = {
        1: ["Sorry", "Thank you", "You're welcome", "How can I help?", "Hello there!", "I’m glad to help!", "Nice to meet you"],
        2: ["Goodbye", "See you later", "Take care", "Farewell", "Sorry about that!", "Goodbye for now", "Until next time!"],
        3: ["Wow! That’s amazing!", "Awesome!", "That’s great!", "Incredible!", "Fantastic!", "You're amazing!", "So exciting!"],
        4: ["I’m not sure about that. Can you clarify?", "How can I help you with that?", "What do you mean?", "Could you elaborate on that?"],
        5: ["Okay!", "Sure, let’s do it.", "Alright!", "Got it!", "Understood!", "Yes, absolutely!", "I'm on it!", "Let's go!"]
    };

    // Clean up the input by removing punctuation marks and splitting by spaces
    var words = inputText.toLowerCase().replace(/[.,!?]/g, "").split(/\s+/);
    var connotations = [];

    // Collect connotation values for each word in the input
    for (var i = 0; i < words.length; i++) {
        var word = words[i].trim();
        if (wordConnotations[word]) {
            connotations.push(wordConnotations[word]);
        }
    }

    // If no valid words were found, return a generic response
    if (connotations.length === 0) {
        document.getElementById("responseOutput").innerHTML = "Sorry, I didn't recognize any valid commands. Please try again.";
        return;
    }

    // Find the most common connotation (if multiple, use the last one)
    var mostCommonConnotation = getMostCommonConnotation(connotations);

    // Get the corresponding response for the most common connotation
    var finalResponse = getResponseByConnotation(mostCommonConnotation);

    // Display the final response in the HTML element
    document.getElementById("responseOutput").innerHTML = finalResponse;
}

// Helper function to find the most common connotation
function getMostCommonConnotation(connotations) {
    var count = {};
    for (var i = 0; i < connotations.length; i++) {
        var connotation = connotations[i];
        count[connotation] = count[connotation] ? count[connotation] + 1 : 1;
    }

    var sortedConnotations = Object.keys(count).sort(function(a, b) {
        return count[b] - count[a];
    });

    return parseInt(sortedConnotations[0]);
}

// Helper function to get response based on connotation
function getResponseByConnotation(connotation) {
    var responseMapping = {
        1: ["Sorry", "Thank you", "You're welcome", "How can I help?", "Hello there!"],
        2: ["Goodbye", "Take care", "Farewell", "Sorry about that!"],
        3: ["Wow!", "Awesome!", "Incredible!", "Fantastic!"],
        4: ["Can you clarify?", "How can I help?", "What do you mean?"],
        5: ["Okay!", "Sure!", "Got it!", "Let's go!"]
    };

    var responses = responseMapping[connotation];
    if (responses) {
        var randomIndex = Math.floor(Math.random() * responses.length);
        return responses[randomIndex];
    } else {
        return "Sorry, I don't understand that.";
    }
}
