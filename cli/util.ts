import { readAll } from "@std/io";

const decoder = new TextDecoder();

export async function readStdin() {
	return decoder.decode(await readAll(Deno.stdin));
}
