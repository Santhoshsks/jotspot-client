import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  InputBase,
  Button,
  Typography,
  CardActions,
  ClickAwayListener,
  CardHeader,
  IconButton,
} from "@mui/material";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import PushPinIcon from "@mui/icons-material/PushPin";
import { NoteObject } from "../models/note";
import { v4 as uuid } from "uuid";
import { ArchiveOutlined, ColorLensOutlined } from "@mui/icons-material";

const defaultObj = {
  id: "0",
  title: "",
  content: "",
  archived: false,
  deleted: false,
  pinned: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  color: "#ffffff",
};

interface CreateProps {
  onAdd: (note: NoteObject) => void;
}

export default function Create({ onAdd }: CreateProps) {
  const [note, setNote] = useState<NoteObject>(defaultObj);
  const [expanded, setExpanded] = useState(false);
  const [pinned, setPinned] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    // console.log(id)
    setNote((prevNote) => ({
      ...prevNote,
      [id]: value,
    }));
  };

  const handleSubmit = () => {
    if (note.title.trim() !== "" || note.content.trim() !== "") {
      onAdd({ ...note, id: uuid() });
      setNote(defaultObj);
    }
    setExpanded(false);
  };

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (note.title.trim() !== "" || note.content.trim() !== "") {
      onAdd({ ...note, id: uuid() });
      setNote(defaultObj);
    }
    setExpanded(false);
    setPinned(false);
  };

  const handlePinned = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setPinned((prevPinned) => {
      const newPinned = !prevPinned;
      setNote((prevNote) => ({
        ...prevNote,
        pinned: newPinned,
      }));
      return newPinned;
    });
  };

  const Icon = pinned ? (
    <PushPinIcon />
  ) : (
    <PushPinOutlinedIcon sx={{ opacity: 0.5 }} />
  );
  return (
    <Box sx={{ display: "flex", justifyContent: "center", marginTop: 12 }}>
      <ClickAwayListener onClickAway={handleSubmit}>
        <Card
          sx={{
            minWidth: 600,
            maxWidth: 700,
            boxShadow: 5,
            "--Card-radius": "40px",
          }}
          id="note-card"
          onClick={() => {
            setExpanded(true);
            console.log("opened");
          }}
        >
          <CardHeader
            sx={{ maxHeight: 5 }}
            title={
              <Typography variant="h5">
                <InputBase
                  name="title"
                  id="title"
                  value={note.title}
                  onChange={handleChange}
                  required
                  fullWidth
                  placeholder={expanded ? "Title" : "Jot down..."}
                  inputProps={{ "aria-label": "title" }}
                  sx={{ paddingTop: 5 }}
                />
              </Typography>
            }
            action={
              <IconButton
                aria-label="settings"
                sx={{ paddingTop: 1 }}
                onClick={handlePinned}
              >
                {Icon}
              </IconButton>
            }
          />
          <CardContent>
            {expanded && (
              <Typography variant="h5">
                <InputBase
                  name="content"
                  id="content"
                  value={note.content}
                  onChange={handleChange}
                  required
                  fullWidth
                  multiline
                  rows={4}
                  placeholder="Jot down..."
                  inputProps={{ "aria-label": "content" }}
                />
              </Typography>
            )}
          </CardContent>
          {expanded && (
            <CardActions sx={{ justifyContent: "flex-end" }}>
              <IconButton>
                <ArchiveOutlined />
              </IconButton>
              <Box
                sx={{
                  position: "relative",
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                <InputBase
                  id="color"
                  type="color"
                  value={note.color}
                  defaultValue="#ffffff"
                  onChange={handleChange}
                  sx={{
                    width: 0, 
                    height: 0,
                    opacity: 0, 
                    position: "absolute", 
                  }}
                />
                <ColorLensOutlined
                  sx={{
                    fontSize: 24,
                    color: note.color === "#ffffff" ? "grey" : note.color, 
                    cursor: "pointer",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.1)", 
                    },
                  }}
                  onClick={() => {
                    document.getElementById("color")?.click(); 
                  }}
                />
              </Box>

              <Button onClick={handleClose} variant="text" color="primary">
                Close
              </Button>
            </CardActions>
          )}
        </Card>
      </ClickAwayListener>
    </Box>
  );
}
