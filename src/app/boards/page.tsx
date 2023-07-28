"use client";

import {
    Center,
    SimpleGrid,
    StackDivider,
    VStack,
    Wrap,
    Text,
    Heading,
    Highlight,
} from "@chakra-ui/react";
import BoardCard, { BoardCardProps } from "src/components/board/BoardCard";

export default function Page() {
    const boards: BoardCardProps[] = [
        {
            title: "Board 1",
            id: "1",
            description: "The quick brown fox jumps over the lazy dogs",
        },
        { title: "Board 2", id: "2" },
    ];
    return (
        <>
            <Center>
                <Heading>
                    <Highlight
                        query="boards"
                        styles={{
                            px: "2",
                            py: "1",
                            rounded: "full",
                            bg: "teal.100",
                        }}
                    >
                        Your boards
                    </Highlight>
                </Heading>
            </Center>
            <VStack spacing={4} padding="20px">
                {boards.map((board) => (
                    <BoardCard key={board.id} {...board} />
                ))}
            </VStack>
        </>
    );
}
