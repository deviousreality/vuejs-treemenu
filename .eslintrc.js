module.exports = {
    parser: 'vue-eslint-parser',
    root: true,
    extends: [
        'plugin:vue/recommended',
        'plugin:@typescript-eslint/recommended',
        "@vue/typescript"
    ],
    parserOptions: {
        parser: "babel-eslint",
        project: './tsconfig.json',
        sourceType: 'module',
        "ecmaVersion": 6,
    },
    plugins: [
        '@typescript-eslint'
    ],
    rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/consistent-type-assertions': 'off',
        'vue/require-component-is': 'off'
    },
    overrides: {
        files: [
            '*.ts'
        ],
    },
    globals: {
        env: false
    }
};