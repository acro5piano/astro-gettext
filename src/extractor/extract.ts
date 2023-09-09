import { Node, parse } from '@astrojs/compiler'
import { Visitor, is } from '@astrojs/compiler/utils'

function walkRecursively(node: Node, callback: Visitor): void {
  if (is.parent(node)) {
    for (const child of node.children) {
      walkRecursively(child, callback)
    }
  } else {
    callback(node)
  }
}

export async function extract(input: string) {
  const result = await parse(input, {})

  let results: string[] = []
  walkRecursively(result.ast, (node) => {
    if (is.text(node) && node.value.trim()) {
      results.push(node.value)
    }
  })

  return results
}
