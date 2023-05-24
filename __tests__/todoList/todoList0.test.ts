import { chatGPT } from '../../src/openai';

const prompts: string[] = [];

test('blank prompts array should result in zero length response', async () => {
  const response = await chatGPT(prompts);
	let chatResponseJson = [];
	if (response && response["data"] && response["data"]["choices"] && response["data"]["choices"][0] && response["data"]["choices"][0]["message"]) {
		const chatReponseString = response["data"]["choices"][0]["message"]["content"];
		const match = chatReponseString.match(/(\[.*\])/)
		if (match) chatResponseJson = JSON.parse(match[0]);
	}
	expect(chatResponseJson.length).toBe(0);
});
