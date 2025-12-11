import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyC8DLV_4qb_G5TAEXNnVOPfwIXmA5TUrIw"; // User's key from chat/screenshot
const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
    try {
        const response = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" }).apiKey; // Just to init? No, SDK doesn't have a direct listModels on the instance usually, wait.
        // The SDK does not expose list_models in the top level class easily in some versions, but looking at docs:
        // It is usually not directly in the client for the node SDK in the same way as python.
        // Actually, checking standard usage:
        // There is no `genAI.listModels()`. We might have to use fetch directly if the SDK doesn't expose it.

        // Let's try raw REST call to be sure.
        const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
        const resp = await fetch(url);
        const data = await resp.json();

        if (data.models) {
            console.log("AVAILABLE MODELS:");
            data.models.forEach(m => console.log(`- ${m.name}`));
        } else {
            console.log("ERROR LISTING MODELS:", JSON.stringify(data, null, 2));
        }

    } catch (error) {
        console.error("Script Error:", error);
    }
}

listModels();
