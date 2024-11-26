# I discovered the best programming language ([Rust](https://www.rust-lang.org/)). There is no need to make my own programming language. I recommend using Rust.

# ezc

[![TS-Standard - Typescript Standard Style Guide](https://badgen.net/badge/code%20style/ts-standard/blue?icon=typescript)](https://github.com/standard/ts-standard)

## 🚧 In Progress 🚧
This project is not ready to use (and probably not ready for contributions) yet. If u have any ideas, create an issue or discussion or comment on one. 

## What
Ezc is a converter that converts [LLVM IR](https://en.wikipedia.org/wiki/LLVM#Intermediate_representation) with custom plugin to normal LLVM IR.

## Why
Ezc is supposed to be fun and easy coding that isn't interpreted. My favorite coding language is TypeScript. Python is another common coding language. Both TypeScript and Python are interpreted.

### Why not use interpreted code?
- Not usable on all computers. U can't use JavaScript on a Raspberry Pi Pico
- Slower
- U can make libraries that are compatible with basically every other coding language
- ***I feel* like** using compiled code

### Why not use C?
- There are some things u can't do in C. You can't have binded functions.
- It's very hard to modularize C code. U end up with files which are 1000 lines long!
- C is not for me

### Why not use C++
- Hard to modularize
- Some things u can't do

### Why not use Java
- Very big compile times
- I don't like Java
- Java is still interpreted

## Plugins
Plugins can:
- Have custom tokens and key words
- Have custom nodes
- Do custom type checking
- Transform their custom features into normal LLVM IR code
