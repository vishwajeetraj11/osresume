# OS Resume: Oversimplified Resume Builder
### Create a professional resume in 15 minutes.

The resume builder features include a Tailwind CSS-based interface, intuitive drag-and-drop functionality to rearrange information easily, and robust form handling powered by Formik and Yup. Users can also customize their resumes with different fonts and template styles.  

[![OS Resume Editor DEMO](https://img.youtube.com/vi/plFUCIFGOVc/0.jpg)](https://www.youtube.com/watch?v=plFUCIFGOVc)

## 💻 Screens
Landing Page          |  Templates Page
:-------------------------:|:-------------------------:
<img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1626894875481/-qAU5ukz2.png" alt="OS Resume Landing Page"> | <img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1626895094040/vzhgmLk5A.png" alt="OS Resume Templates Page">
Dashboard Page         |  <a href='https://www.youtube.com/watch?v=plFUCIFGOVc' target='_blank'>Editor Page (Empty Resume)</a>
<img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1626898853868/ufXg8-gpK.png" alt="=OS Resume Dashboard Page"> | <img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1626895188274/GJ6blsJV5.png" alt="OS Resume Editor Page">
Resume Editor (Form Updata/Create Resume Fields)         |  Resume Editor (Google Fonts)
<img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1627115195301/EmvWtCSJBr.png" alt="=OS Resume Manage Sub Fields"> | <img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1627115285248/q36qsMaY2.png" alt="=OS Resume Google Fonts Support">

Resume Editor (Manage Resume Sub Fields)
<img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1627115172897/jWl6cpIVg.png" alt="=OS Resume Manage Sub Fields">

### Requirements
node: v18.12.0

## Getting Started

1. Install all dependencies:

```bash
npm install
# or
yarn
```

If you do not have yarn installed locally on your system, you will first need to install it with the following line:

```bash
npm install -g yarn
```

2. Goto Clerk Dashboard and create an application you will get the below mentioned credentials. (Step: 3)

3. Create a `.env` file in the root folder.
    Add these env configs...

    NEXT_PUBLIC_CLERK_SIGN_IN=`<CLERK SIGN IN>`  
    MONGODB_URI=`<MongoDB URI ending in /osresume>`  
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=`<CLERK PUBLISHABLE KEY>`  
    CLERK_SECRET_KEY=`<CLERK SECRET KEY>`  

    Example:
    `mongodb+srv://<user>:<password>@cluster0.b4w0r.mongodb.net/osresume?appName=Cluster0`

    Note:
    The repo still supports the legacy `NEXT_PUBLIC_MONOGO_URI` variable for backward compatibility, but `MONGODB_URI` is the recommended name.

4. Seeder Script (Optional)
  Seed template/sample data with:

```bash
npm run seed
```

  This inserts demo template content into MongoDB. It is optional for local development.

## Template Development

Templates are defined in code and can also be synced into MongoDB as template records.

### Add a New Template

1. Create the template component in `components/templates/`
2. Add a preview image or svg in `public/templates/`
3. Register the template in `shared/utils/templateCatalog.js`
4. Render the template in `pages/editor/[id].js`

Each built-in template entry in `shared/utils/templateCatalog.js` should include:

- `title`
- `templateName`
- `customStyles`

Example:

```js
{
  title: 'Classic ATS',
  templateName: 'ClassicAts',
  customStyles: {
    font: 'Computer Modern Serif',
  },
}
```

### Template Records in MongoDB

Built-in templates are automatically upserted into the `resumes` collection when the app requests:

```text
/api/resumes?template=true
```

That means adding a template to `shared/utils/templateCatalog.js` is enough to make it appear in the app and create a template metadata row in MongoDB if it does not already exist.

### Sample Template Content

Template metadata sync only creates the template resume record itself. If you want seeded sample content for a template, you must also update:

- `shared/utils/demoData.js`
- `seeder.js`

This is where demo `personal`, `education`, `experience`, `extras`, `projects`, and `leadership` data should be defined.

    Enjoy

<h2><a id="user-content-about" class="anchor" aria-hidden="true" href="#about"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg></a>Support</h2>

<a href="https://www.buymeacoffee.com/vishwajeetraj11" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174"></a>

<p>Vishwajeet Raj – <a href="https://vishwajeet.netlify.app" rel="nofollow">vishwajeet.netlify.app</a></p>
