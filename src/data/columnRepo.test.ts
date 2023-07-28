import { resetDatabase } from "src/helpers/testHelper";
import BoardRepo from "./boardRepo";
import ColumnRepo from "./columnRepo";

describe("columnRepo", () => {
    it("can update title of a column", async () => {
        const boardRepo = new BoardRepo();
        const board = await boardRepo.createBoard("board");
        const column = await boardRepo.addColumn(board.id, "old name");
        const columnRepo = new ColumnRepo();
        await columnRepo.updateTitle(column.id, "new name");
        expect((await boardRepo.getBoard(board.id))!.columns[0].title).toBe(
            "new name"
        );
    });
    it("can insert a card to a column", async () => {
        const boardRepo = new BoardRepo();
        const columnRepo = new ColumnRepo();
        const board = await boardRepo.createBoard("board");
        const column = await boardRepo.addColumn(board.id, "column");
        await columnRepo.insertCard(
            column.id,
            "card title",
            "card description"
        );
        const boardWithCard = await boardRepo.getBoard(board.id);
        expect(boardWithCard!.columns[0].cards.length).toBe(1);
        expect(boardWithCard!.columns[0].cards[0].title).toBe("card title");
        expect(boardWithCard!.columns[0].cards[0].content).toBe(
            "card description"
        );
    });
    it("can delete a card from a column", async () => {
        const boardRepo = new BoardRepo();
        const columnRepo = new ColumnRepo();
        const board = await boardRepo.createBoard("board");
        const column = await boardRepo.addColumn(board.id, "column");
        const card = await columnRepo.insertCard(
            column.id,
            "delete me",
            "card description"
        );
        await columnRepo.insertCard(
            column.id,
            "do not delete me",
            "card description"
        );
        expect(
            (await boardRepo.getBoard(board.id))!.columns[0].cards.length
        ).toBe(2);
        await columnRepo.deleteCard(card.id);
        const boardWithCard = await boardRepo.getBoard(board.id);
        expect(boardWithCard!.columns[0].cards.length).toBe(1);
        expect(boardWithCard!.columns[0].cards[0].title).toBe(
            "do not delete me"
        );
    });
    it("can move a card to a different column", async () => {
        const boardRepo = new BoardRepo();
        const columnRepo = new ColumnRepo();
        const board = await boardRepo.createBoard("board 1");
        const column1 = await boardRepo.addColumn(board.id, "column 1");
        const column2 = await boardRepo.addColumn(board.id, "column 2");
        await columnRepo.insertCard(column1.id, "card 1", "card description");
        const card2 = await columnRepo.insertCard(
            column1.id,
            "card 2",
            "card description"
        );
        expect((await columnRepo.getColumn(column1.id))!.cards.length).toBe(2);
        await columnRepo.moveCard(card2.id, column2.id);
        expect((await columnRepo.getColumn(column1.id))!.cards.length).toBe(1);
        expect((await columnRepo.getColumn(column2.id))!.cards.length).toBe(1);
    });
    afterEach(async () => {
        await resetDatabase();
    });
});
