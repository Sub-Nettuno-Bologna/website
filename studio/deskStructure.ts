import { FiSettings, FiFileText } from 'react-icons/fi';

const hiddenDocTypes = (listItem) =>
  !['person', 'siteSettings', 'pagina', 'media.tag', 'event'].includes(
    listItem.getId()
  );

export default (S) =>
  S.list()
    .title('Contenuti')
    .items([
      S.listItem()
        .title('Pagine')
        .icon(FiFileText)
        .child(S.documentTypeList('pagina').title('Pagine')),
      /*  S.listItem()
        .title('All Pagine')
        .icon(FiFileText)
        .child(S.documentTypeList('pagina').title('Pagine ')), */
      // This returns an array of all the document types
      // defined in schema.js. We filter out those that we have
      // defined the structure above
      ...S.documentTypeListItems().filter(hiddenDocTypes),
      S.listItem()
        .title('Eventi')
        .schemaType('event')
        .child(S.documentTypeList('event').title('Eventi')),
      S.listItem()
        .title('Staff')
        .schemaType('person')
        .child(S.documentTypeList('person').title('Persone')),
      S.divider(),
      S.listItem()
        .title('Configurazione')
        .icon(FiSettings)
        .child(
          S.editor()
            .id('siteSettings')
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
    ]);
