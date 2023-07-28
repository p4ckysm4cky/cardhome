import prisma from "src/libs/prisma";

export default class ColumnRepo {
    async updateTitle(id: number, title: string) {
        return await prisma.column.update({
            where: {
                id: id,
            },
            data: {
                title: title,
            },
        });
    }
    async getColumn(id: number) {
        return await prisma.column.findFirst({
            where: {
                id: {
                    equals: id,
                },
                deletedAt: null,
            },
            include: {
                cards: {
                    where: {
                        deletedAt: null,
                    },
                },
            },
        });
    }

    async insertCard(columnId: number, title: string, content: string) {
        return await prisma.card.create({
            data: {
                title: title,
                content: content,
                columnId: columnId,
            },
        });
    }
    async deleteCard(id: number) {
        return await prisma.card.update({
            where: {
                id: id,
            },
            data: {
                deletedAt: new Date(),
            },
        });
    }
    async moveCard(cardId: number, columnId: number) {
        return await prisma.card.update({
            where: {
                id: cardId,
            },
            data: {
                columnId: columnId,
            },
        });
    }
}
