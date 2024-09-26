import {InitialConfigType, LexicalComposer} from "@lexical/react/LexicalComposer";
import {RichTextPlugin} from "@lexical/react/LexicalRichTextPlugin";
import {ContentEditable} from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";

function onError(error: Error){
	console.log(error)
}

function Editor(){
	const initialConfig: InitialConfigType = {
		namespace: 'MyEditor',
		onError: onError
	}

	return (
		<LexicalComposer initialConfig={initialConfig}>
			<RichTextPlugin contentEditable={<ContentEditable />} ErrorBoundary={LexicalErrorBoundary} />
		</LexicalComposer>
	)
}


export default Editor
