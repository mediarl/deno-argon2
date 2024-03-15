export enum Argon2ErrorType {
	UnmeetPermission = "UnmeetPermission",
	InvalidInput = "InvalidInput",
	Native = "Native",
}

export class Argon2Error extends Error {
	constructor(
		public readonly type: Argon2ErrorType,
		message: string,
		public readonly originalError?: unknown,
	) {
		super(message);
	}

	get name(): string {
		return `Argon2Error(${this.type})`;
	}
}
