import { fireEvent, render, screen } from "@testing-library/react";

import EditString from "./EditString";
import { ManifestEditorManifest } from "types/manifest-editor";
import React from "react";

const metadata: ManifestEditorManifest = {
  label: "My Label",
  summary: "summary",
  provider: "provider",
  publicStatus: false,
  sortKey: "sortKey",
  uri: "uri",
};

describe("EditString", () => {
  it("should render the EditString component", () => {
    // Capture the initial value of the label
    let label = metadata.label;

    function mockHandleSave(metadata: ManifestEditorManifest) {
      label = metadata.label;
    }

    render(
      <EditString
        attribute="label"
        metadata={metadata}
        onSave={mockHandleSave}
      />
    );
    expect(screen.getByTestId("ui-edit-string")).toBeInTheDocument();
    expect(screen.getByText("My Label")).toBeInTheDocument();

    // Clicking the Edit button should show the input field
    fireEvent.click(screen.getByText("Edit"));

    const input = screen.getByRole("textbox");
    const save = screen.getByText("Save");
    expect(input).toBeInTheDocument();

    expect(input).toHaveValue("My Label");
    expect(save).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();

    // Changing the value of the input field
    fireEvent.change(input, { target: { value: "New Label" } });
    expect(input).toHaveValue("New Label");

    // Clicking the Save button should save the new value
    fireEvent.click(save);
    expect(label).toBe("New Label");
  });
});
