import BoardModel from "./boardModel";
import prisma from "src/libs/prisma";

describe("boardModel", () => {
    test("can create a board", async () => {
        const boardModel = new BoardModel();
        const board = await boardModel.createBoard("a title");
        expect(board.title).toBe("a title");
    });
    test("can get a specific board", async () => {
        const boardModel = new BoardModel();
        await boardModel.createBoard("a title1");
        const board = await boardModel.createBoard("a title2");
        const board2 = await boardModel.getBoard(board.id);
        expect(board2!.title).toBe("a title2");
        expect(board2!.id).toBe(board.id);
    });
    test("can get all boards", async () => {
        const boardModel = new BoardModel();
        await boardModel.createBoard("a title1");
        await boardModel.createBoard("a title2");
        const boards = await boardModel.getBoards();
        expect(boards.length).toBe(2);
    });
    test("can delete a board", async () => {
        const boardModel = new BoardModel();
        const board = await boardModel.createBoard("delete me");
        await boardModel.createBoard("do not delete me");
        expect((await boardModel.getBoards()).length).toBe(2);
        await boardModel.deleteBoard(board.id);
        const boards = await boardModel.getBoards();
        expect(boards.length).toBe(1);
        expect(boards[0].title).toBe("do not delete me");
    });
    test("cannot get a deleted board", async () => {
        const boardModel = new BoardModel();
        const board = await boardModel.createBoard("delete me");
        await boardModel.deleteBoard(board.id);
        const board2 = await boardModel.getBoard(board.id);
        expect(board2).toBe(null);
    });
    test("can update board title", async () => {
        const boardModel = new BoardModel();
        const board = await boardModel.createBoard("old title");
        const newBoard = await boardModel.updateBoard(board.id, "new title");
        expect(newBoard.title).toBe("new title");
    });
});

afterEach(async () => {
    await prisma.board.deleteMany();
});
