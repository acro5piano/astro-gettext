import { Node } from '@astrojs/compiler'
import { Visitor, is } from '@astrojs/compiler/utils'

export function walkRecursively(node: Node, callback: Visitor): void {
  if (is.parent(node)) {
    for (const child of node.children) {
      walkRecursively(child, callback)
    }
  } else {
    callback(node)
  }
}
