import styles from './QueryField.module.scss'
import { useCallback, useRef } from 'react'
import { useAppSelector } from '@/redux/hooks'
import { useDispatch } from 'react-redux'
import { selectQuery, setQuery } from '@/redux/features/AuthSlice/EditorSlice'

import SyntaxHighlighter from 'react-syntax-highlighter'
import { coldarkDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

const QueryField = () => {
  const query = useAppSelector(selectQuery)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const dispatch = useDispatch()

  const handleTextFieldChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const query = e.target.value

      dispatch(setQuery(query))
    },
    [dispatch],
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
      />
      <SyntaxHighlighter
        language="graphql"
        style={coldarkDark}
        customStyle={{
          flex: '1',
          background: 'transparent',
        }}
      >
        {query}
      </SyntaxHighlighter>
    </div>
  )
}

export default QueryField
