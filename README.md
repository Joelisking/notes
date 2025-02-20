# Notes App

A simple **Notes** application built with [Next.js (App Router)](https://nextjs.org/), **Mongoose** (MongoDB), **Shadcn** and **TypeScript**. This app allows you to create, read, update, and delete (CRUD) notes, each with a title, content, and optional tags.

---

## Setup Instructions

### Prerequisites

- **Node.js** (v16 or later recommended)
- A **MongoDB** instance (local or hosted).  
  If you don’t have MongoDB installed locally, you can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

### 1. Clone the Repository

```bash
git clone https://github.com/Joelisking/notes.git
cd notes
```

### 2. Install Dependencies (pnpm)

```bash
pnpm install
```

### 3. Create Environment Variables

Create a file named `.env.local` in the project root (or configure environment variables directly in your deployment platform). For local development, specify at least:

```
MONGODB_URI="mongodb+srv://username:<db_password>@<cluster_name>.tt7as.mongodb.net/<database_name>"
```
for MongoDB Atlas, and

```
MONGODB_URI=" mongodb://localhost:27017/your_database_name"
```
for local instance of MongoDB.


### 4. Run the Application

```bash
pnpm dev
```

This will start the development server. By default, the application will be available at [http://localhost:3000](http://localhost:3000). Find the application live at [http://notes.joelak.dev](http://notes.joelak.dev)

---

## Available Features

1. **List All Notes**  
   - The home page shows a list of all existing notes in a sidebar, allowing you to filter by search terms.

2. **Create a Note**  
   - Click “New Note” to open the editor with empty fields for title, content, and tags.

3. **Edit a Note**  
   - Select a note from the sidebar; it opens in the editor. Click “Edit” to enable fields, then save your changes.

4. **Delete a Note**  
   - Select a note, click the delete action, and it removes the note from both the front end and the database.

5. **Search/Filter**  
   - The sidebar allows for searching by note title, content, or tags.

6. **Tags**  
   - Notes can have one or more tags, entered as comma-separated values.

7. **Dark Mode / Theming**  
   - Uses `next-themes` for switching between light and dark themes.

---

## Tech Stack Used

1. **Next.js 15 (App Router)**  
   - Handles the frontend and API routes in a single framework.

2. **TypeScript**  
   - Provides static type checking for more robust and maintainable code.

3. **React Hook Form + Zod**  
   - Manages form state and validations in the editor.

4. **Mongoose**  
   - Simplifies interactions with the MongoDB database (defining schemas, validations, etc.).

5. **MongoDB**  
   - Stores notes with fields like `title`, `content`, `tags`, and timestamp fields.

6. **ShadcnUI**  
   - Used for Components and wrappers such as the Scrollable Page Wrapper and the form wrapper.

7. **pnpm**  
   - Used for package management.

8. **Framer Motion**  
   - Provides smooth animations for sidebar transitions and editor mount/unmount.

9. **Lucide Icons**  
   - Used for UI icons like menu, close, delete, etc.

---

## Future Improvements

1. **User Authentication**  
   - Restrict access to creating/editing/deleting notes. Associate notes with users.

2. **Real-Time Collaboration**  
   - Implement websockets or a similar solution to handle multiple users editing the same note simultaneously.

3. **Full-Text Search**  
   - Enhance searching in note content and tags (e.g., use MongoDB’s text indexes).

5. **Tag Management**  
   - Provide a UI for tag autocomplete or suggestions.

6. **Automatic Timestamp Updates**  
   - Mongoose middleware to automatically update `modified_at` on each save, ensuring accurate timestamps.

7. **Testing**  
   - Add unit tests for the model and integration tests for API routes using a testing database or mocks.

8. **Refined UI/UX**  
   - More polished UI, keyboard shortcuts, and possibly a WYSIWYG and markdown editor for note content.

---

**Enjoy using the Notes App!** If you have any questions or suggestions, feel free to open an issue or submit a pull request.
