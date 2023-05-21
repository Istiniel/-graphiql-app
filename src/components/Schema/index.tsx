import { useEffect, useState } from 'react'
import {
  getIntrospectionQuery,
  buildClientSchema,
  GraphQLSchema,
  GraphQLNamedType,
  GraphQLObjectType,
  GraphQLInterfaceType,
  GraphQLUnionType,
} from 'graphql'
import styles from './Shema.module.scss'
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
// import coy from 'react-syntax-highlighter/dist/cjs/styles/prism/coy'

type DocTreeNode = {
  name: string
  description?: string
  fields?: Field[]
  types?: DocTreeNode[]
  expanded: boolean
}

type Field = {
  name: string
  description?: string
  type: string
}

const Schema = () => {
  const [docTree, setDocTree] = useState<DocTreeNode | null>(null)

  const handleNodeClick = (node: DocTreeNode) => {
    if (docTree) {
      node.expanded = !node.expanded
      setDocTree({ ...docTree })
    }
  }

  useEffect(() => {
    const fetchSchema = async () => {
      try {
        const response = await fetch('https://rickandmortyapi.com/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: getIntrospectionQuery(),
          }),
        })

        const { data } = await response.json()
        const schema = buildClientSchema(data)

        const docTree = buildDocTree(schema)
        setDocTree(docTree)
      } catch (error) {
        console.error(error)
      }
    }

    fetchSchema()
  }, [])

  const buildDocTree = (schema: GraphQLSchema): DocTreeNode => {
    const types = schema.getTypeMap()

    const processType = (type: GraphQLNamedType, typeName: string): DocTreeNode => {
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
          docNode.types?.push(processType(interfaceType, interfaceTypeName))
        }
      }

      if (type instanceof GraphQLUnionType) {
        const types = type.getTypes()
        for (const unionType of types) {
          const unionTypeName = unionType.name
          docNode.types?.push(processType(unionType, unionTypeName))
        }
      }

      return docNode
    }

    const docTree: DocTreeNode = {
      name: 'Schema',
      types: [],
      expanded: true,
    }

    for (const typeName in types) {
      const type = types[typeName]
      if (typeName !== 'Query' && typeName !== 'Mutation' && typeName !== 'Subscription') {
        docTree.types?.push(processType(type, typeName))
      }
    }

    return docTree
  }

  const renderTreeNode = (node: DocTreeNode): JSX.Element => {
    return (
      <div key={node.name}>
        <div className={styles.node} onClick={() => handleNodeClick(node)}>
          <span className={styles.nodeName}>{node.name}</span>
        </div>
        {node.expanded && (
          <div style={{ marginLeft: '20px' }}>
            {node.description && <div>{node.description}</div>}
            {node.fields && node.fields.length > 0 && (
              <>
                <ul>
                  {node.fields.map((field) => (
                    <li key={field.name}>
                      <span className={styles.fieldName}>{field.name}</span>
                      <span className={styles.fieldType}>: {field.type}</span>
                      {field.description && (
                        <div className={styles.fieldDescription}>{field.description}</div>
                      )}
                    </li>
                  ))}
                </ul>
              </>
            )}
            {node.types && node.types.length > 0 && (
              <>{node.types.map((type) => renderTreeNode(type))}</>
            )}
          </div>
        )}
      </div>
    )
  }

  // if (!docTree) {
  //   return <div>Loading...</div>
  // }

  return <div>{!!docTree && renderTreeNode(docTree)}</div>
}

export default Schema
