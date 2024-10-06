import React from "react";
import { Box, Typography } from "@mui/material";
import { NoteObject } from "../models/note";
import Notes from "./Notes";

interface INotesProps {
  notes: NoteObject[];
  deleteNote: (id: string) => void;
  editNote: (id: string, editedNote: NoteObject) => void;
  restoreNote: (id: string) => void;
  searchTerm: string;
  drawerOpened: boolean;
  pinned: boolean;
}

export default function NotesDisplay({
  notes,
  deleteNote,
  editNote,
  searchTerm,
  drawerOpened,
  pinned,
}: INotesProps) {
  const margin = drawerOpened ? 30 : 7;
  // console.log(drawerOpened,margin+'drawer')
  return (
    <Box sx={{ marginTop: 3 }}>
      {pinned && (
        <>
          <Typography variant="h5" sx={{ marginBottom: 3 }}>
            Pinned
          </Typography>

          <Box
            display="flex"
            flexWrap="wrap"
            justifyContent="flex-start"
            alignItems="flex-start"
            gap={1.5}
            paddingLeft={4}
            marginLeft={margin}
            marginRight={1.5}
          >
            {notes.map(
              (note) =>
                !note.deleted &&
                !note.archived &&
                note.pinned && (
                  <Notes
                    key={note.id}
                    note={note}
                    deleteNote={deleteNote}
                    editNote={editNote}
                    searchTerm={searchTerm}
                  />
                )
            )}
          </Box>
          <Typography variant="h5" sx={{ marginBottom: 3 }}>
            Others
          </Typography>
        </>
      )}

      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="flex-start"
        alignItems="flex-start"
        gap={1.5}
        paddingLeft={4}
        marginLeft={margin}
        marginRight={1.5}
      >
        {notes.map(
          (note) =>
            !note.pinned &&
            !note.archived &&
            !note.deleted && (
              <Notes
                key={note.id}
                note={note}
                deleteNote={deleteNote}
                editNote={editNote}
                searchTerm={searchTerm}
              />
            )
        )}
      </Box>
    </Box>
  );
}
