import { databases } from "@/utils/appwrite";
import { ID } from "appwrite";

export async function addNote(content: string): Promise<Note> {
  const newNote = { Content: content };

  const response = await databases.createDocument(
    "670a5029002b9cc2cd0e", // [DATABASE_ID]
    "670a53f2000dddbf9db4", // [COLLECTION_ID]
    ID.unique(), // [DOCUMENT_ID]
    newNote
  );

  const note = {
    $id: response.$id,
    $createdAt: response.$createdAt,
    Content: response.Content,
  };

  return note;
}

export async function getNotes(): Promise<Note[]> {
  const response = await databases.listDocuments(
    "670a5029002b9cc2cd0e", // [DATABASE_ID]
    "670a53f2000dddbf9db4" // [COLLECTION_ID]
  );

  const notes: Note[] = response.documents.map((note) => ({
    $id: note.$id,
    $createdAt: note.$createdAt,
    Content: note.Content,
  }));

  return notes;
}

export async function deleteNote(noteId: string) {
  await databases.deleteDocument(
    "670a5029002b9cc2cd0e", // [DATABASE_ID]
    "670a53f2000dddbf9db4", // [COLLECTION_ID]
    noteId
  );
}