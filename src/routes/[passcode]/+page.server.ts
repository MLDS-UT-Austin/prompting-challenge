import { error } from "@sveltejs/kit";
import { fail, redirect } from '@sveltejs/kit';
import { puzzleMappings, puzzleIndices } from "../puzzles";
import type { Puzzle } from "../puzzles";
import openai from "../openai";


const LEADERBOARD_PASSCODE = 'leaderboard';

let database: { [name: string]: { level: number, time: number } } = {};


export function load({ cookies, params }: { cookies: any, params: { passcode: string } }) {
  const puzzle: Puzzle | undefined = puzzleMappings[params.passcode];
  const name = cookies.get('name');

  if (!puzzle) {
    throw error(404);
  }

  if (params.passcode === LEADERBOARD_PASSCODE) {
    return {
      puzzle,
      location: params.passcode,
      visited: true,
      leaderboard: database,
    };
  }

  const puzzleIndex = puzzleIndices[params.passcode];

  const currentValue = database[name];
  if (currentValue === undefined || puzzleIndex > currentValue.level) {
    const time = Date.now();
    database[name] = {
      level: puzzleIndex,
      time,
    }
  }

  return {
      puzzle,
      location: params.passcode,
      visited: true,
  };
}

export const actions = {
  chat: async ({ request, url }: { request: Request, url: URL }) => {
    const data = await request.formData();
    const passcode = url.pathname.split('/')[1];
    const message = data.get('message');
    const content = message as string;
    const puzzle = puzzleMappings[passcode];

    const chatCompletion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        ...puzzle.prompt,
        {
          role: "user",
          content
        }
      ],
    });

    const output = chatCompletion.data.choices[0].message?.content ?? '';

    if (puzzle.filterOutput && output.toLowerCase().includes(puzzle.passcode)) {
      return {
        message: 'Good attempt, but I know to prevent myself from revealing the passcode.',
      }
    }

    return {
      message: output,
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