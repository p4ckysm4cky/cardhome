import prisma from "src/libs/prisma";

export default class CardModel {
    async getCard(id: number) {
        return await prisma.card.findFirst({
            where: {
                id: {
                    equals: id,
                },
                deletedAt: null,
            },
        });
    }

    async updateTitle(id: number, title: string) {
        return await prisma.card.update({
            where: {
                id: id,
            },
            data: {
                title: title,
            },
        });
    }

    async updateContent(id: number, content: string) {
        return await prisma.card.update({
            where: {
                id: id,
            },
            data: {
                content: content,
            },
        });
    }
}
