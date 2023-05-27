import styles from './QueryField.module.scss'
import { useCallback, useMemo, useRef } from 'react'
import { useAppSelector } from '@/redux/hooks'
import { useDispatch } from 'react-redux'
import { setHeaders, setQuery, setVariables } from '@/redux/features/AuthSlice/EditorSlice'
import { RootState } from '@/redux/store'

const QueryField: React.FC<{ fieldType: 'query' | 'variables' | 'headers' }> = ({ fieldType }) => {
  const actions = useMemo(
    () => ({
      query: setQuery,
      variables: setVariables,
      headers: setHeaders,
    }),
    [],
  )

  const query = useAppSelector((state: RootState) => state.editorSlice[fieldType])
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const dispatch = useDispatch()

  const handleTextFieldChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const query = e.target.value
      dispatch(actions[fieldType](query))

      const regex = /ERROR/i

      if (regex.test(e.target.value)) {
        throw new Error(`${Math.round(Math.random() * 1000)}`)
      }
    },
    [dispatch, actions, fieldType],
  )

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={() => textareaRef.current?.focus()}
      onClick={() => textareaRef.current?.focus()}
      className={styles.editorTextAreaContainer}
    >
      <textarea
        className={styles.editorTextArea}
        ref={textareaRef}
        value={query}
        onChange={handleTextFieldChange}
        data-scrolly={textareaRef.current?.scrollTop || 0}
      />
    </div>
  )
}

export default QueryField
