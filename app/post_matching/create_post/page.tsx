'use client';

import { Textarea, Card, CardHeader, CardBody, Avatar, Divider, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Accordion, AccordionItem, Button, useDisclosure, Chip, CardFooter, User } from "@heroui/react";
import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';

export default function CreatePostPage() {
    const [postContent, setPostContent] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const router = useRouter();

    const handleContinue = useCallback(
        async () => {
            setIsProcessing(true);
            try {
                // Simulate saving post content
                await new Promise((resolve) => setTimeout(resolve, 1000));
                // Redirect to recommendation page
                router.replace('recommendation');
            } catch (error) {
                console.error("Failed to save post content", error);
            } finally {
                setIsProcessing(false);
            }
        },
        []
    );

    // useEffect(() => {
    //     queryProfile();
    // }, []);

    return (
        <div className="h-full flex-row flex gap-4 justify-center px-8">
            <div className="w-1/2 flex flex-col gap-4 p-8">
                {/* Post Content */}
                <Card className="flex flex-col h-auto">
                    <CardHeader className="px-4 flex gap-4">
                        <Avatar
                            radius="full"
                            size="md"
                            src="https://heroui.com/avatars/avatar-1.png"
                        />
                        <div className="flex flex-col items-start gap-1">
                            <div className="text-small font-semibold leading-none text-default-600">Zoey Lang</div>
                            <div className="text-small tracking-tight text-default-400">Feb 28 at 8:54 AM</div>
                        </div>
                    </CardHeader>
                    <CardBody className="px-4 text-small text-default-400">
                        <Textarea
                            placeholder="Enter your post content"
                            variant="underlined"
                            value={postContent}
                            className="w-full h-full text-default-600"
                            size="lg"
                            minRows={10}
                            maxRows={10}
                            onValueChange={setPostContent}
                        />
                    </CardBody>
                    <CardFooter >
                        <Button
                            onPress={handleContinue}
                            href="recommendation"
                            fullWidth isLoading={isProcessing} color="primary">
                            Continue
                        </Button>
                    </CardFooter>
                </Card>

            </div>

        </div >
    );
}