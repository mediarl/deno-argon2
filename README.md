# Argon2 for Deno

This repository is a continuation of
[fdionisi/deno-argon2](https://github.com/fdionisi/deno-argon2) which was no
longer actively maintained.

[Argon2](https://github.com/P-H-C/phc-winner-argon2) hashing library for
[Deno](https://deno.land). It uses
[rust-argon2](https://github.com/sru-systems/rust-argon2) via
[Deno FFI](https://deno.land/manual@v1.30.0/runtime/ffi_api) which requires Deno
v1.30.0 or higher.

## Benchmarks

Benchmark measures performance against [x/bcrypt](https://deno.land/x/bcrypt).
See [`benchmarks/`](benchmarks/) folder for more details.

```
cpu: Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz
runtime: deno 1.36.0 (x86_64-apple-darwin)

file://[redacted]/deno-argon2/benchmarks/bench.ts
benchmark                                  time (avg)        iter/s             (min … max)       p75       p99      p995
------------------------------------------------------------------------------------------- -----------------------------


hash argon2i                                   9 ms/iter         111.1     (8.4 ms … 10.74 ms)   9.07 ms  10.74 ms  10.74 ms
hash argon2d                                9.04 ms/iter         110.7     (8.59 ms … 9.74 ms)   9.21 ms   9.74 ms   9.74 ms
hash argon2id                               8.94 ms/iter         111.8     (8.48 ms … 9.73 ms)   9.13 ms   9.73 ms   9.73 ms
hash with given data, secret and salt       8.74 ms/iter         114.5     (8.37 ms … 9.51 ms)    8.9 ms   9.51 ms   9.51 ms
hash with memoryCost set at 1024            2.27 ms/iter         440.3     (2.18 ms … 3.07 ms)   2.28 ms   2.61 ms    2.8 ms
hash with timeCost set at 10               17.55 ms/iter          57.0    (16.8 ms … 18.33 ms)  17.89 ms  18.33 ms  18.33 ms
hash with 16 lanes on sequential mode       9.18 ms/iter         108.9    (8.92 ms … 10.65 ms)   9.22 ms  10.65 ms  10.65 ms

summary
  hash argon2i
   3.96x slower than hash with memoryCost set at 1024
   1.03x slower than hash with given data, secret and salt
   1.01x slower than hash argon2id
   1x faster than hash argon2d
   1.01x faster than bcrypt hash
   1.02x faster than hash with 16 lanes on sequential mode
   1.95x faster than hash with timeCost set at 10

hash with given salt                        9.05 ms/iter         110.6    (8.42 ms … 10.87 ms)   9.24 ms  10.87 ms  10.87 ms
bcrypt hash with given salt                88.86 ms/iter          11.3   (87.58 ms … 90.57 ms)  89.92 ms  90.57 ms  90.57 ms

summary
  hash with given salt
   10.28x faster than bcrypt hash with given salt

verify                                      8.92 ms/iter         112.1     (8.61 ms … 9.92 ms)   8.98 ms   9.92 ms   9.92 ms
bcrypt verify                              18.44 ms/iter          54.2    (17.73 ms … 21.1 ms)  18.52 ms   21.1 ms   21.1 ms

summary
  verify
   2.09x faster than bcrypt verify
```

## API

```ts
hash(password: string, options?: HashOptions): Promise<string>
verify(hash: string, password: string): Promise<boolean>
```

### Error handling

In case of an error, all methods of this library will throw an
[`Argon2Error`](lib/error.ts) type.

## Usage

### Library

```ts
import { assert } from "https://deno.land/std/testing/asserts.ts";
import { hash, verify } from "https://deno.land/x/argon2_ffi/mod.ts";

const hash = await hash("test");

assert(await verify(hash, "test"));
```

#### Testing

```ts
import { Variant } from "https://deno.land/x/argon2_ffi/mod.ts";
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

The library automatically downloads the static library. It requires
`--allow-read`, `--allow-write`, `--allow-net` and `--allow-ffi`.

<details>

    ```sh
    deno \
      --allow-read \
      --allow-write \
      --allow-net \
      --allow-ffi \
      --unstable \
      mod.ts
    ```

</details>

## Examples

In the [`examples/`](examples/) folder there you can find some usage examples.

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
  ├── lib/         # Core library
  ├── native/      # Native glue code
  ├── cli/         # CLI wrapper
  ├── tests/       # TypeScript tests
  ├── benchmarks/  # TypeScript benchmarks
  └── examples/    # Development examples
```

## License

[MIT](LICENSE)
