import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { DeleteForever, RestoreFromTrash, Unarchive } from "@mui/icons-material";
import { NoteObject } from "../models/note";
import { CardActionArea } from "@mui/material";
import FormDialog from "./Dialog";
import { useState } from "react";
import reactStringReplace from 'react-string-replace';

interface INoteProps {
  note: NoteObject;
  deleteNote: (id: string) => void;
  editNote: (id: string, editedNote: NoteObject) => void;
  searchTerm?: string;
}

const highlightText = (text: string, searchTerm?: string): React.ReactNode => {
  if (!searchTerm) return text;
  return reactStringReplace(text, new RegExp(`(${searchTerm})`, 'gi'), (match, i) => (
    <mark key={i}>{match}</mark>
  ));
};

const Notes = ({ note, deleteNote, editNote, searchTerm }: INoteProps) => {
  const [delNote, setDelNote] = useState<NoteObject>(note);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRestore = () => {
    const updatedNote = { ...delNote, deleted: !delNote.deleted };
    setDelNote(updatedNote);
    editNote(note.id, updatedNote);
  };

  const handleArchive = () => {
    const updatedNote = { ...delNote, archived: !delNote.archived };
    setDelNote(updatedNote);
    editNote(note.id, updatedNote);
  };

  return (
    <>
      <Card
        sx={{ minWidth: 250, maxWidth: 300, marginBottom: 4, boxShadow: 6 }}
        style={{ backgroundColor: note.color }}
      >
        <CardActionArea onClick={handleClickOpen}>
          <CardContent>
            <Typography
              component="div"
              gutterBottom
              sx={{ fontWeight: "bold", fontSize: 20 }}
            >
              {highlightText(note.title, searchTerm)}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {highlightText(note.content.slice(0, 300), searchTerm)}
            </Typography>
          </CardContent>
          {note.archived && (
            <CardActions>
              <IconButton
                aria-label="delete"
                size="large"
                onClick={(event) => {
                  event.stopPropagation();
                  handleArchive();
                }}
                onMouseDown={(event) => event.stopPropagation()}
              >
                <Unarchive />
              </IconButton>
            </CardActions>
          )}
          {note.deleted && (
            <CardActions>
              <IconButton
                aria-label="delete"
                size="large"
                onClick={(event) => {
                  event.stopPropagation();
                  deleteNote(note.id);
                }}
                onMouseDown={(event) => event.stopPropagation()}
              >
                <DeleteForever />
              </IconButton>
              <IconButton
                aria-label="delete"
                size="large"
                onClick={(event) => {
                  event.stopPropagation();
                  handleRestore();
                }}
                onMouseDown={(event) => event.stopPropagation()}
              >
                <RestoreFromTrash />
              </IconButton>
            </CardActions>
          )}
        </CardActionArea>
      </Card>
      <FormDialog
        open={open}
        handleClose={handleClose}
        selectedNote={note}
        archiveNote={handleArchive}
        deleteNote={handleRestore}
        editNote={editNote}
      />
    </>
  );
};

export default Notes;
