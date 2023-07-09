import prisma from "src/libs/prisma";

export default class BoardModel {
    async createBoard(title: string) {
        return await prisma.board.create({
            data: {
                title: title,
            },
        });
    }
}
