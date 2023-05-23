const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

/**
 * Generates a chat-based response from the ChatGPT model.
 *
 * @param prompts An array of strings representing one or more user role prompts.
 * @returns A Promise that resolves to the response generated by the ChatGPT model.
 */
export async function chatGPT(prompts: string[]) {
	// Prepare initial messages with a system role message
	const messages = [
		{ role: "system", content: "Assistant is a large language model trained by OpenAI." },
	];

	// Add user prompts to the messages array
	for (let p of prompts) {
		messages.push({ role: "user", content: p });
	}

	try {
		// Create a chat completion using the OpenAI API
		const response = await openai.createChatCompletion({
			model: "gpt-3.5-turbo",
			messages: messages,
			temperature: 0,
		});

		// Return the generated response
		return response;
	} catch (error) {
		console.error("Error:", error);
		return error;
	}
};
