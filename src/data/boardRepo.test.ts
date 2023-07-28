import BoardRepo from "./boardRepo";
import { resetDatabase } from "src/helpers/testHelper";

describe("boardRepo", () => {
    it("can create a board", async () => {
        const boardRepo = new BoardRepo();
        const board = await boardRepo.createBoard("a title");
        expect(board.title).toBe("a title");
    });
    it("can get a specific board", async () => {
        const boardRepo = new BoardRepo();
        await boardRepo.createBoard("a title1");
        const board = await boardRepo.createBoard("a title2");
        const board2 = await boardRepo.getBoard(board.id);
        expect(board2!.title).toBe("a title2");
        expect(board2!.id).toBe(board.id);
    });
    it("can get all boards", async () => {
        const boardRepo = new BoardRepo();
        await boardRepo.createBoard("a title1");
        await boardRepo.createBoard("a title2");
        const boards = await boardRepo.getBoards();
        expect(boards.length).toBe(2);
    });
    it("can delete a board", async () => {
        const boardRepo = new BoardRepo();
        const board = await boardRepo.createBoard("delete me");
        await boardRepo.createBoard("do not delete me");
        expect((await boardRepo.getBoards()).length).toBe(2);
        await boardRepo.deleteBoard(board.id);
        const boards = await boardRepo.getBoards();
        expect(boards.length).toBe(1);
        expect(boards[0].title).toBe("do not delete me");
    });
    it("cannot get a deleted board", async () => {
        const boardRepo = new BoardRepo();
        const board = await boardRepo.createBoard("delete me");
        await boardRepo.deleteBoard(board.id);
        const board2 = await boardRepo.getBoard(board.id);
        expect(board2).toBe(null);
    });
    it("can update board title", async () => {
        const boardRepo = new BoardRepo();
        const board = await boardRepo.createBoard("old title");
        const newBoard = await boardRepo.updateBoard(board.id, "new title");
        expect(newBoard.title).toBe("new title");
    });
    it("can add a column", async () => {
        const boardRepo = new BoardRepo();
        const board = await boardRepo.createBoard("board");
        await boardRepo.addColumn(board.id, "column");
        const board2 = await boardRepo.getBoard(board.id);
        expect(board2!.columns.length).toBe(1);
        expect(board2!.columns[0].title).toBe("column");
    });
    it("can delete a column", async () => {
        const boardRepo = new BoardRepo();
        const board = await boardRepo.createBoard("board");
        const column = await boardRepo.addColumn(board.id, "column");
        expect((await boardRepo.getBoard(board.id))!.columns.length).toBe(1);
        await boardRepo.deleteColumn(column.id);
        expect((await boardRepo.getBoard(board.id))!.columns.length).toBe(0);
    });
    it("can get all board titles", async () => {
        const boardRepo = new BoardRepo();
        await boardRepo.createBoard("board 1");
        await boardRepo.createBoard("board 2");
        const boards = await boardRepo.getBoardsOnly();
        expect(boards.length).toBe(2);
        expect(boards[0].title).toBe("board 1");
        expect(boards[1].title).toBe("board 2");
    });
});

afterEach(async () => {
    await resetDatabase();
});
