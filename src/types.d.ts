interface Note {
  id: string;
  text: string;
  time_stamp: string;
}

enum NoteMode {
  create = "create",
  read = "read",
  update = "update",
  delete = "delete",
}
