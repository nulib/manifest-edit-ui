import { InternationalString, Manifest } from "@iiif/presentation-3";

import { convertPresentation2 } from "@iiif/parser/presentation-2";

const contextAsArray = (json) => {
  const context = Array.isArray(json["@context"])
    ? json["@context"]
    : [json["@context"]];

  return context.map((uri) => uri.replace("http://", "https://"));
};

const isURL = (uri: string) => {
  try {
    new URL(uri);
    return true;
  } catch (e) {
    return false;
  }
};

const getPresentation3 = (json: Manifest) => {
  const context = contextAsArray(json);
  const validContexts = [
    "https://iiif.io/api/presentation/2/context.json",
    "https://iiif.io/api/presentation/3/context.json",
  ];

  if (context.includes(validContexts[0])) {
    return convertPresentation2(json);
  } else if (context.includes(validContexts[1])) {
    return json;
  } else {
    throw new Error(
      `IIIF Manifest is not of @context: ${validContexts.join(", ")}.`
    );
  }
};

const getManifest = async (uri: string) => {
  try {
    return await fetch(uri)
      .then((response) => {
        if (response?.status !== 200)
          throw new Error(
            `The IIIF Manifest could not be fetched. Please check the URL and try again.`
          );

        return response.json();
      })
      .then((json) => getPresentation3(json));
  } catch (error) {}
};

const getLabelEntries = (
  label?: InternationalString,
  lang: string = "none"
) => {
  if (!label) return null;

  if (typeof label === "string") return [label];

  if (!label[lang]) {
    const codes: Array<string> = Object.getOwnPropertyNames(label);
    if (codes.length > 0) return label[codes[0]];
  }

  if (!label[lang]) return null;
  if (!Array.isArray(label[lang])) return null;

  return label[lang] as string[];
};

const getLabelAsString = (
  label: InternationalString | undefined,
  lang: string = "none",
  delimiter: string = ", "
) => {
  const entries = getLabelEntries(label, lang);
  return Array.isArray(entries) ? entries.join(`${delimiter}`) : entries;
};

export { isURL, getManifest, getLabelAsString };
