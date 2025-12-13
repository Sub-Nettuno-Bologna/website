interface NewsletterContent {
  title: string;
  description: string;
  form: {
    placeholder: string;
    buttonText: string;
  };
}

export const newsletterData: NewsletterContent = {
  title: "Vuoi rimanere aggiornato su tutti gli eventi?",
  description: "Iscriviti alla nostra newsletter per non perderti nessuna uscita!",
  form: {
    placeholder: "La tua email",
    buttonText: "Iscriviti",
  },
};
