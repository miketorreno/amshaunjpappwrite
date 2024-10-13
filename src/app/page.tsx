import NewNoteForm from './components/NewNoteForm'
import NoteList from './components/NoteList'
import '../styles/globals.css'
import { getNotes } from './actions/noteActions';

export default async function Home() {
  const notes: Note[] = await getNotes();

  return (
    <div>
      <header>
        <h1>Notes App</h1>
      </header>

      <NoteList initialNotes={notes} />
      <NewNoteForm />
    </div>
  );
}
