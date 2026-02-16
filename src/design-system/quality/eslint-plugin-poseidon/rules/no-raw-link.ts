import type { Rule } from 'eslint'

/**
 * Detects raw `<a>` elements and `<Link>` from 'wouter' in JSX.
 *
 * The Poseidon Design System v2 provides a NavigationLink component that
 * wraps router links with proper styling, focus management, active-state
 * indicators, and accessibility attributes.
 */

export const noRawLink: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Disallow raw <a> elements and <Link> from wouter. Use NavigationLink from the design system instead.',
      recommended: true,
    },
    messages: {
      noRawAnchor:
        'Avoid raw <a> elements. Use <NavigationLink> from the design system for consistent styling, focus management, and active-state indicators.',
      noWouterLink:
        'Avoid <Link> from wouter directly. Use <NavigationLink> which wraps the router link with design-system styling and accessibility features.',
    },
    schema: [],
  },

  create(context) {
    // Track whether wouter Link is imported in this file
    const wouterLinkIdentifiers = new Set<string>()

    return {
      // Detect import { Link } from 'wouter' or import { Link as Foo } from 'wouter'
      ImportDeclaration(node) {
        if (
          node.source.value !== 'wouter' &&
          node.source.value !== 'wouter/use-browser-location'
        ) {
          return
        }

        for (const specifier of node.specifiers) {
          if (
            specifier.type === 'ImportSpecifier' &&
            specifier.imported.type === 'Identifier' &&
            specifier.imported.name === 'Link'
          ) {
            wouterLinkIdentifiers.add(specifier.local.name)
          }
        }
      },

      JSXOpeningElement(node) {
        const nameNode = node.name

        // Detect raw <a> elements
        if (nameNode.type === 'JSXIdentifier' && nameNode.name === 'a') {
          context.report({
            node,
            messageId: 'noRawAnchor',
          })
          return
        }

        // Detect wouter <Link> usage
        if (nameNode.type === 'JSXIdentifier') {
          if (wouterLinkIdentifiers.has(nameNode.name)) {
            context.report({
              node,
              messageId: 'noWouterLink',
            })
          }
        }
      },
    }
  },
}
