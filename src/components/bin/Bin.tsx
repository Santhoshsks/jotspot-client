import React from "react";
import { Box, Typography } from "@mui/material";
import { NoteObject } from "../../models/note";
import Notes from "../Notes";

interface BinProps {
  notes: NoteObject[];
  deleteNote: (id: string) => void;
  editNote: (id: string, editedNote: NoteObject) => void;
  searchTerm: string;
  drawerOpened: boolean;
}

export default function Bin({
  notes,
  deleteNote,
  editNote,
  searchTerm,
  drawerOpened,
}: BinProps) {
  const margin = drawerOpened ? 30 : 7;
  // console.log(drawerOpened,margin+'drawer')
  return (
    <Box sx={{ marginTop: 10 }}>
      <Typography variant="h5" sx={{ marginBottom: 3 }}>
        Deleted
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
            note.deleted && (
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
