import prisma from "src/libs/prisma";

export default class BoardModel {
    async createBoard(title: string) {
        return await prisma.board.create({
            data: {
                title: title,
            },
        });
    }
    async getBoard(id: number) {
        return await prisma.board.findUnique({
            where: {
                id: id,
            },
        });
    }
    async getBoards() {
        return await prisma.board.findMany();
    }
}
