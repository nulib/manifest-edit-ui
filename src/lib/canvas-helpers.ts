import { Canvas } from "@iiif/presentation-3";

interface ResourceWithId {
  "@id"?: string;
  id?: string;
  items?: ResourceWithId[];
  service?: ResourceWithId | ResourceWithId[];
  type?: string;
}

const first = <T,>(value: T | T[] | undefined): T | undefined =>
  Array.isArray(value) ? value[0] : value;

const getCanvasResourceId = (canvas: Canvas): string => {
  const annotationPage = canvas.items?.[0];
  const paintingAnnotation = annotationPage?.items?.[0];
  const annotationBody = first(
    paintingAnnotation?.body as ResourceWithId | ResourceWithId[] | undefined
  );
  const body = annotationBody?.type === "Choice"
    ? first(annotationBody.items)
    : annotationBody;
  const service = first(body?.service);
  const resourceId = service?.id || service?.["@id"] || body?.id || body?.["@id"];

  if (!resourceId) {
    throw new Error(
      `Unable to determine an image resource ID for canvas ${canvas.id}`
    );
  }

  return resourceId;
};

export { getCanvasResourceId };
