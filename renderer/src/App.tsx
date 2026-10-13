import { useRef, useState } from "react";
import "./App.css";
import type { CreateProjectDialogResult } from "./lib/types";

function App() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [name, setName] = useState<string>("");
  const [color, setColor] = useState<string>("#4f46e5");

  function openDialog() {
    setName("");
    setColor("#4f46e5");
    dialogRef.current?.showModal();
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const result: CreateProjectDialogResult = { name: name.trim(), color };

    console.log(result);
    dialogRef.current?.close();
  }

  return (
    <main>
      <button type="button" onClick={openDialog}>
        Neu
      </button>

      <dialog ref={dialogRef}>
        <form onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
              required
            />
          </label>

          <label>
            Farbe
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </label>

          <div className="dialog-actions">
            <button type="button" onClick={() => dialogRef.current?.close()}>
              Abbrechen
            </button>
            <button type="submit">Speichern</button>
          </div>
        </form>
      </dialog>
    </main>
  );
}

export default App;
