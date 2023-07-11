import prisma from "src/libs/prisma";

export default class ColumnModel {
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
    async insertCard(columnId: number, title: string, content: string) {
        return await prisma.card.create({
            data: {
                title: title,
                content: content,
                columnId: columnId,
            },
        });
    }
}
