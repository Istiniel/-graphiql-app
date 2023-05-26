import {
  GraphQLInterfaceType,
  GraphQLNamedType,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLUnionType,
  IntrospectionQuery,
  buildClientSchema,
} from 'graphql'

type Field = {
  name: string
  description?: string
  type: string
}

export type DocTreeNode = {
  name: string
  description?: string
  fields?: Field[]
  types?: DocTreeNode[]
  expanded: boolean
}

enum FieldTypes {
  QUERY = 'Query',
  MUTATION = 'Mutation',
  SUBSCRIPTION = 'Subscription',
}

export interface DocsResponse {
  data: IntrospectionQuery
}

const excludedTypeNames: Array<string> = Object.values(FieldTypes)

class EditorService {
  static buildDocTree = (json: DocsResponse): DocTreeNode => {
    const schema: GraphQLSchema = buildClientSchema(json?.data)

    const types = schema.getTypeMap()
    const docTree = structuredClone(this.docTree)

    for (const typeName in types) {
      const type = types[typeName]

      if (!excludedTypeNames.includes(typeName)) {
        docTree.types?.push(this.processType(type, typeName))
      }
    }

    return docTree
  }

  static toggleDocTreeExpanded = (
    docTree: DocTreeNode | null,
    nodeKey: string,
  ): DocTreeNode | null => {
    const copyDocTree = structuredClone(docTree)

    const changedIndex = copyDocTree?.types?.findIndex((typeObj) => typeObj.name === nodeKey)

    if (copyDocTree && copyDocTree.types && typeof changedIndex === 'number' && changedIndex > -1) {
      copyDocTree.types[changedIndex].expanded = !copyDocTree?.types?.[changedIndex].expanded
    }

    return copyDocTree
  }

  private static processType = (type: GraphQLNamedType, typeName: string): DocTreeNode => {
    const docNode: DocTreeNode = {
      name: typeName,
      description: type.description || '',
      fields: [],
      types: [],
      expanded: false,
    }

    if (type instanceof GraphQLObjectType) {
      const fields = type.getFields()

      for (const fieldName in fields) {
        const field = fields[fieldName]

        docNode.fields?.push({
          name: field.name,
          description: field.description || '',
          type: field.type.toString(),
        })
      }
    }

    if (type instanceof GraphQLInterfaceType) {
      const interfaces = type.getInterfaces()

      for (const interfaceType of interfaces) {
        const interfaceTypeName = interfaceType.name
        docNode.types?.push(this.processType(interfaceType, interfaceTypeName))
      }
    }

    if (type instanceof GraphQLUnionType) {
      const types = type.getTypes()

      for (const unionType of types) {
        const unionTypeName = unionType.name

        docNode.types?.push(this.processType(unionType, unionTypeName))
      }
    }

    return docNode
  }

  private static docTree: Readonly<DocTreeNode> = {
    name: 'Schema',
    types: [],
    expanded: true,
  }
}

export default EditorService
