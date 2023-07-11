import prisma from "src/libs/prisma";

export const resetDatabase = async () => {
    const deleteCard = prisma.card.deleteMany();
    const deleteColumn = prisma.column.deleteMany();
    const deleteBoard = prisma.board.deleteMany();

    await prisma.$transaction([deleteCard, deleteColumn, deleteBoard]);
};
