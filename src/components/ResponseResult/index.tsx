import { selectEditorData } from '@/redux/features/AuthSlice/EditorSlice'
import { useAppSelector } from '@/redux/hooks'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { coldarkDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

const ResponseResult = () => {
  const data = useAppSelector(selectEditorData)

  return (
    <>
      {data && (
        <SyntaxHighlighter
          language="json"
          style={coldarkDark}
          customStyle={{
            fontSize: '15px',
            flex: '1',
            overflowY: 'scroll',
            background: 'transparent',
            maxHeight: '100%',
          }}
        >
          {JSON.stringify(data, null, 2)}
        </SyntaxHighlighter>
      )}
    </>
  )
}

export default ResponseResult
