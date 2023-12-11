import NewNote, { links as newNoteLinks } from "~/components/NewNote";
import NoteList, { links as noteListeLinks } from '~/components/NoteList';
import { getStoredNotes, storeNotes } from "../data/notes";
import { json, redirect } from "@remix-run/node";
import { Link, useCatch, useLoaderData } from "@remix-run/react";

export default function NotesPage() {
    const notes = useLoaderData(); /** this gives you an access to the Loader function data */
    // const data = useActionData(); /** this gives you an access to the Action function data */

    return (
        <main>
            <NewNote />
            <NoteList notes={notes}/>
        </main>
    )
}

/**
 * a remix function that will be called whenever a get request reaches this route /notes(whenever we wanna view this page and this component is about to be rendered)
 */
export async function loader() {
    const notes = await getStoredNotes();
    if (!notes || notes.length === 0) {
        throw json({message: 'Could not find any notes.'}, {
            status: 404,
            statusText: 'Not Found',
        }); /** this json function generates a response object which contains some json data */
    }
    return notes; /* data returned here is serialized, it's temporarily converted to a json string */
    // return new Response(JSON.stringify(notes), {headers: {'Content-Type': 'application/json'}});
    // return json(notes);
}


/**
 * a remix function to handle data submission and mutations 
 * @param {*} param0 
 * @returns 
 */
export async function action({request}) {
    const formData = await request.formData();   /* to extract submitted data from the incoming request */
    // const noteData = {
    //     title: formData.get('title'),
    //     content: formData.get('content'),
    // };
    const noteData = Object.fromEntries(formData)

    if(noteData.title.trim().length < 5) {
        // you can't use browser API such as alert() because this function is executed on the server(the backend). it won't work. so instead,
        return { message: 'Invalid title - must be at least 5 characters long.' };
    }

    const existingNotes = await getStoredNotes();
    noteData.id = new Date().toISOString();
    const updatedNotes = existingNotes.concat(noteData);
    await storeNotes(updatedNotes);
    await new Promise((resolve, reject) => setTimeout(() => resolve(), 2000)); // this simply adds two seconds pause while storing note to json

    //redirect a user to a page
    return redirect('/notes');
}

export function links() {
    return [...newNoteLinks(), ...noteListeLinks()] /* surfacing styles */
}

/**
 * Metadata
 */

export function meta() {
    return {
        title: 'All Notes',
        description: 'Manage your notes with ease.'
    }
}

/**
 * catchs all unhandled errors related to this component
 */
export function CatchBoundary() {
    const caughtResponse = useCatch();
    const message = caughtResponse.data?.message || 'Data not found';

    return (
        <main>
            <p className="info-message">{message}</p>
            <NewNote />
        </main>
    )
}
export function ErrorBoundary({error}) {
    return (
        <main className="error">
            <h1>An error related to your notes page ocurred! Please try again</h1>
            <p>{error.message}</p>
            <p>Back to <Link to="/">safety</Link></p>
        </main>
    )
}