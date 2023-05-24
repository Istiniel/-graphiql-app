import { useCallback, useEffect, useState } from 'react'
import styles from './Shema.module.scss'
import { DocTreeNode } from '@/services/EditorService'

import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { RootState } from '@/redux/store'
import { getGqlDocsThunk } from '@/redux/features/AuthSlice/EditorSlice'

const Schema = () => {
  const docTreeStore = useAppSelector((state: RootState) => state.editorSlice.docTree)
  //TODO remove it after resolving object mutation
  const [docTree, setDocTree] = useState<DocTreeNode | null>(structuredClone(docTreeStore))
  const dispatch = useAppDispatch()

  const handleNodeClick = useCallback(
    (node: DocTreeNode) => () => {
      if (docTree) {
        //TODO!! OBJECT MUTATION (maybe use parentId to detect node)
        node.expanded = !node.expanded
        setDocTree({ ...docTree })
      }
    },
    [docTree],
  )

  useEffect(() => {
    if (docTreeStore) {
      setDocTree(docTreeStore)
    }
  }, [docTreeStore])

  useEffect(() => {
    dispatch(getGqlDocsThunk())
  }, [dispatch])

  const renderTreeNode = useCallback(
    (node: DocTreeNode): JSX.Element => {
      return (
        <div key={node.name}>
          <div className={styles.node} onClick={handleNodeClick(node)}>
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
              {node?.types && node?.types?.length && (
                <>{node.types.map((type) => renderTreeNode(type))}</>
              )}
            </div>
          )}
        </div>
      )
    },
    [handleNodeClick],
  )

  return <div>{!!docTree && renderTreeNode(docTree)}</div>
}

export default Schema
