import { getSourceManifestUri } from "./iiif-helpers";

describe("getSourceManifestUri", () => {
  it("builds a cached source URL from the immutable publish key", () => {
    expect(
      getSourceManifestUri(
        "https://iiif-maktaba.example.org",
        "dc8ff749-adad-42a7-81e0-0eb473ef88a5"
      )
    ).toBe(
      "https://iiif-maktaba.example.org/sources/dc8ff749-adad-42a7-81e0-0eb473ef88a5.json"
    );
  });

  it("does not duplicate a trailing slash in the IIIF base URL", () => {
    expect(getSourceManifestUri("https://example.org/", "publish-key")).toBe(
      "https://example.org/sources/publish-key.json"
    );
  });

  it("fails when the metadata has no publish key", () => {
    expect(() => getSourceManifestUri("https://example.org", "")).toThrow(
      "Unable to determine the cached source manifest URI"
    );
  });
});
