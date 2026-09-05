import { Canvas } from "@iiif/presentation-3";
import { getCanvasResourceId } from "./canvas-helpers";

const imageId = "https://iiif.dc.library.northwestern.edu/iiif/3/image-id";

const canvasWithBody = (body: object) =>
  ({
    id: "https://example.org/canvas/1",
    type: "Canvas",
    items: [{ type: "AnnotationPage", items: [{ type: "Annotation", body }] }],
  } as Canvas);

describe("getCanvasResourceId", () => {
  it("reads an Image API 3 service id", () => {
    expect(
      getCanvasResourceId(
        canvasWithBody({
          id: `${imageId}/full/max/0/default.jpg`,
          service: [{ id: imageId, type: "ImageService3" }],
        })
      )
    ).toBe(imageId);
  });

  it("reads an Image API 2 service @id", () => {
    const legacyId = imageId.replace("/iiif/3/", "/iiif/2/");
    expect(
      getCanvasResourceId(
        canvasWithBody({
          "@id": `${legacyId}/full/full/0/default.jpg`,
          service: [{ "@id": legacyId, "@type": "ImageService2" }],
        })
      )
    ).toBe(legacyId);
  });

  it("supports a service object and falls back to the body id", () => {
    expect(getCanvasResourceId(canvasWithBody({ service: { id: imageId } }))).toBe(
      imageId
    );
    expect(getCanvasResourceId(canvasWithBody({ id: imageId }))).toBe(imageId);
  });

  it("uses the first image in a Choice body", () => {
    expect(
      getCanvasResourceId(
        canvasWithBody({
          type: "Choice",
          items: [
            { service: [{ id: imageId }] },
            { service: [{ id: "https://example.org/alternate" }] },
          ],
        })
      )
    ).toBe(imageId);
  });

  it("fails explicitly when no image identifier is available", () => {
    expect(() => getCanvasResourceId(canvasWithBody({}))).toThrow(
      "Unable to determine an image resource ID"
    );
  });
});
