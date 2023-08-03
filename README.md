# Argon2 for Deno

This repository is a continuation of
[fdionisi/deno-argon2](https://github.com/fdionisi/deno-argon2), which was no
longer actively maintained.

[Argon2](https://github.com/P-H-C/phc-winner-argon2) hashing library for
[Deno](https://deno.land). It uses
[rust-argon2](https://github.com/sru-systems/rust-argon2) via
[Deno FFI](https://deno.land/manual@v1.30.0/runtime/ffi_api), which requires
Deno v1.30.0 or higher.

## Benchmarks

See [benchmarks/](benchmarks/) folder for more details.

- hash
  \
  1.02x faster than bcrypt hash
- hash with random salt
  \
  10.24x faster than bcrypt hash with random salt
- verify
  \
  2x faster than bcrypt verify

> Benchmarks are run on a MacBook Pro (16-inch, 2019) with 2.6 GHz Hexa-Core
> Intel i7-9750H and 16 GB 2666 MHz DDR4.

## API

```ts
hash(password: string, options?: HashOptions): Promise<string>
verify(hash: string, password: string): Promise<boolean>
```

### Error handling

In case of error, all methods of this library will throw an
[`Argon2Error`](lib/error.ts) type.

## Usage

### Library

```ts
import { assert } from "https://deno.land/std/testing/asserts.ts";
import { hash, verify } from "https://deno.land/x/argon2_ffi/lib/mod.ts";

const hash = await hash("test");

assert(await verify(hash, "test"));
```

#### Testing

```ts
import { Variant } from "https://deno.land/x/argon2_ffi/lib/mod.ts";
import { assertArgon2Encoded } from "https://deno.land/x/argon2_ffi/lib/testing.ts";

Deno.test("User#password should be an argon2id variant password", async () => {
	assertArgon2Encoded(user.password, {
		variant: Variant.Argon2id,
	});
});
```

### CLI

The library can be installed as a CLI tool via `deno install`.

<details>

<summary>Installation snippet</summary>

    ```sh
    deno install \
      -A \
      --unstable \
      argon2 https://deno.land/x/argon2_ffi/cli/argon2.ts
    ```

</details>

After install run `--help` to inspect all possible commands.

## Permissions

The library automatically downloads the static library and calls the static
library's functions via FFI(Foreign Function Interface) API
([Deno: ffi docs](https://deno.land/manual@v1.30.0/runtime/ffi_api)) and it
requires `--allow-read`, `--allow-write`, `--allow-net` and `--allow-ffi`.

<details>

    ```sh
    deno \
      --allow-read \
      --allow-write \
      --allow-net \
      --allow-ffi \
      --unstable \
      lib/mod.ts
    ```

</details>

## Examples

In the `examples/` folder there you can find some usage examples.

> To run examples you must `--allow-run` since dev environment builds and
> initialize the Rust crate.

_**Available examples**_

- [Hash](examples/hash.ts)
- [Hash with options](examples/hash-with-options.ts)
- [Verify](examples/verify.ts)

## Contributing

### Project structure

```sh
deno-argon2
  ├── lib/      # Core library
  ├── native/   # Native glue code
  ├── cli/      # CLI wrapper
  ├── tests/    # TypeScript tests
  ├── benches/  # TypeScript benchmarks
  └── examples/ # Development examples
```

## License

[MIT](LICENSE)
