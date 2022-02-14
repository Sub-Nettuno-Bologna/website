import S from '@sanity/desk-tool/structure-builder';
import { FiSettings, FiFileText } from 'react-icons/fi';

const hiddenDocTypes = listItem =>
  !['category', 'person', 'siteSettings', 'pagina', 'media.tag'].includes(
    listItem.getId()
  );

export default () =>
  S.list()
    .title('Contenuti')
    .items([
      S.listItem()
        .title('Pagine')
        .icon(FiFileText)
        .child(
          S.documentTypeList('category')
            .title('Categorie')
            .child(
              id =>
                S.documentList()
                  .title('Pagine')
                  .schemaType('pagina')
                  .filter('category._ref == $id')
                  .params({ id }) // use the id in the filter to return sampleProjects that has a reference to the category
            )
        ),
      // This returns an array of all the document types
      // defined in schema.js. We filter out those that we have
      // defined the structure above
      ...S.documentTypeListItems().filter(hiddenDocTypes),
      S.listItem()
        .title('Categorie')
        .schemaType('category')
        .child(S.documentTypeList('category').title('Categories')),
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
