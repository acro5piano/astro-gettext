import { Node } from '@astrojs/compiler/types'
import { Visitor, is } from '@astrojs/compiler/utils'

export function walkRecursively(node: Node, callback: Visitor): void {
  callback(node)
  if (is.parent(node)) {
    for (const child of node.children) {
      walkRecursively(child, callback)
    }
  }
}
