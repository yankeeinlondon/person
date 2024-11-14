import { UrlPath } from "./url";

export type Email = `${string}@${string}.${string}`;

export type EmailType = "personal" | "work" | "unknown";

export type EmailRecord = {
  email: Email;
  type: EmailType;
};
