call tsc .\fuzzer.ts
call tsc .\fuzzee.ts
cls
node .\fuzzer.js .\fuzzee.js