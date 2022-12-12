import { describe, test, expect, vi, beforeEach } from "vitest";
import { addNewEmptyNote, savingNewNote } from "../../../src/store/journal";
import { startNewNote } from "../../../src/store/journal/thunks";
describe("Tests of Journal thunks", () => {
  const dispatch = vi.fn();
  const getState = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("startNewNote should create an empty note", async () => {
    const uid = "TEST-UID";
    getState.mockReturnValue({ auth: { uid: uid } });
    /* await startNewNote()(dispatch, getState, undefined);
    expect(dispatch).toHaveBeenCalledWith(savingNewNote);
    expect(dispatch).toHaveBeenCalledWith(
      addNewEmptyNote({
        body: "",
        title: "",
        id: expect.any(String),
        date: expect.any(Number),
        imageUrls: [],
      })
    ); */
  });
});
