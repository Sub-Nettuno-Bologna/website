import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import {
  ComposeIcon,
  ImagesIcon,
  BookIcon,
  HomeIcon,
  CalendarIcon,
  DatabaseIcon,
  PresentationIcon,
  TagsIcon,
  SchemaIcon,
  SearchIcon,
} from "@sanity/icons";

export default (S: any, context: any) => {
  return S.list()
    .title("Contenuti Dinamici")
    .items([
      S.listItem()
        .title("Pagine")
        .icon(ComposeIcon)
        .child(
          S.list()
            .title("Pagine")
            .items([
              S.listItem()
                .title("Home")
                .icon(HomeIcon)
                .child(
                  S.list()
                    .title("Home")
                    .items([
                      S.listItem()
                        .title("Hero")
                        .icon(ImagesIcon)
                        .child(
                          S.editor()
                            .id("hero")
                            .schemaType("hero")
                            .documentId("hero")
                        ),
                    ])
                ),
              S.listItem()
                .title("Chi Siamo")
                .icon(PresentationIcon)
                .child(
                  S.editor()
                    .id("aboutus")
                    .schemaType("aboutus")
                    .documentId("aboutus")
                ),
              // Categorie Corsi
              orderableDocumentListDeskItem({
                title: "Corsi",
                type: "course-category",
                S,
                context,
                icon: TagsIcon,
              }),

              // Team
              orderableDocumentListDeskItem({
                title: "Team",
                type: "team",
                S,
                context,
                icon: SchemaIcon,
              }),

              // Blog
              S.listItem()
                .title("Blog")
                .icon(BookIcon)
                .child(S.documentTypeList("blog").title("Post Blog")),

              // Eventi
              S.listItem()
                .title("Eventi")
                .icon(CalendarIcon)
                .child(S.documentTypeList("event").title("Eventi")),
            ])
        ),

      // Dati del Club
      S.listItem()
        .title("Dati del Club")
        .icon(DatabaseIcon)
        .child(S.editor().id("club").schemaType("club").documentId("club")),

      // SEO
      S.listItem()
        .title("SEO")
        .icon(SearchIcon)
        .child(S.editor().id("seo").schemaType("seo").documentId("seo")),
    ]);
};
