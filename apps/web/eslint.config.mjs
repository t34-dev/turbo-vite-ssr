import js from '@eslint/js';
import { eslint } from 'typescript-eslint';

export default [
    js.configs.recommended,
    ...eslint.configs.recommended,
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        rules: {
            // Добавьте здесь свои правила
        },
    },
];
