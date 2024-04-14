export const textLimit = (text: string, limit: number) => {
  return text.length > limit ? `${text.slice(0, limit)}...` : text;
};

export const trimPhone = (phone: string) => {
  return phone.replaceAll(/[^0-9]+/g, "");
};
