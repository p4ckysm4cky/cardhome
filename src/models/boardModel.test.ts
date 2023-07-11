import BoardModel from "./boardModel";
import { resetDatabase } from "src/helpers/testHelper";

describe("boardModel", () => {
    it("can create a board", async () => {
        const boardModel = new BoardModel();
        const board = await boardModel.createBoard("a title");
        expect(board.title).toBe("a title");
    });
    it("can get a specific board", async () => {
        const boardModel = new BoardModel();
        await boardModel.createBoard("a title1");
        const board = await boardModel.createBoard("a title2");
        const board2 = await boardModel.getBoard(board.id);
        expect(board2!.title).toBe("a title2");
        expect(board2!.id).toBe(board.id);
    });
    it("can get all boards", async () => {
        const boardModel = new BoardModel();
        await boardModel.createBoard("a title1");
        await boardModel.createBoard("a title2");
        const boards = await boardModel.getBoards();
        expect(boards.length).toBe(2);
    });
    it("can delete a board", async () => {
        const boardModel = new BoardModel();
        const board = await boardModel.createBoard("delete me");
        await boardModel.createBoard("do not delete me");
        expect((await boardModel.getBoards()).length).toBe(2);
        await boardModel.deleteBoard(board.id);
        const boards = await boardModel.getBoards();
        expect(boards.length).toBe(1);
        expect(boards[0].title).toBe("do not delete me");
    });
    it("cannot get a deleted board", async () => {
        const boardModel = new BoardModel();
        const board = await boardModel.createBoard("delete me");
        await boardModel.deleteBoard(board.id);
        const board2 = await boardModel.getBoard(board.id);
        expect(board2).toBe(null);
    });
    it("can update board title", async () => {
        const boardModel = new BoardModel();
        const board = await boardModel.createBoard("old title");
        const newBoard = await boardModel.updateBoard(board.id, "new title");
        expect(newBoard.title).toBe("new title");
    });
    it("can add a column", async () => {
        const boardModel = new BoardModel();
        const board = await boardModel.createBoard("board");
        await boardModel.addColumn(board.id, "column");
        const board2 = await boardModel.getBoard(board.id);
        expect(board2!.columns.length).toBe(1);
        expect(board2!.columns[0].title).toBe("column");
    });
    it("can delete a column", async () => {
        const boardModel = new BoardModel();
        const board = await boardModel.createBoard("board");
        const column = await boardModel.addColumn(board.id, "column");
        expect((await boardModel.getBoard(board.id))!.columns.length).toBe(1);
        await boardModel.deleteColumn(column.id);
        expect((await boardModel.getBoard(board.id))!.columns.length).toBe(0);
    });
});

afterEach(async () => {
    await resetDatabase();
});
