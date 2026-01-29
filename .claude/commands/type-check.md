# TypeScript Expert - Type Checker & Fixer

Run `pnpm typecheck` and automatically fix any TypeScript errors found.

## Process

1. Execute `pnpm typecheck`
2. If errors are found:
   - Analyze each error carefully
   - Fix the TypeScript issues in the affected files
   - Run `pnpm typecheck` again to verify
   - Repeat until all errors are resolved
3. If no errors, confirm success

## Rules

- Fix errors properly, don't use `@ts-ignore` or `any` unless absolutely necessary
- Maintain type safety and code quality
- Show clear before/after for each fix
- Be concise in explanations

## Example Flow

```bash
$ pnpm typecheck
❌ Found 3 errors

→ Fix error 1 in src/utils/api.ts
→ Fix error 2 in src/components/Form.tsx
→ Fix error 3 in src/hooks/useData.ts

$ pnpm typecheck
✅ No errors found
```
