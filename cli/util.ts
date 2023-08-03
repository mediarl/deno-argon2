import { readAll } from "std/streams/mod.ts";

const decoder = new TextDecoder();

export async function readStdin() {
	return decoder.decode(await readAll(Deno.stdin));
}
