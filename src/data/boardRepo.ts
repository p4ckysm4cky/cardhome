import prisma from "src/libs/prisma";

export default class BoardRepo {
    async createBoard(title: string, description: string = "") {
        return await prisma.board.create({
            data: {
                title,
                description,
            },
        });
    }
    async getBoard(id: number) {
        return await prisma.board.findFirst({
            where: {
                id: {
                    equals: id,
                },
                deletedAt: null,
            },
            include: {
                columns: {
                    where: {
                        deletedAt: null,
                    },
                    include: {
                        cards: {
                            where: {
                                deletedAt: null,
                            },
                        },
                    },
                },
            },
        });
    }
    async getBoards() {
        return await prisma.board.findMany({
            where: {
                deletedAt: null,
            },
            include: {
                columns: {
                    where: {
                        deletedAt: null,
                    },
                    include: {
                        cards: {
                            where: {
                                deletedAt: null,
                            },
                        },
                    },
                },
            },
        });
    }

    async getBoardsOnly() {
        return await prisma.board.findMany({
            where: {
                deletedAt: null,
            },
        });
    }

    async deleteBoard(id: number) {
        return await prisma.board.update({
            where: {
                id: id,
            },
            data: {
                deletedAt: new Date(),
            },
        });
    }
    async updateBoardTitle(id: number, title: string) {
        return await prisma.board.update({
            where: {
                id: id,
            },
            data: {
                title: title,
            },
        });
    }
    async updateBoardDescription(id: number, description: string) {
        return await prisma.board.update({
            where: {
                id: id,
            },
            data: {
                description: description,
            },
        });
    }
    async addColumn(boardId: number, title: string) {
        return await prisma.column.create({
            data: {
                title: title,
                boardId: boardId,
            },
        });
    }
    async deleteColumn(columnId: number) {
        return await prisma.column.update({
            where: {
                id: columnId,
            },
            data: {
                deletedAt: new Date(),
            },
        });
    }
}
