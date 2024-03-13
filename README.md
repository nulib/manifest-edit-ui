## Maktaba Collection Workbench

Items in the Maktaba collection are originally provided from Northwestern University and University of Illinois Urbana-Champaign. These resources are provided as [IIIF Manifests](https://iiif.io/), an open standard for delivering digitized cultural heritage materials and the information describing them.

The Maktaba Collection is managed through a custom designed workbench found at https://admin-maktaba.dc.library.northwestern.edu.

## Editor Access

- Usernames will be provided to editors requiring access
- Users login via https://admin-maktaba.dc.library.northwestern.edu
- Publish collection permissions require being added to the Admin group

## Curating the Collection

### Workflows

#### Add Manifest

All users may add selected items to the Maktaba Collection using the Add Manifest workflow. Adding a Manifest requires a URL for a valid IIIF Manifest, and selection of the providing institution (Northwestern or UIUC).

1. _Click_ **Add Manifest**
2. _Enter_ the **URL** of the IIIF Manifest
3. _Select_ the **Providing Institution**
4. _Click_ **Add**

_How to find a IIIF Manifest URL?_

Example: Select _Maktaba_ works provided by Northwestern University can be viewed from the Digital Collections website at <u><https://dc.library.northwestern.edu/search?q=maktaba></u>. When viewing any of these items, click the **Download and Share** button, find the _IIIF Manifest_ section, and click **Copy Manifest Link**.

#### Annotating Manifests

All users may annotate Manifests that have been added to the collection. To annotate the item, click the **View** button from the respective row of the work on the collection table. Once navigated to the screen for the specific manuscript, each “page” is represented by a corresponding row with a **Add translation** and **Add transcription** button.

1. _Click_ **Add translation** or **Add translation**
2. _Enter_ translation content as [Markdown](https://www.markdownguide.org/cheat-sheet/)
3. _Click_ **Save**

Tips:

- Formatting content with Markdown allows for strong, emphasis, footnotes, and more ([see Markdown Guides](#markdown-guides))
- Utilize the viewer above the table to verify textual annotations
- Users may add and edit content as required for each item
- When entering content use double hard returns for paragraph spacing

#### Adding Notes

Notes as may also need to be added for each page item to track progress or concerns. Notes are used for internal purposes and are not published as part of the Maktaba collection.

#### Updating Public Status

All users may update the Public status of items added to the collection. To modify the status, click the **View** button from the respective row of the work on the collection table. Toggle the **Public?** switch button to update the status. Public items cannot be deleted.

#### Publishing the Collection

Users adding to the **Admin** group may publish the collection. Only items with the **Public?** status are published to the Maktaba Collection.

1. _Click_ the **Options** dropdown
2. _Click_ **Publish Collection**

### Markdown Guides

The Maktaba Collection Workbench supports the following elements for Markdown formatting:

[**Basic Syntax**](https://www.markdownguide.org/basic-syntax/)

- Heading
- Bold (Strong)
- Italic (Emphasis)
- Blockquote
- Ordered List
- Unordered List
- Code
- Horizontal Rule
- Link

[**Extended Syntax**](https://www.markdownguide.org/extended-syntax/)

- Footnote
- Table

#### Converting Documents with Pandoc

To ease in conversion of Microsoft Word documents to Markdown, a [Colab Notebook](https://colab.research.google.com/drive/1ieZV3QakWrRDDl7-idMXmvW3tVVxw_Yb) and [Video Example (Download)](https://github.com/nulib/manifest-edit-ui/raw/deploy/staging/docs/media/maktaba-pandoc.mp4) have been authored.

**Colab notebook steps**

1. Sign into Google;
2. Upload a local Word document;
3. In second codeblock, match filename with expected document, ex: `translation.docx`

**Before**

```sh
!pandoc translation.docx -o markdown_content.md
```

**After**

```sh
!pandoc final-translation-rushd-al-ghafil.docx -o markdown_content.md

```

4. Run each code block in sequence.
5. Copy the converted Markdown

#### Additional Refinements

After conversion of a Word document to Markdown, there may be a need to make additional refinements. This might include removing unnecessary line breaks, organizing footnote content, removing Word artifacts (ex: `[ ]{dir="rtl"}`), or formatting of a hemastitch.

**Refined Example**

```md
- This text is *The Guide for the Heedless* by the learned Imam Sīdī ʿAbd
  - Allāh ibn al-Ḥājj Ibrāhīm

- All praise belongs to God, who led us
  - to the truth and away from falsehood, and denied us

- What the best of the honored ones forbade us
  - may our Lord bring him peace and pray upon him.

- \[Falsehood\] incurs disapproval and prohibition,[^1]
  - within it all the sciences of evil are discerned.

- It includes conferring on someone a benefit or an affliction,
  - which, according to law, is not deserved,

- Or peering into the realm of the unseen
  - or deploying a name for a worldly decree.

[^1]: Prohibition (*manʿ*) and disapproval (*kurḥ*) are technical legal
    terms. Prohibited acts are forbidden, while acts that merit
    disapproval are discouraged.
```

## Developer Usage

**Production Build**

```
npm run build
```

- outputs to `dist/`

**Local Devlopment**

```
npm run dev
```

- Local: http://localhost:5173/

**Configuration**

- Replace the dummy values in `.env.example` with your own configuration values and rename the file to `.env.local` (for development) or `.env` (for production deployment).

## License
