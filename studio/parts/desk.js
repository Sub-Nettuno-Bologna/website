import S from '@sanity/desk-tool/structure-builder';
import { MdSettings } from 'react-icons/md';

const hiddenDocTypes = listItem =>
  !['category', 'person', 'siteSettings', 'media.tag'].includes(
    listItem.getId()
  );

export default () =>
  S.list()
    .title('Contenuti')
    .items([
      // This returns an array of all the document types
      // defined in schema.js. We filter out those that we have
      // defined the structure above
      ...S.documentTypeListItems().filter(hiddenDocTypes),
      S.listItem()
        .title('Categories')
        .schemaType('category')
        .child(S.documentTypeList('category').title('Categories')),
      S.listItem()
        .title('Staff')
        .schemaType('person')
        .child(S.documentTypeList('person').title('Persone')),
      S.listItem()
        .title('Configurazione')
        .icon(MdSettings)
        .child(
          S.editor()
            .id('siteSettings')
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
    ]);
