import "./App.css";
import MiniDrawer from "./components/Drawer";
import Create from "./components/Create";
import NotesDisplay from "./components/NotesDisplay";
import { NoteObject } from "./models/note";
import { useState, useEffect, useCallback } from "react";
import { fetchNotes, addNote, deleteNote, editNote, searchNotes } from "./api";
import { useDebounce } from "./hooks";
import { useNavigate } from "react-router-dom";
import Bin from "./components/bin/Bin";
import Archive from "./components/archive/Archive";

function App() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState<NoteObject[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm);
  const [drawerState, setDrawerState] = useState(false);
  const [homePage, setHomePage] = useState(true);
  const [labelPage, setLabelPage] = useState(false);
  const [archivePage, setArchivePage] = useState(false);
  const [binPage, setBinPage] = useState(false);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const fetchedNotes = await fetchNotes();
        console.log(fetchedNotes);
        setNotes(fetchedNotes);
        checkPinnedStatus(fetchedNotes);
      } catch (error) {
        console.log({ error });
        navigate("/error");
      }
    };
    loadNotes();
  }, [navigate]);

  const handleSearch = useCallback(
    async (term: string) => {
      try {
        if (term) {
          const searchedNotes = await searchNotes(term);
          setNotes(searchedNotes);
          checkPinnedStatus(searchedNotes);
        } else {
          const fetchedNotes = await fetchNotes();
          setNotes(fetchedNotes);
          checkPinnedStatus(fetchedNotes);
        }
      } catch (error) {
        navigate("/error");
      }
    },
    [navigate]
  );

  useEffect(() => {
    const search = async () => {
      await handleSearch(debouncedSearchTerm);
    };
    search();
  }, [debouncedSearchTerm, handleSearch]);

  const checkPinnedStatus = (notes: NoteObject[]) => {
    for (const note of notes) {
      if (note.pinned && !note.deleted) {
        setPinned(true);
        return;
      }
    }
    setPinned(false);
  };

  const handleAddNote = async (newNote: NoteObject) => {
    const addedNote = await addNote(newNote);
    setNotes((prevNotes) => [addedNote, ...prevNotes]);
    if (addedNote.pinned) {
      setPinned(true);
    }
  };

  const handleEditNote = async (id: string, editedNote: NoteObject) => {
    try {
      const updatedNote = await editNote(id, editedNote);
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note.id === id ? updatedNote : note))
      );
      checkPinnedStatus([
        updatedNote,
        ...notes.filter((note) => note.id !== id),
      ]);
    } catch (error) {
      navigate("/error");
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      await deleteNote(id);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
      checkPinnedStatus(notes.filter((note) => note.id !== id));
    } catch (error) {
      navigate("/error");
    }
  };

  function restoreNote(id: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="App">
      <MiniDrawer
        onSearch={setSearchTerm}
        drawerState={drawerState}
        setDrawerOpened={setDrawerState}
        homePage={homePage}
        setHomePage={setHomePage}
        labelPage={labelPage}
        setLabelPage={setLabelPage}
        archivePage={archivePage}
        setArchivePage={setArchivePage}
        binPage={binPage}
        setBinPage={setBinPage}
      />
      {homePage && <Create onAdd={handleAddNote} />}
      {archivePage && (
        <Archive
          notes={notes}
          archiveNote={handleDeleteNote}
          editNote={handleEditNote}
          searchTerm={searchTerm}
          drawerOpened={drawerState}
        />
      )}
      {binPage && (
        <Bin
          notes={notes}
          deleteNote={handleDeleteNote}
          editNote={handleEditNote}
          searchTerm={searchTerm}
          drawerOpened={drawerState}
        />
      )}
      {homePage && (
        <NotesDisplay
          notes={notes}
          deleteNote={handleDeleteNote}
          editNote={handleEditNote}
          restoreNote={restoreNote}
          searchTerm={searchTerm}
          drawerOpened={drawerState}
          pinned={pinned}
        />
      )}
      {labelPage && (
        <NotesDisplay
          notes={notes}
          deleteNote={handleDeleteNote}
          editNote={handleEditNote}
          restoreNote={restoreNote}
          searchTerm={searchTerm}
          drawerOpened={drawerState}
          pinned={pinned}
        />
      )}
    </div>
  );
}

export default App;
