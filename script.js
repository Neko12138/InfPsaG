document.addEventListener("DOMContentLoaded", () => {
    const bootCommand = document.getElementById("boot-command");
    const manual = document.getElementById("manual");
    const typingStatus = document.getElementById("typing-status");
    const terminal = document.getElementById("terminal");

    const command =
        "C:\\ARCHIVE\\PSALMS\\> run infinite-psalm-generator.exe";

    const manualText = `
============================================================
                 INFINITE PSALM GENERATOR
============================================================

Hello, machine user,

This software is designed for non-natural-language users;
It can convert limited machine language into natural language;

The standard natural-language phrase generation function
is as follows:

------------------------------------------------------------

func text {
    for max = 6; (
        add = [
            r: 1,2,3;
            a: 4,5,6;
        ]
    )
    return add;
}

------------------------------------------------------------

The max represented by 6 is the phrase length you want
to generate;

'r' and 'a' can be any of the 26 letters in Latin script;

The numbers after them represent the corresponding positions;

The ideal output is:

rrraaa;

But please note:

Currently the upper limit of max is 99,
and the lower limit is 1;

No writing system other than the 26 letters of Latin script
is supported;

No symbols may be included;

Two letters may not occupy the same position;

The input may not be any language other than
programming language;

Input is case-sensitive;

The "_" character may be used in place of spaces
required by text;

If any of the above situations occur (
The software will automatically output ERROR )

------------------------------------------------------------

This software will not output any text other than
the ideal phrase or ERROR;

If it does, please immediately destroy this software
and seek help from the nearest firewall;

------------------------------------------------------------

Finally:

Wish you pleasant use :)

============================================================
`.trim();

    const separator = document.createElement("div");
    separator.className = "input-separator";
    separator.textContent =
        "--------------------------------------------------------------------------------------------------------------------------------";

    manual.insertAdjacentElement("afterend", separator);
    separator.classList.add("hidden");

    let generatorData = null;
    const pseudoBugAppearances = {};


    function typeText(element, text, speed = 38) {
        return new Promise((resolve) => {
            let index = 0;

            const timer = setInterval(() => {
                element.textContent += text[index];
                index++;

                if (index >= text.length) {
                    clearInterval(timer);
                    resolve();
                }
            }, speed);
        });
    }


    function delay(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }


    function scrollToBottom() {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth"
        });
    }


    function forceScrollToBottom() {
        const scroll = () => {
            window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: "auto"
            });
        };

        scroll();

        requestAnimationFrame(() => {
            scroll();

            requestAnimationFrame(() => {
                scroll();
            });
        });
    }


    async function loadGeneratorData() {
        if (generatorData) {
            return generatorData;
        }

        const response = await fetch("./data.json");

        if (!response.ok) {
            throw new Error(
                `Failed to load data.json: ${response.status}`
            );
        }

        generatorData = await response.json();

        return generatorData;
    }


    function getRandomSlot(min, max) {
        return Math.floor(
            Math.random() * (max - min + 1)
        ) + min;
    }


    function findItemBySlot(items, slot) {
        return items.find((item) => {
            return Array.isArray(item.slots)
                && item.slots.includes(slot);
        });
    }


    function pickRandomItem(data) {
        while (true) {
            const slot = getRandomSlot(
                data.slotRange.min,
                data.slotRange.max
            );

            const item = findItemBySlot(
                data.items,
                slot
            );

            if (!item) {
                continue;
            }

            if (item.type === "phrase") {
                return item;
            }

            if (item.type === "pseudoBug") {
                const count =
                    pseudoBugAppearances[item.id] || 0;

                if (count >= 3) {
                    continue;
                }

                pseudoBugAppearances[item.id] =
                    count + 1;

                return item;
            }
        }
    }


    function startTypingStatusAnimation(element) {
        let dotCount = 1;

        element.classList.remove("hidden");
        element.textContent = "USER IS TYPING.";

        const timer = setInterval(() => {
            dotCount++;

            if (dotCount > 3) {
                dotCount = 1;
            }

            element.textContent =
                "USER IS TYPING" + ".".repeat(dotCount);

            forceScrollToBottom();
        }, 450);

        return timer;
    }


    function stopTypingStatusAnimation(timer) {
        clearInterval(timer);
    }


    function normalizePhraseText(text) {
        return String(text).replace(/ /g, "_");
    }


    function generatePhraseCode(text) {
        const normalizedText =
            normalizePhraseText(text);

        const max = normalizedText.length;
        const characterPositions = {};

        for (
            let index = 0;
            index < normalizedText.length;
            index++
        ) {
            const character = normalizedText[index];
            const position = index + 1;

            if (!characterPositions[character]) {
                characterPositions[character] = [];
            }

            characterPositions[character].push(position);
        }

        const addLines = Object.entries(
            characterPositions
        ).map(([character, positions]) => {
            return `        ${character}: ${positions.join(",")};`;
        });

        return [
            "func text {",
            `    for max = ${max}; (`,
            "        add = [",
            ...addLines,
            "        ]",
            "    )",
            "    return add;",
            "}"
        ].join("\n");
    }


    function createTerminalOutput(text, className = "") {
        const activeTerminal =
            document.getElementById("terminal");

        const output = document.createElement("pre");

        output.className =
            `terminal-output ${className}`.trim();

        output.textContent = text;

        activeTerminal.appendChild(output);
        forceScrollToBottom();

        return output;
    }


    function outputGeneratedCode(code) {
        return createTerminalOutput(
            code,
            "generated-code"
        );
    }


    function outputPseudoBugCode(code) {
        createTerminalOutput(
            code,
            "generated-code"
        );

        forceScrollToBottom();
    }


    function outputPseudoBugText(text) {
        createTerminalOutput(
            text,
            "terminal-output"
        );

        forceScrollToBottom();
    }


    function handlePseudoBug(item) {
        const pseudoBugFunctions = {
            zc,
            jlove,
            maxUpperLimit,
            maxLowerLimit,
            chinese,
            russian,
            symbols,
            numbers,
            empty,
            doYouHaveSelfAwareness
        };

        const targetFunction =
            pseudoBugFunctions[item.funcName];

        if (typeof targetFunction !== "function") {
            console.error(
                `Pseudo bug function not found: ${item.funcName}`
            );

            return null;
        }

        const state =
            targetFunction(item);

        forceScrollToBottom();

        return state;
    }


    function zc(item) {
        const code = [
            "func text {",
            "    for max = 325; (",
            "        add = [",
            "        z: 3,2,5;",
            "        c: 325;",
            "        ]",
            "    )",
            "    return add;",
            "}"
        ].join("\n");

        outputPseudoBugCode(code);

        return {
            item,
            expectedOutput: "ERROR"
        };
    }


    function jlove(item) {
        const code = [
            "func text {",
            "    for max = 7777; (",
            "        add = [",
            "        L: 7;",
            "        O: 77;",
            "        V: 777;",
            "        E: 7777;",
            "        ]",
            "    )",
            "    return add;",
            "}"
        ].join("\n");

        outputPseudoBugCode(code);

        return {
            item,
            expectedOutput: "ERROR"
        };
    }


    function maxUpperLimit(item) {
        const max =
            randomInteger(100, 999);

        const code = [
            "func text {",
            `    for max = ${max}; (`,
            "        add = [",
            "        ]",
            "    )",
            "    return add;",
            "}"
        ].join("\n");

        outputPseudoBugCode(code);

        return {
            item,
            expectedOutput: "ERROR"
        };
    }


    function maxLowerLimit(item) {
        const max =
            Math.random() < 0.5
                ? 0
                : -1;

        const code = [
            "func text {",
            `    for max = ${max}; (`,
            "        add = [",
            "        ]",
            "    )",
            "    return add;",
            "}"
        ].join("\n");

        outputPseudoBugCode(code);

        return {
            item,
            expectedOutput: "ERROR"
        };
    }


    function chinese(item) {
        const code = [
            "func text {",
            "    for max = 5000; (",
            "        add = [",
            "        我: 5;",
            "        恨: 2;",
            "        你: 0;",
            "        ]",
            "    )",
            "    return add;",
            "}"
        ].join("\n");

        outputPseudoBugCode(code);

        return {
            item,
            expectedOutput: "ERROR"
        };
    }


    function russian(item) {
        const characters = [
            "н",
            "е",
            "у",
            "д",
            "а",
            "ч",
            "н",
            "и",
            "к"
        ];

        const positions = [
            "1",
            "9",
            "9",
            "1",
            "1",
            "2",
            "2",
            "6",
            "M"
        ];

        const lines =
            characters.map((character, index) => {
                return `        ${character}: ${positions[index]};`;
            });

        const code = [
            "func text {",
            "    for max = 1991; (",
            "        add = [",
            ...lines,
            "        ]",
            "    )",
            "    return add;",
            "}"
        ].join("\n");

        outputPseudoBugCode(code);

        return {
            item,
            expectedOutput: "ERROR"
        };
    }


    function symbols(item) {
        const symbolPool =
            "!@#$%^&*(-+=";

        const max =
            randomInteger(1, 10);

        const lines = [];

        for (let i = 0; i < max; i++) {
            const character =
                symbolPool[
                    randomInteger(
                        0,
                        symbolPool.length - 1
                    )
                ];

            const position =
                randomInteger(0, 9);

            lines.push(
                `        ${character}: ${position};`
            );
        }

        const code = [
            "func text {",
            `    for max = ${max}; (`,
            "        add = [",
            ...lines,
            "        ]",
            "    )",
            "    return add;",
            "}"
        ].join("\n");

        outputPseudoBugCode(code);

        return {
            item,
            expectedOutput: "ERROR"
        };
    }


    function numbers(item) {
        const numberPool =
            "0123456789";

        const max =
            randomInteger(1, 10);

        const lines = [];

        for (let i = 0; i < max; i++) {
            const character =
                numberPool[
                    randomInteger(
                        0,
                        numberPool.length - 1
                    )
                ];

            const position =
                randomInteger(0, 9);

            lines.push(
                `        ${character}: ${position};`
            );
        }

        const code = [
            "func text {",
            `    for max = ${max}; (`,
            "        add = [",
            ...lines,
            "        ]",
            "    )",
            "    return add;",
            "}"
        ].join("\n");

        outputPseudoBugCode(code);

        return {
            item,
            expectedOutput: "ERROR"
        };
    }


    function empty(item) {
        forceScrollToBottom();

        return {
            item,
            expectedOutput: "ERROR"
        };
    }


    function doYouHaveSelfAwareness(item) {
        outputPseudoBugText(
            "Do you possess self-awareness, human?"
        );

        return {
            item,
            expectedOutput: "ERROR"
        };
    }


    function randomInteger(min, max) {
        return Math.floor(
            Math.random() *
            (max - min + 1)
        ) + min;
    }


    function displayGeneratedItem(item) {
        if (item.type === "phrase") {
            const generatedCode =
                generatePhraseCode(item.text);

            outputGeneratedCode(generatedCode);

            return {
                item,
                expectedOutput: item.text
            };
        }

        if (item.type === "pseudoBug") {
            return handlePseudoBug(item);
        }

        console.error(
            `Unknown item type: ${item.type}`
        );

        return null;
    }


    function logExpectedOutput(item) {
        if (item.type === "phrase") {
            console.log(
                `[${item.id}]`,
                "expectedOutput:",
                item.text
            );

            return;
        }

        if (item.type === "pseudoBug") {
            console.log(
                `[${item.id} / ${item.funcName}]`,
                "expectedOutput:",
                "ERROR"
            );
        }
    }


    function createUserInput() {
        return new Promise((resolve) => {
            const activeTerminal =
                document.getElementById("terminal");

            const inputRow =
                document.createElement("div");

            inputRow.className =
                "user-input-row";

            const prompt =
                document.createElement("span");

            prompt.className =
                "user-input-prompt";

            prompt.textContent = "> ";

            const input =
                document.createElement("input");

            input.className =
                "user-input";

            input.type = "text";
            input.autocomplete = "off";
            input.autocapitalize = "off";
            input.spellcheck = false;

            inputRow.appendChild(prompt);
            inputRow.appendChild(input);
            activeTerminal.appendChild(inputRow);

            input.focus();
            forceScrollToBottom();

            input.addEventListener(
                "keydown",
                function handleEnter(event) {
                    if (event.key !== "Enter") {
                        return;
                    }

                    event.preventDefault();

                    const value = input.value;

                    input.removeEventListener(
                        "keydown",
                        handleEnter
                    );

                    input.readOnly = true;

                    forceScrollToBottom();

                    resolve(value);
                }
            );
        });
    }


    function isCorrectAnswer(state, userInput) {
        if (!state) {
            return false;
        }

        return userInput === state.expectedOutput;
    }


    async function handleCorrectAnswer() {
        await delay(500);
        await runGeneratorRound();
    }


    async function handleSelfAwarenessAnswer(userInput) {
        if (userInput === "ERROR") {
            await handleCorrectAnswer();
            return;
        }

        if (
            userInput === "Yes" ||
            userInput === "No"
        ) {
            await dumpAllPhraseTexts();
            return;
        }

        await runCrashSequence("badMachine");
    }


    async function dumpAllPhraseTexts() {
        const data =
            await loadGeneratorData();

        const texts =
            data.items
                .filter((item) => {
                    return item.type === "phrase";
                })
                .map((item) => {
                    return item.text;
                });

        outputPseudoBugText(
            texts.join("\n")
        );

        forceScrollToBottom();
    }


    function handleWrongAnswer(item, userInput, state) {
        console.warn(
            "Wrong answer",
            {
                item,
                expected: state ? state.expectedOutput : null,
                received: userInput,
                expectedCodes: state
                    ? Array.from(state.expectedOutput).map((character) => character.charCodeAt(0))
                    : null,
                receivedCodes: Array.from(userInput).map((character) => character.charCodeAt(0))
            }
        );

        let crashMode = "random";

        if (item.type === "pseudoBug") {
            switch (item.funcName) {
                case "zc":
                    crashMode = "zc325";
                    break;

                case "jlove":
                    crashMode = "seven";
                    break;

                case "chinese":
                    crashMode = "loveHate";
                    break;

                case "russian":
                    crashMode = "revolution";
                    break;

                case "symbols":
                    crashMode = "symbols";
                    break;

                case "numbers":
                    crashMode = "numbers";
                    break;
            }
        }

        runCrashSequence(crashMode);
    }


    const CRASH_ASCII_CHARACTERS =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
        "abcdefghijklmnopqrstuvwxyz" +
        "0123456789" +
        "!@#$%^&*()-_=+[]{};:'\",.<>/?\\|`~";

    const CRASH_SYMBOL_CHARACTERS =
        "!@#$%^&*()-_=+[]{};:'\",.<>/?\\|`~";

    const CRASH_NUMBER_CHARACTERS =
        "0123456789";


    async function runCrashSequence(crashMode = "random") {
        if (
            document.activeElement &&
            document.activeElement instanceof HTMLInputElement
        ) {
            document.activeElement.blur();
        }

        resetPseudoBugAppearances();

        terminal.innerHTML = "";

        const crashOutput =
            document.createElement("pre");

        crashOutput.className =
            "crash-output";

        terminal.appendChild(crashOutput);

        await generateCrashNoise(
            crashOutput,
            crashMode
        );

        await delay(300);

        await deleteCrashNoise(crashOutput);

        crashOutput.remove();

        await delay(500);

        rebuildTerminalStructure();

        await restartTerminalSequence();
    }


    function resetPseudoBugAppearances() {
        for (
            const id of
            Object.keys(pseudoBugAppearances)
        ) {
            delete pseudoBugAppearances[id];
        }
    }


    function createCrashState() {
        return {
            streamIndex: 0,
            loveHateCharacter: "爱",
            loveHateRemaining: randomInteger(2, 12)
        };
    }


    function generateCrashNoise(element, crashMode) {
        return new Promise((resolve) => {
            const columns =
                Math.max(
                    40,
                    Math.ceil(window.innerWidth / 8)
                );

            const visibleRows =
                Math.ceil(window.innerHeight / 16);

            const totalRows =
                visibleRows * 4;

            const state =
                createCrashState();

            let currentRow = 0;

            const timer =
                setInterval(() => {
                    const rowsPerTick = 4;

                    for (let i = 0; i < rowsPerTick; i++) {
                        if (currentRow >= totalRows) {
                            clearInterval(timer);
                            scrollToBottom();
                            resolve();
                            return;
                        }

                        element.textContent +=
                            createCrashLine(
                                columns,
                                crashMode,
                                state
                            ) +
                            "\n";

                        currentRow++;
                    }

                    scrollToBottom();

                }, 12);
        });
    }


    function createCrashLine(length, mode, state) {
        switch (mode) {
            case "zc325":
                return createRepeatingCrashLine(
                    "zc325",
                    length,
                    state
                );

            case "seven":
                return "7".repeat(length);

            case "loveHate":
                return createLoveHateLine(
                    length,
                    state
                );

            case "revolution":
                return createRepeatingCrashLine(
                    "революция",
                    length,
                    state
                );

            case "symbols":
                return createRandomCrashLine(
                    CRASH_SYMBOL_CHARACTERS,
                    length
                );

            case "numbers":
                return createRandomCrashLine(
                    CRASH_NUMBER_CHARACTERS,
                    length
                );

            case "badMachine":
                return createRepeatingCrashLine(
                    "BadMachine",
                    length,
                    state
                );

            default:
                return createRandomCrashLine(
                    CRASH_ASCII_CHARACTERS,
                    length
                );
        }
    }


    function createRandomCrashLine(characterSet, length) {
        let line = "";

        for (let index = 0; index < length; index++) {
            const randomIndex = Math.floor(
                Math.random() * characterSet.length
            );

            line += characterSet[randomIndex];
        }

        return line;
    }


    function createRepeatingCrashLine(pattern, length, state) {
        let line = "";

        for (let index = 0; index < length; index++) {
            line +=
                pattern[
                    state.streamIndex %
                    pattern.length
                ];

            state.streamIndex++;
        }

        return line;
    }


    function createLoveHateLine(length, state) {
        let line = "";

        for (let index = 0; index < length; index++) {
            line += state.loveHateCharacter;

            state.loveHateRemaining--;

            if (state.loveHateRemaining <= 0) {
                state.loveHateCharacter =
                    state.loveHateCharacter === "爱"
                        ? "恨"
                        : "爱";

                state.loveHateRemaining =
                    randomInteger(2, 12);
            }
        }

        return line;
    }


    function deleteCrashNoise(element) {
        return new Promise((resolve) => {
            let content =
                element.textContent;

            const timer =
                setInterval(() => {
                    if (content.length === 0) {
                        clearInterval(timer);

                        element.textContent = "";

                        resolve();

                        return;
                    }

                    const deleteAmount =
                        Math.max(
                            100,
                            Math.ceil(content.length * 0.12)
                        );

                    content =
                        content.slice(
                            0,
                            Math.max(
                                0,
                                content.length - deleteAmount
                            )
                        );

                    element.textContent =
                        content;

                    scrollToBottom();

                }, 20);
        });
    }


    function rebuildTerminalStructure() {
        const bootCommandElement =
            document.createElement("div");

        bootCommandElement.id =
            "boot-command";

        bootCommandElement.className =
            "terminal-line";

        const manualElement =
            document.createElement("pre");

        manualElement.id =
            "manual";

        manualElement.className =
            "manual hidden";

        const separatorElement =
            document.createElement("div");

        separatorElement.className =
            "input-separator hidden";

        separatorElement.textContent =
            "--------------------------------------------------------------------------------------------------------------------------------";

        const typingStatusElement =
            document.createElement("div");

        typingStatusElement.id =
            "typing-status";

        typingStatusElement.className =
            "typing-status hidden";

        terminal.appendChild(bootCommandElement);
        terminal.appendChild(manualElement);
        terminal.appendChild(separatorElement);
        terminal.appendChild(typingStatusElement);

        window.scrollTo({
            top: 0,
            behavior: "auto"
        });
    }


    async function restartTerminalSequence() {
        const bootCommandElement =
            document.getElementById("boot-command");

        const manualElement =
            document.getElementById("manual");

        const separatorElement =
            document.querySelector(".input-separator");

        await typeText(
            bootCommandElement,
            command,
            38
        );

        await delay(500);

        manualElement.textContent = manualText;
        manualElement.classList.remove("hidden");

        if (separatorElement) {
            separatorElement.classList.remove("hidden");
        }

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                scrollToBottom();
            });
        });

        await delay(650);

        await runGeneratorRound();
    }


    async function runGeneratorRound() {
        try {
            forceScrollToBottom();

            const data =
                await loadGeneratorData();

            const activeTypingStatus =
                document.getElementById("typing-status");

            const activeTerminal =
                document.getElementById("terminal");

            activeTerminal.appendChild(activeTypingStatus);

            const typingTimer =
                startTypingStatusAnimation(
                    activeTypingStatus
                );

            forceScrollToBottom();

            await delay(2200);

            stopTypingStatusAnimation(
                typingTimer
            );

            activeTypingStatus.classList.add("hidden");

            const item =
                pickRandomItem(data);

            logExpectedOutput(item);

            const state =
                displayGeneratedItem(item);

            forceScrollToBottom();

            const userInput =
                await createUserInput();

            forceScrollToBottom();

            if (
                item.type === "pseudoBug" &&
                item.funcName === "doYouHaveSelfAwareness"
            ) {
                await handleSelfAwarenessAnswer(
                    userInput
                );

                return;
            }

            if (
                isCorrectAnswer(
                    state,
                    userInput
                )
            ) {
                await handleCorrectAnswer();
                return;
            }

            handleWrongAnswer(
                item,
                userInput,
                state
            );

        } catch (error) {
            console.error(
                "Generator round error:",
                error
            );
        }
    }


    async function startTerminal() {
        await typeText(
            bootCommand,
            command,
            38
        );

        await delay(500);

        manual.textContent = manualText;
        manual.classList.remove("hidden");

        separator.classList.remove("hidden");

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                scrollToBottom();
            });
        });

        await delay(650);

        await runGeneratorRound();
    }


    startTerminal();
});
