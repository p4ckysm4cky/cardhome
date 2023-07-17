import { resetDatabase } from "src/helpers/testHelper";
import BoardModel from "./boardModel";
import ColumnModel from "./columnMode";

describe("columnModel", () => {
    it("can update title of a column", async () => {
        const boardModel = new BoardModel();
        const board = await boardModel.createBoard("board");
        const column = await boardModel.addColumn(board.id, "old name");
        const columnModel = new ColumnModel();
        await columnModel.updateTitle(column.id, "new name");
        expect((await boardModel.getBoard(board.id))!.columns[0].title).toBe(
            "new name"
        );
    });
    it("can insert a card to a column", async () => {
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
    it("can delete a card from a column", async () => {
        const boardModel = new BoardModel();
        const columnModel = new ColumnModel();
        const board = await boardModel.createBoard("board");
        const column = await boardModel.addColumn(board.id, "column");
        const card = await columnModel.insertCard(
            column.id,
            "delete me",
            "card description"
        );
        await columnModel.insertCard(
            column.id,
            "do not delete me",
            "card description"
        );
        expect(
            (await boardModel.getBoard(board.id))!.columns[0].cards.length
        ).toBe(2);
        await columnModel.deleteCard(card.id);
        const boardWithCard = await boardModel.getBoard(board.id);
        expect(boardWithCard!.columns[0].cards.length).toBe(1);
        expect(boardWithCard!.columns[0].cards[0].title).toBe(
            "do not delete me"
        );
    });
    it("can move a card to a different column", async () => {
        const boardModel = new BoardModel();
        const columnModel = new ColumnModel();
        const board = await boardModel.createBoard("board 1");
        const column1 = await boardModel.addColumn(board.id, "column 1");
        const column2 = await boardModel.addColumn(board.id, "column 2");
        await columnModel.insertCard(column1.id, "card 1", "card description");
        const card2 = await columnModel.insertCard(
            column1.id,
            "card 2",
            "card description"
        );
        expect((await columnModel.getColumn(column1.id))!.cards.length).toBe(2);
        await columnModel.moveCard(card2.id, column2.id);
        expect((await columnModel.getColumn(column1.id))!.cards.length).toBe(1);
        expect((await columnModel.getColumn(column2.id))!.cards.length).toBe(1);
    });
    afterEach(async () => {
        await resetDatabase();
    });
});
