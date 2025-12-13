import { defineType } from 'sanity';

export default defineType({
    name: 'seo',
    title: 'SEO',
    type: 'document',
    fields: [
        {
            name: 'siteName',
            title: 'Nome del Sito',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'siteUrl',
            title: 'URL del Sito',
            type: 'url',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'inLanguage',
            title: 'Lingua',
            type: 'string',
            initialValue: 'it-IT',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'organization',
            title: 'Organizzazione',
            type: 'object',
            fields: [
                {
                    name: 'name',
                    title: 'Nome',
                    type: 'string',
                    validation: (Rule) => Rule.required(),
                },
                {
                    name: 'alternateName',
                    title: 'Nome Alternativo',
                    type: 'string',
                },
                {
                    name: 'url',
                    title: 'URL',
                    type: 'url',
                    validation: (Rule) => Rule.required(),
                },
                {
                    name: 'email',
                    title: 'Email',
                    type: 'string',
                    validation: (Rule) => Rule.email(),
                },
                {
                    name: 'telephone',
                    title: 'Telefono',
                    type: 'string',
                },
                {
                    name: 'logo',
                    title: 'Logo',
                    type: 'image',
                    options: {
                        hotspot: true,
                    },
                },
                {
                    name: 'image',
                    title: 'Immagine',
                    type: 'image',
                    options: {
                        hotspot: true,
                    },
                },
                {
                    name: 'description',
                    title: 'Descrizione',
                    type: 'text',
                },
                {
                    name: 'priceRange',
                    title: 'Fascia di Prezzo',
                    type: 'string',
                    description: 'Es: €€',
                },
                {
                    name: 'areaServedCity',
                    title: 'Città Servita',
                    type: 'string',
                },
                {
                    name: 'sameAs',
                    title: 'Social Media e Link Correlati',
                    type: 'array',
                    of: [{ type: 'url' }],
                },
                {
                    name: 'address',
                    title: 'Indirizzo',
                    type: 'object',
                    fields: [
                        {
                            name: 'streetAddress',
                            title: 'Via e Numero',
                            type: 'string',
                        },
                        {
                            name: 'addressLocality',
                            title: 'Città',
                            type: 'string',
                        },
                        {
                            name: 'postalCode',
                            title: 'CAP',
                            type: 'string',
                        },
                        {
                            name: 'addressRegion',
                            title: 'Regione',
                            type: 'string',
                        },
                        {
                            name: 'addressCountry',
                            title: 'Paese',
                            type: 'string',
                            initialValue: 'IT',
                        },
                    ],
                },
                {
                    name: 'geo',
                    title: 'Coordinate Geografiche',
                    type: 'object',
                    fields: [
                        {
                            name: 'latitude',
                            title: 'Latitudine',
                            type: 'number',
                        },
                        {
                            name: 'longitude',
                            title: 'Longitudine',
                            type: 'number',
                        },
                    ],
                },
                {
                    name: 'offerCatalogName',
                    title: 'Nome Catalogo Offerte',
                    type: 'string',
                },
                {
                    name: 'aggregateRating',
                    title: 'Valutazione Aggregata',
                    type: 'object',
                    fields: [
                        {
                            name: 'ratingValue',
                            title: 'Valutazione',
                            type: 'string',
                        },
                        {
                            name: 'reviewCount',
                            title: 'Numero Recensioni',
                            type: 'string',
                        },
                    ],
                },
                {
                    name: 'reviews',
                    title: 'Recensioni',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                {
                                    name: 'authorName',
                                    title: 'Nome Autore',
                                    type: 'string',
                                },
                                {
                                    name: 'datePublished',
                                    title: 'Data Pubblicazione',
                                    type: 'date',
                                },
                                {
                                    name: 'reviewBody',
                                    title: 'Testo Recensione',
                                    type: 'text',
                                },
                                {
                                    name: 'rating',
                                    title: 'Valutazione',
                                    type: 'object',
                                    fields: [
                                        {
                                            name: 'ratingValue',
                                            title: 'Valutazione',
                                            type: 'string',
                                        },
                                        {
                                            name: 'bestRating',
                                            title: 'Valutazione Massima',
                                            type: 'string',
                                        },
                                        {
                                            name: 'worstRating',
                                            title: 'Valutazione Minima',
                                            type: 'string',
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    name: 'keywords',
                    title: 'Parole Chiave',
                    type: 'array',
                    of: [{ type: 'string' }],
                },
            ],
        },
    ],
});

