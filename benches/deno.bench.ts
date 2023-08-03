import { hash, verify } from "../lib/mod.ts";
import { ThreadMode } from "../lib/common.ts";

const password =
	"2gnF!WAcyhp#kB@tcYQa2$A%P64jEmXY!@8n2GSH$GggfgGfP*qH!EWwDaB%5mdB6pW2fK!KD@YNjvqwREfRCCAPc54c5@Sk";
const hashed =
	"$argon2i$v=19$m=4096,t=3,p=1$i8Pd309cCOP75oN8vz8FHA$qUk1NgsxOmz3nWc54jyuOnr+3hHbZz3k0Sb13id7Ai8";

Deno.bench({
	name: "hash 100 times",
	async fn() {
		await hash(
			password,
		);
	},
});

Deno.bench({
	name: "hash 100 times with random salt",
	async fn() {
		const salt = crypto.getRandomValues(
			new Uint8Array(Math.max(8, Math.random() * 32)),
		);
		// handler.start();
		await hash(
			password,
			{ salt },
		);
		// handler.stop();
	},
});

Deno.bench({
	name: "hash 100 times with random data, secret and salt",
	async fn() {
		const salt = crypto.getRandomValues(
			new Uint8Array(Math.max(8, Math.random() * 32)),
		);
		const secret = crypto.getRandomValues(
			new Uint8Array(Math.max(8, Math.random() * 32)),
		);
		const data = {
			hashedAt: Date.now(),
		};
		// handler.start();
		await hash(
			password,
			{
				salt,
				secret,
				data,
			},
		);
		// handler.stop();
	},
});

Deno.bench({
	name: "hash 100 times with memoryCost set at 1024",
	async fn() {
		await hash(
			password,
			{
				memoryCost: 1024,
			},
		);
	},
});

Deno.bench({
	name: "hash 100 times with timeCost set at 10",
	async fn() {
		await hash(
			password,
			{
				timeCost: 6,
			},
		);
	},
});

Deno.bench({
	name: "hash 100 times with 16 lanes on sequential mode",
	async fn() {
		await hash(
			password,
			{
				threadMode: ThreadMode.Sequential,
				lanes: 16,
			},
		);
	},
});

Deno.bench({
	name: "verify 100 times",
	async fn() {
		await verify(
			hashed,
			password,
		);
	},
});
