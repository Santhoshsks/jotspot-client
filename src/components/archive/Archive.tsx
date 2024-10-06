import { Box, Typography } from "@mui/material";
import { NoteObject } from "../../models/note";
import Notes from "../Notes";

interface ArchiveProps {
  notes: NoteObject[];
  archiveNote: (id: string) => void;
  editNote: (id: string, editedNote: NoteObject) => void;
  searchTerm: string;
  drawerOpened: boolean;
}

export default function Archived({
  notes,
  archiveNote,
  editNote,
  searchTerm,
  drawerOpened,
}: ArchiveProps) {
  const margin = drawerOpened ? 30 : 7;
  // console.log(drawerOpened,margin+'drawer')
  return (
    <Box sx={{ marginTop: 10 }}>
      <Typography variant="h5" sx={{ marginBottom: 3 }}>
        Archived
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
            note.archived && (
              <Notes
                key={note.id}
                note={note}
                deleteNote={archiveNote}
                editNote={editNote}
                searchTerm={searchTerm}
              />
            )
        )}
      </Box>
    </Box>
  );
}
