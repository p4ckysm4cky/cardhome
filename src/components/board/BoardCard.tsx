import {
    Card,
    CardBody,
    CardHeader,
    Heading,
    LinkBox,
    LinkOverlay,
    Text,
} from "@chakra-ui/react";

export interface BoardCardProps {
    id: string;
    title: string;
    description?: string;
}

export default function BoardCard({ id, title, description }: BoardCardProps) {
    return (
        <LinkBox>
            <Card w={[300, 500, 700]}>
                <CardHeader>
                    <LinkOverlay href={`boards/${id}`}>
                        <Heading size="md">{title}</Heading>
                    </LinkOverlay>
                </CardHeader>
                <CardBody>
                    <Text isTruncated>{description ?? ""}</Text>
                </CardBody>
            </Card>
        </LinkBox>
    );
}
