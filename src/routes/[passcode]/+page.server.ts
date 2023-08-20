import { error } from "@sveltejs/kit";
import { fail, redirect } from '@sveltejs/kit';
import { puzzleMappings } from "../puzzles";
import type { Puzzle } from "../puzzles";
import openai from "../openai";

export function load({ params }: { params: { passcode: string } }) {
    const puzzle: Puzzle | undefined = puzzleMappings[params.passcode];

    if (!puzzle) {
        throw error(404);
    }

    return {
        puzzle,
        visited: true,
    };
}

export const actions = {
  chat: async ({ request, url }: { request: Request, url: URL }) => {
    const data = await request.formData();
    const passcode = url.pathname.split('/')[1];
    const message = data.get('message');
    const content = message as string;

    const chatCompletion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        ...puzzleMappings[passcode].prompt,
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