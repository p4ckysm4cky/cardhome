import BoardModel from "./boardModel";
import ColumnModel from "./columnMode";
import CardModel from "./cardModel";

describe("cardModel", () => {
    it("can get a card", async () => {
        const boardModel = new BoardModel();
        const board = await boardModel.createBoard("board 1");
        const column = await boardModel.addColumn(board.id, "column 1");
        const columnModel = new ColumnModel();
        const card = await columnModel.insertCard(
            column.id,
            "card 1",
            "card description"
        );
        await columnModel.insertCard(column.id, "card 2", "card description 2");
        const cardModel = new CardModel();
        const card2 = await cardModel.getCard(card.id);
        expect(card2!.title).toBe("card 1");
        expect(card2!.content).toBe("card description");
    });
    it("can update title of a card", async () => {
        const boardModel = new BoardModel();
        const board = await boardModel.createBoard("board 1");
        const column = await boardModel.addColumn(board.id, "column 1");
        const columnModel = new ColumnModel();
        const card = await columnModel.insertCard(
            column.id,
            "card 1",
            "card description"
        );
        const cardModel = new CardModel();
        await cardModel.updateTitle(card.id, "new card title");
        const updatedCard = await cardModel.getCard(card.id);
        expect(updatedCard!.title).toBe("new card title");
        expect(updatedCard!.content).toBe("card description");
    });
    it("can update content of a card", async () => {
        const boardModel = new BoardModel();
        const board = await boardModel.createBoard("board 1");
        const column = await boardModel.addColumn(board.id, "column 1");
        const columnModel = new ColumnModel();
        const card = await columnModel.insertCard(
            column.id,
            "card 1",
            "card description"
        );
        const cardModel = new CardModel();
        await cardModel.updateContent(card.id, "new card description");
        const updatedCard = await cardModel.getCard(card.id);
        expect(updatedCard!.title).toBe("card 1");
        expect(updatedCard!.content).toBe("new card description");
    });
});
