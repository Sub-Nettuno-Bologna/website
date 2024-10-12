import { FiSettings, FiFileText } from 'react-icons/fi';

export default (S: any) =>
  S.list()
    .title('Contenuti')
    .items([
      S.listItem()
        .title('Pagine')
        .icon(FiFileText)
        .child(S.documentTypeList('pagina').title('Pagine')),
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
