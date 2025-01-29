const readline = require("readline");

class DefaultMap extends Map {
    constructor(defaultValue) {
        super();
        this.defaultValue = defaultValue;
    }

    get(key) {
        return this.has(key) ? super.get(key) : this.defaultValue;
    }
}

class Histogram {
    constructor() {
        this.letter_counts = new DefaultMap(0);
        this.totalLetters = 0;
    }

    add(text) {
        text = text.replace(/\s/g, "").toUpperCase(); // Remove spaces & convert to uppercase
        for (let char of text) {
            let count = this.letter_counts.get(char);
            this.letter_counts.set(char, count + 1);
            this.totalLetters++;
        }
    }

    toString() {
        let entries = [...this.letter_counts];

        // Sort: First by frequency (descending), then alphabetically (ascending)
        entries.sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));

        // Format output
        return entries
            .map(([letter, count]) => `${letter}: ${"#".repeat(count)} (${((count / this.totalLetters) * 100).toFixed(2)}%)`)
            .join("\n");
    }
}

// Create readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Ask for input
rl.question("Enter a word or sentence: ", (inputText) => {
    if (!inputText.trim()) {
        console.log("No input provided. Please enter some text.");
        rl.close();
        return;
    }

    let histogram = new Histogram();
    histogram.add(inputText);
    console.log("\nLetter Frequency Histogram:\n");
    console.log(histogram.toString());

    rl.close();
});
