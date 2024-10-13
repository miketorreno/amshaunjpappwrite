"use client";
import { useEffect, useState } from "react";
import { deleteNote } from "../actions/noteActions";
import { client } from "@/utils/appwrite";

export default function NoteList({ initialNotes }: { initialNotes: Note[] }) {
  const [notes, setNotes] = useState<Note[]>(initialNotes);

  useEffect(() => {
    const channel =
      "databases.670a5029002b9cc2cd0e.collections.670a53f2000dddbf9db4.documents"; // databases.[DATABASE_ID].collections.[COLLECTION_ID].documents

    const unsubscribe = client.subscribe(channel, (response) => {
      console.log(response);
      const eventType = response.events[0];
      const changedNote = response.payload as Note;

      if (eventType.includes("create")) {
        setNotes((prevNotes) => [...prevNotes, changedNote]);
      }

      // if (eventType.includes("update")) {
      //   setNotes((prevNotes) =>
      //     prevNotes.map((note) =>
      //       note.$id === changedNote.$id ? changedNote : note
      //     )
      //   );
      // }

      if (eventType.includes("delete")) {
        setNotes((prevNotes) =>
          prevNotes.filter((note) => note.$id !== changedNote.$id)
        );
      }
    });

    return () => {
      unsubscribe();
    };
  });

  const handleDelete = async (noteId: string) => {
    const element = document.getElementById(noteId);

    if (element) {
      element.classList.add("crossed-out");
    }

    await deleteNote(noteId);
    // setNotes(notes.filter((note) => note.$id !== noteId))
  };

  return (
    <ul>
      {notes.map((note) => (
        <li key={note.$id} id={note.$id} onClick={() => handleDelete(note.$id)}>
          <p>{note.Content}</p>
        </li>
      ))}
    </ul>
  );
}
