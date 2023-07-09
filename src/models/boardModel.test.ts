import BoardModel from "./boardModel";
import prisma from "src/libs/prisma";

test("createBoard", async () => {
    const boardModel = new BoardModel();
    const board = await boardModel.createBoard("a title");
    expect(board.title).toBe("a title");
});

afterAll(async () => {
    await prisma.board.deleteMany();
});
