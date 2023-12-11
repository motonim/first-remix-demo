import { Link, useLoaderData } from "@remix-run/react";
import styles from "../styles/note-details.css";
import { getStoredNotes } from "../data/notes";
import { json } from "@remix-run/node";

export default function NoteDetailsPage() {
    const note = useLoaderData();

    return (<main id="note-details">
        <header>
            <nav>
                <Link to="/notes">Back to all notes</Link>
            </nav>
            <h1>{note.title}</h1>
            <p id="note-details-content">{note.content}</p>
        </header>
    </main>)
}

export async function loader({params}) {
    const notes = await getStoredNotes();
    const noteId = params.noteId; // if the file name is note.$id.jsx, const noteId = param.id;
    const selectedNote = notes.find(note => note.id === noteId);

    if(!selectedNote) {
        throw json(
            {message: 'Could not find any note for id ' + noteId},
            {status: 400}
        );
        // this is handled by the default catch boundary on the root component
    }
    return selectedNote;
}

export function links() {
    return [{ rel: 'stylesheet', href: styles }];
}


/**
 * Metadata
 */

export function meta({data}) {
    // data parameter hold the data that came from loader function and in this case, it has selectedNote data.
    return {
        title: data.title,
        description: 'Manage your notes with ease.'
    }
}