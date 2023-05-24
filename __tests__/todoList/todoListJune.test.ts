import { chatGPT } from '../../src/openai';

const prompts: string[] = [
	`I want you to act as a to do list.  I will provide a set of tasks that include the task name, the due date, and the importance of the task.\nI will also include today's date.  I want you to tell me all the tasks that are due in the next 7 days and I want you to put them in order of importance.  Be sure to check the dates carefully.  Please review each task in order and compare the task due date to today's date.  If a task is listed whose date has already expired, please identify this task as past due.  Be very concise in your answer.  All I need back from you is the list of tasks due in the next seven days.\nI will then answer you back.  I may tell you that a task is already complete.  If I tell you a task is already complete, can you remove it from the to do list?  I may tell you to add a new task to the list or I may tell you to change something about one of the existing tasks.  So we might chat back and forth a few times to update the list.\nWhen this is finished, I'll ask for the updated list with all of your changes.  Can you generate a new to do list in the same JSON format I provided in the original list, e.g. task, due date, importance.  For the generated list, please be sure to include all of the original tasks, removing only those tasks that I idendtify have already been completed.  When you answer with the updated JSON formatted list, can you again be very concise and answer with this list only?  No extra chat or verbiage, strictly the list in JSON format.  That way I can cut and paste it into another program.`,
	`todoList: [{ "task": "Call Jane", "due_date": "May 29, 2023", "importance": 3 }, { "task": "Write to Jen", "due_date": "June 18, 2023", "importance": 1 }, { "task": "Write to Joe", "due_date": "May 30, 2023", "importance": 2 }, { "task": "Meet with Jose Miguel", "due_date": "June 20, 2023", "importance": 2 },{ "task": "Meet with Jen", "due_date": "July 1, 2023", "importance": 3 },{ "task": "Call Joy", "due_date": "July 2, 2023", "importance": 1 }]\ntodays date: June 19, 2023`,
	`All past due tasks are complete.  Could you please remove the past due tasks from the list?`
];

const finalJson: { task: string, due_date: string, importance: number}[] = [
	{
	  "task": "Meet with Jose Miguel",
	  "due_date": "June 20, 2023",
	  "importance": 2
	},
	{ "task": "Meet with Jen", "due_date": "July 1, 2023", "importance": 3 },
	{ "task": "Call Joy", "due_date": "July 2, 2023", "importance": 1 }
]

test('the new todo list should have three items after removing three', async () => {
  const response = await chatGPT(prompts);
	let chatResponseJson = [];
	if (response && response["data"] && response["data"]["choices"] && response["data"]["choices"][0] && response["data"]["choices"][0]["message"]) {
		const chatReponseString = response["data"]["choices"][0]["message"]["content"];
		const match = chatReponseString.match(/(\[.*\])/)
		if (match) chatResponseJson = JSON.parse(match[0]);
	}
	expect(chatResponseJson.length).toBe(3);
	expect(chatResponseJson).toMatchObject(finalJson);
});
