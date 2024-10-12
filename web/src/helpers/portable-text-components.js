import { urlFor } from './sanity-client.js';

const replaceTags = (str) => {
  const html = str ? str.replace(/\n/g, '<br />') : str;
  return html;
};

export const myPortableTextComponents = {
  marks: {
    internalLink: ({ value, children }) => {
      return `<a className="underline internalLink" href="${value.href}">${children}</a>`;
    },
    internalOldLink: ({ value, children }) => {
      return `<a className="underline internalOldLink" href="${value.href}">${children}</a>`;
    },
    link: ({ value, children }) => {
      const { blank, href } = value;
      return blank
        ? `<a
          href="${href}"
          className="underline"
          target="_blank"
          rel="noreferrer noopener"
        >
          ${children}
        </a>`
        : `<a href={href} className="underline">
          ${children} 
        </a>`;
    },
  },
  types: {
    figure: ({ value }) => {
      const asset = value.asset || value.image.asset;
      const { alt, caption } = value;
      if (!asset) {
        return '';
      }
      const captionHtml = caption
        ? `<figcaption class="mt-4 text-sm">${replaceTags(caption)}</figcaption>`
        : '';
      return `<figure class="bg-neutral-200 p-2 rounded-lg">
        <img src="${urlFor(asset)}" alt="${alt}" />
        ${captionHtml}
      </figure>`;
    },
  },
};
