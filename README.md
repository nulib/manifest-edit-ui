## Maktaba Collection Workbench  
  
Items in the Maktaba collection are originally provided from Northwestern University and University of Illinois Urbana-Champaign. These resources are provided as [IIIF Manifests](https://iiif.io/), an open standard for delivering digitized cultural heritage materials and the information describing them.  
  
The Maktaba Collection is managed through a custom designed workbench found at https://admin-maktaba.dc.library.northwestern.edu.  
  
### Editor Access  
  
- Usernames will be provided to editors requiring access  
- Users login via https://admin-maktaba.dc.library.northwestern.edu
- Publish collection permissions require being added to the Admin group  
  
### Curating the Collection  
  
#### Workflows  
  
**Add Manifest **  

All users may add selected items to the Maktaba Collection using the Add Manifest workflow. Adding a Manifest requires a URL for a valid IIIF Manifest, and selection of the providing institution (Northwestern or UIUC).

1. *Click* **Add Manifest**  
2. *Enter* the **URL** of the IIIF Manifest  
3. *Select* the **Providing Institution**  
4. *Click* **Add**  
  
*How to find a IIIF Manifest URL?*
  
Example: Select *Maktaba* works provided by Northwestern University can be viewed from the Digital Collections website at <u><https://dc.library.northwestern.edu/search?q=maktaba></u>. When viewing any of these items, click the **Download and Share** button, find the *IIIF Manifest* section, and click **Copy Manifest Link**.  
  
**Annotating Manifests**  
  
All users may annotate Manifests that have been added to the collection. To annotate the item, click the **View** button from the respective row of the work on the collection table. Once navigated to the screen for the specific manuscript, each “page” is represented by a corresponding row with a **Add translation** and **Add transcription** button.  
  
1. *Click* **Add translation** or **Add translation**  
2. *Enter* translation content as plain text  
3. *Click* **Save**  
  
Notes:  
  
- Utilize the viewer above the table to verify textual annotations  
- Users may add and edit content as required for each item  
- When entering content use double hard returns for paragraph spacing  
  
**Updating Public Status**  
  
All users may update the Public status of items added to the collection. To modify the status, click the **View** button from the respective row of the work on the collection table. Toggle the **Public?** switch button to update the status. Public items cannot be deleted.  
  
**Publishing the Collection**  
  
Users adding to the **Admin** group may publish the collection. Only items with the **Public?** status are published to the Maktaba Collection.  
  
1. *Click* the **Options** dropdown  
2. *Click* **Publish Collection**  

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
- Local:  http://localhost:5173/

**Configuration**

- Replace the dummy values in `.env.example` with your own configuration values and rename the file to `.env.local` (for development) or `.env` (for production deployment). 

## License
