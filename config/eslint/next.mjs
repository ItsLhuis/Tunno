import nextPlugin from "@next/eslint-plugin-next"

/**
 * Next.js specific ESLint config.
 * For web (Next.js) apps only.
 */
export const next = [
  {
    plugins: {
      "@next/next": nextPlugin
    },
    rules: {
      "@next/next/no-html-link-for-pages": "error",
      "@next/next/no-img-element": "warn",
      "@next/next/no-sync-scripts": "error",
      "@next/next/no-head-element": "error",
      "@next/next/no-document-import-in-page": "error",
      "@next/next/no-duplicate-head": "error",
      "@next/next/google-font-display": "warn",
      "@next/next/google-font-preconnect": "warn",
      "@next/next/no-page-custom-font": "warn",
      "@next/next/no-title-in-document-head": "error",
      "@next/next/no-unwanted-polyfillio": "warn"
    }
  }
]

export default next
