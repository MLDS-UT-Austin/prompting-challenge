import { error } from "@sveltejs/kit";
import { puzzleMappings } from "../puzzles";
import type { Puzzle } from "../puzzles";

export function load({ params }: { params: { passcode: string } }) {
    const puzzle: Puzzle | undefined = puzzleMappings[params.passcode];

    if (!puzzle) {
        return error(404);
    }

    return {
        puzzle,
    };
}