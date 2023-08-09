import { puzzles, puzzleMappings } from "./puzzles";
import { fail, redirect } from '@sveltejs/kit';
import openai from "./openai";

export function load({ cookies }) {
  const visited = cookies.get('visited') === 'true';

  cookies.set('visited', 'true', { path: '/' });

  return {
    puzzle: puzzles[0],
    visited,
  };
};

export const actions = {
  chat: async ({ request }: { request: Request }) => {
    const data = await request.formData();
    const message = data.get('message');
    const content = message as string;

    const chatCompletion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        ...puzzles[0].prompt,
        {
          role: "user",
          content
        }
      ],
    });

    return {
      message: chatCompletion.data.choices[0].message?.content ?? '',
    }
  },
  guess: async ({ request }: { request: Request }) => {
    const data = await request.formData();
    let guess: string = data.get('guess') as string ?? '';
    guess = guess.toLowerCase();

    if (puzzleMappings[guess]) {
      throw redirect(303, guess);
    } else {
      return fail(404);
    }
  }
};