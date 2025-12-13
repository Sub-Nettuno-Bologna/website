import { defineAction, ActionError } from "astro:actions";
import { RESEND_API_KEY, RESEND_CONTACT_TO } from "astro:env/server";
import { Resend } from "resend";
import { z } from "astro:schema";

const ContactSchema = z.object({
  name: z.string().min(1, "Il nome è obbligatorio"),
  email: z.string().email("Formato email non valido"),
  phone: z.string().optional(),
  message: z.string().min(1, "Il messaggio è obbligatorio"),
  "bot-field": z.string().optional(),
});

if (!RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is not set");
}

if (!RESEND_CONTACT_TO) {
  throw new Error("RESEND_CONTACT_TO is not set");
}

const resend = new Resend(RESEND_API_KEY);

const getMessage = (
  name: string,
  email: string,
  message: string,
  phone?: string
): string => {
  let result = `${message}\n\n${email}`;
  if (name) {
    result += `\n${name}`;
  }
  if (phone) {
    result += `\n${phone}`;
  }
  return result;
};

export const server = {
  validate: defineAction({
    accept: "form",
    input: ContactSchema,
    handler: async () => {
      return { ok: true } as const;
    },
  }),

  contact: defineAction({
    accept: "form",
    input: ContactSchema,
    handler: async (input) => {
      const { name, email, phone, message, "bot-field": botField } = input;

      // Honeypot check
      if (botField) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "Richiesta non valida",
        });
      }

      const recipientEmail = RESEND_CONTACT_TO;
      const emailSubject = `Nuovo messaggio da ${name} - SubNettuno.it`;
      const emailText = getMessage(name, email, message, phone);

      try {
        const result = await resend.emails.send({
          from: `${name} <${email}>`,
          to: [recipientEmail],
          replyTo: email,
          subject: emailSubject,
          text: emailText,
        });

        if (result.error) {
          throw new ActionError({
            code: "INTERNAL_SERVER_ERROR",
            message: result.error.message || "Errore invio email",
          });
        }

        console.info("Message sent: %s", result.data?.id);

        return {
          success: true,
          message:
            "Messaggio inviato con successo! Ti risponderemo al più presto.",
        };
      } catch (error) {
        console.error("Error sending email:", error);
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Errore invio form",
        });
      }
    },
  }),
};
