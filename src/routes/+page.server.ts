import { puzzles, puzzleMappings } from "./puzzles";

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

    // TODO: call chatgpt api
  },
  guess: async ({ request }: { request: Request }) => {
    const data = await request.formData();
    const guess: string = data.get('guess') as string ?? '';

    if (puzzleMappings[guess]) {
      // redirect to the next puzzle
      
    } else {
      // tell user they were wrong
    }
  }
};