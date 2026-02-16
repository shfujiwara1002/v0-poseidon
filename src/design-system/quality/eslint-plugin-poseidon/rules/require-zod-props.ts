import type { Rule } from 'eslint'
import * as path from 'path'

/**
 * Ensures that exported React components in `design-system/components/` have
 * an accompanying `.schema.ts` file that defines their prop types with Zod.
 *
 * This convention ensures:
 *  - Runtime prop validation is available
 *  - Prop types can be used for documentation generation
 *  - Schema-first design for design system primitives
 *
 * Reports at ExportDefaultDeclaration and ExportNamedDeclaration for
 * components that appear to export React components (functions returning JSX
 * or variables referencing forwardRef / memo).
 */

const DS_COMPONENT_PATH_PATTERN = /design-system\/components\//

/** Heuristic: component names start with an uppercase letter */
function isComponentName(name: string): boolean {
  return /^[A-Z]/.test(name)
}

/**
 * Attempt to get the exported name from a declaration.
 * Returns the component name if it looks like a React component export.
 */
function getExportedComponentName(
  node: Rule.Node & { declaration?: Rule.Node | null },
): string | null {
  const decl = node.declaration

  if (!decl) return null

  // export default function MyComponent() {}
  if (
    (decl.type === 'FunctionDeclaration' || decl.type === 'FunctionExpression') &&
    (decl as any).id?.name &&
    isComponentName((decl as any).id.name)
  ) {
    return (decl as any).id.name
  }

  // export const MyComponent = ...
  if (decl.type === 'VariableDeclaration') {
    for (const declarator of (decl as any).declarations) {
      if (
        declarator.id?.type === 'Identifier' &&
        isComponentName(declarator.id.name)
      ) {
        return declarator.id.name
      }
    }
  }

  // export default identifier
  if (decl.type === 'Identifier' && isComponentName((decl as any).name)) {
    return (decl as any).name
  }

  return null
}

export const requireZodProps: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Require a corresponding .schema.ts file for exported React components in design-system/components/.',
      recommended: true,
    },
    messages: {
      missingSchema:
        'Exported component "{{name}}" is missing a companion .schema.ts file. ' +
        'Create {{schemaFile}} with a Zod schema defining the component props.',
    },
    schema: [],
  },

  create(context) {
    const filename = context.filename ?? context.getFilename()

    // Only apply to files in design-system/components/
    if (!DS_COMPONENT_PATH_PATTERN.test(filename)) {
      return {}
    }

    // Skip files that are already schema files or index files
    const basename = path.basename(filename)
    if (basename.endsWith('.schema.ts') || basename === 'index.ts' || basename === 'index.tsx') {
      return {}
    }

    /**
     * Derive the expected schema file path from the component file.
     * E.g. Surface.tsx -> Surface.schema.ts
     */
    function getExpectedSchemaFile(): string {
      const dir = path.dirname(filename)
      const ext = path.extname(filename)
      const baseName = path.basename(filename, ext)
      return path.join(dir, `${baseName}.schema.ts`)
    }

    function checkForSchema(node: Rule.Node, componentName: string) {
      const schemaFile = getExpectedSchemaFile()
      const relativeSchema = path.basename(schemaFile)

      // Use a synchronous file-existence check via the parser services
      // In ESLint, we can check if the file exists by trying to resolve it.
      // For a lint rule, we use Node's fs module.
      let schemaExists = false
      try {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const fs = require('fs')
        schemaExists = fs.existsSync(schemaFile)
      } catch {
        // If fs is unavailable (browser env), skip the check
        return
      }

      if (!schemaExists) {
        context.report({
          node,
          messageId: 'missingSchema',
          data: {
            name: componentName,
            schemaFile: relativeSchema,
          },
        })
      }
    }

    return {
      ExportDefaultDeclaration(node) {
        const name = getExportedComponentName(node as any)
        if (name) {
          checkForSchema(node as Rule.Node, name)
        }
      },

      ExportNamedDeclaration(node) {
        const name = getExportedComponentName(node as any)
        if (name) {
          checkForSchema(node as Rule.Node, name)
        }
      },
    }
  },
}
