export type PhoneType =
  | "mobile"
  | "home"
  | "work"
  | "alt"
  | "prior"
  | "unknown";

export type PhoneRecord = {
  phone: string;
  type: PhoneType;
};
