import { selectEditorData } from '@/redux/features/AuthSlice/EditorSlice'
import { useAppSelector } from '@/redux/hooks'

import SyntaxHighlighter from 'react-syntax-highlighter'
import { coldarkDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

const Results = () => {
  const data = useAppSelector(selectEditorData)

  return (
    <>
      {data && (
        <SyntaxHighlighter
          language="graphql"
          style={coldarkDark}
          customStyle={{
            flex: '1',
            background: 'transparent',
          }}
        >
          {JSON.stringify(data, null, 2)}
        </SyntaxHighlighter>
      )}
    </>
  )
}

export default Results
