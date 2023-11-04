export const camalize = (str: string) => {
  const stringTransf = str
    .toLowerCase()
    .replace(/[-_\s.]+(.)?/g, (m, chr) => (chr ? chr.toUpperCase() : ""));

  const firstLetterLowercase = stringTransf.substring(0, 1).toLowerCase();
  const restOfTheString = stringTransf.substring(1);
  return `${firstLetterLowercase}${restOfTheString}`;
};

export const camelizeObjKeys = (obj: any) => {
  for (const key in obj) {
    // obj[key as keyof typeof obj] = camalize(key);
    camalize(key);
  }
};
