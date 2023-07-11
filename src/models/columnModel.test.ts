import { resetDatabase } from "src/helpers/testHelper";
import BoardModel from "./boardModel";
import ColumnModel from "./columnMode";

describe("columnModel", () => {
    test("can update title of a column", async () => {
        const boardModel = new BoardModel();
        const board = await boardModel.createBoard("board");
        const column = await boardModel.addColumn(board.id, "old name");
        const columnModel = new ColumnModel();
        await columnModel.updateTitle(column.id, "new name");
        expect((await boardModel.getBoard(board.id))!.columns[0].title).toBe(
            "new name"
        );
    });
    test("can insert a card to a column", async () => {
        const boardModel = new BoardModel();
        const columnModel = new ColumnModel();
        const board = await boardModel.createBoard("board");
        const column = await boardModel.addColumn(board.id, "column");
        await columnModel.insertCard(
            column.id,
            "card title",
            "card description"
        );
        const boardWithCard = await boardModel.getBoard(board.id);
        expect(boardWithCard!.columns[0].cards.length).toBe(1);
        expect(boardWithCard!.columns[0].cards[0].title).toBe("card title");
        expect(boardWithCard!.columns[0].cards[0].content).toBe(
            "card description"
        );
    });
    afterEach(async () => {
        await resetDatabase();
    });
});
