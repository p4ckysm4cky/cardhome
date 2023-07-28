import BoardRepo from "./boardRepo";
import ColumnRepo from "./columnRepo";
import CardRepo from "./cardRepo";

describe("cardRepo", () => {
    it("can get a card", async () => {
        const boardRepo = new BoardRepo();
        const board = await boardRepo.createBoard("board 1");
        const column = await boardRepo.addColumn(board.id, "column 1");
        const columnRepo = new ColumnRepo();
        const card = await columnRepo.insertCard(
            column.id,
            "card 1",
            "card description"
        );
        await columnRepo.insertCard(column.id, "card 2", "card description 2");
        const cardRepo = new CardRepo();
        const card2 = await cardRepo.getCard(card.id);
        expect(card2!.title).toBe("card 1");
        expect(card2!.content).toBe("card description");
    });
    it("can update title of a card", async () => {
        const boardRepo = new BoardRepo();
        const board = await boardRepo.createBoard("board 1");
        const column = await boardRepo.addColumn(board.id, "column 1");
        const columnRepo = new ColumnRepo();
        const card = await columnRepo.insertCard(
            column.id,
            "card 1",
            "card description"
        );
        const cardRepo = new CardRepo();
        await cardRepo.updateTitle(card.id, "new card title");
        const updatedCard = await cardRepo.getCard(card.id);
        expect(updatedCard!.title).toBe("new card title");
        expect(updatedCard!.content).toBe("card description");
    });
    it("can update content of a card", async () => {
        const boardRepo = new BoardRepo();
        const board = await boardRepo.createBoard("board 1");
        const column = await boardRepo.addColumn(board.id, "column 1");
        const columnRepo = new ColumnRepo();
        const card = await columnRepo.insertCard(
            column.id,
            "card 1",
            "card description"
        );
        const cardRepo = new CardRepo();
        await cardRepo.updateContent(card.id, "new card description");
        const updatedCard = await cardRepo.getCard(card.id);
        expect(updatedCard!.title).toBe("card 1");
        expect(updatedCard!.content).toBe("new card description");
    });
});
