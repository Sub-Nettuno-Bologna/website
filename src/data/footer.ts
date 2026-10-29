import { pagesData } from "./pages";

interface FooterContent {
  legal: {
    form: string;
    registeredOffice: string;
    pec: string;
  };
  copyright: {
    affiliation: string;
  };
  policyLinks: { text: string; href: string }[];
}

export const footerData: FooterContent = {
  legal: {
    form: "Associazione Sportiva Dilettantistica",
    registeredOffice: "Sede legale: Via Andrea Costa 174, 40134 Bologna",
    pec: "PEC subnettuno@pec.it",
  },
  copyright: {
    affiliation: "Affiliato FIPSAS/CMAS • Riconosciuto CONI",
  },
  policyLinks: [
    { text: pagesData.safeguarding.shortTitle, href: pagesData.safeguarding.path },
  ],
};
