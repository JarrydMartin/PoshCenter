import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import List from '@editorjs/list'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import CheckList from '@editorjs/checklist'
import Delimiter from '@editorjs/delimiter'
import Image from '@editorjs/image'

export const EDITOR_JS_TOOLS = {
    header: {
        class: Header,
        inlineToolbar: true
    },
    list: {
        class: List,
        inlineToolbar: true
    },
    embed: Embed,
    table: Table,
    marker: Marker,
    quote: {
        class: Quote,
        inlineToolbar: true,
    },
    checklist: {
        class: CheckList,
        inlineToolbar: true,
      },
    delimiter: Delimiter,
    image: {
        class: Image,
        config: {
          endpoints: {
            byUrl: 'http://localhost:3000/api/img', // Your endpoint that provides uploading by Url
          }
        }
    }
}
