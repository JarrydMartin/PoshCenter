import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import List from '@editorjs/list'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
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
    embed: {
      class: Embed,
      config: {
        services: {
          youtube: true
        }
      }
    },
    table: Table,
    marker: Marker,
    quote: {
        class: Quote,
        inlineToolbar: true,
    },
    delimiter: Delimiter,
    image: {
        class: Image,
        config: {
          endpoints: {
            byUrl: '/api/img', // Your endpoint that provides uploading by Url
          }
        }
    }
}
