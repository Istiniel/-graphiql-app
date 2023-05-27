import { useCallback, useEffect } from 'react'
import styles from './Shema.module.scss'
import { DocTreeNode } from '@/services/EditorService'

import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { RootState } from '@/redux/store'
import { getGqlDocsThunk } from '@/redux/asyncThunks/editorThunks'
import { toggleDocTreeExpanded } from '@/redux/features/AuthSlice/EditorSlice'

const Schema = () => {
  const docTree = useAppSelector((state: RootState) => state.editorSlice.docTree)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getGqlDocsThunk())
  }, [dispatch])

  const handleNodeClick = useCallback(
    (node: DocTreeNode) => () => {
      if (node) {
        dispatch(toggleDocTreeExpanded(node?.name))
      }
    },
    [dispatch],
  )

  const renderTreeNode = useCallback(
    (node: DocTreeNode): JSX.Element => {
      const isChildTypesExist = node?.types && node?.types?.length > 0
      const isChildFieldsExist = node?.fields && node.fields.length > 0
      const isFieldShown =
        isChildFieldsExist ||
        !node.hasOwnProperty('fields') ||
        !node.hasOwnProperty('description') ||
        node.description

      return (
        <div key={node.name}>
          {isFieldShown && (
            <>
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
                  {isChildTypesExist && <>{node?.types?.map((type) => renderTreeNode(type))}</>}
                </div>
              )}
            </>
          )}
        </div>
      )
    },
    [handleNodeClick],
  )

  return <div>{!!docTree && renderTreeNode(docTree)}</div>
}

export default Schema
