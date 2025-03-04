'use client';

import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter, Button, useDisclosure,
    Avatar,
    Card,
    CardHeader,
    CardBody,
    Divider,
    ScrollShadow
} from "@heroui/react";
import { useState, useCallback, useEffect } from "react";
import { StarIcon } from "@/components/icons/star-icon";
import { useRouter, usePathname } from "next/navigation"


interface Params {
    post_id: string;
}

export default function PostDetailsPage({ params }: { params: Params }) {
    const router = useRouter();
    const currentRoute = usePathname()
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [bidStatus, setBidStatus] = useState<BidStatus>({});

    useEffect(() => {
        if (currentRoute === `/home/${params.post_id}`) {
            onOpen();
        }
    }, [currentRoute]);

    const suppliers = [
        {
            id: 1,
            name: "Elite Affordable Movers & Cleaning",
            avatarUrl: "https://i.pravatar.cc/150?u=supplier1",
            biddingPrice: "$199",
            serviceRequest: "Includes carpet and kitchen cleaning.",
        },
        {
            id: 2,
            name: "Sparkle Clean Services",
            avatarUrl: "https://i.pravatar.cc/150?u=supplier2",
            biddingPrice: "$180",
            serviceRequest: "Eco-friendly products, one-day service.",
        },
        {
            id: 3,
            name: "Pro Clean Experts",
            avatarUrl: "https://i.pravatar.cc/150?u=supplier3",
            biddingPrice: "$220",
            serviceRequest: "Deep cleaning plus balcony and window washing.",
        },
    ];

    interface Supplier {
        id: number;
        name: string;
        avatarUrl: string;
        biddingPrice: string;
        serviceRequest: string;
    }

    interface Post {
        title: string;
        description: string;
    }

    interface BidStatus {
        [key: number]: string;
    }

    const handleDecision = (id: number, decision: string): void => {
        setBidStatus((prevStatus: BidStatus) => ({
            ...prevStatus,
            [id]: decision,
        }));
    };

    const handleContinue = useCallback(() => {
        router.replace("/post_matching/confirm");
        onClose();
    }, []);

    const handleClose = useCallback(() => {
        router.replace("/home");
        onClose();
    }, []);

    return (
        <Modal isDismissable={false} defaultOpen={true} isOpen={isOpen} onOpenChange={handleClose} size="2xl" className="flex flex-col h-auto">
            <ModalContent className="flex flex-col h-auto">
                {(onClose) => (
                    <>
                        <ModalHeader className="px-4 flex gap-4">
                            <Avatar
                                radius="full"
                                size="md"
                                src="https://heroui.com/avatars/avatar-1.png"
                            />
                            <div className="flex flex-col items-start gap-1">
                                <div className="text-small font-semibold leading-none text-default-600">Zoey Lang</div>
                                <div className="text-small tracking-tight text-default-400">Feb 28 at 8:54 AM</div>
                            </div>
                        </ModalHeader>
                        <ModalBody className="px-4 text-small text-default-400">
                            <p>Finding a reliable and efficient cleaning service can be a daunting task, especially with the plethora of options available in the market. Whether you are looking for a one-time deep clean or a regular maintenance service, it is crucial to find a service provider that meets your specific needs and standards. A good cleaning service should offer a range of services, including dusting, vacuuming, mopping, and sanitizing various areas of your home or office. Additionally, they should use eco-friendly cleaning products and have a team of trained and trustworthy professionals. When searching for a cleaning service, it is advisable to read reviews, ask for recommendations, and check their credentials and insurance. A reputable cleaning service will also provide a detailed quote and be transparent about their pricing and policies. By taking the time to research and choose the right cleaning service, you can ensure a clean and healthy environment for yourself and your loved ones, giving you peace of mind and more time to focus on other important tasks.</p>
                            <Divider />
                            <div className="flex flex-row gap-3">
                                <div className="flex gap-1">
                                    <p className="font-semibold text-default-400 text-small">3</p>
                                    <p className=" text-default-400 text-small">Offers</p>
                                </div>
                                <div className="flex gap-1">
                                    <p className="font-semibold text-default-400 text-small">100</p>
                                    <p className="text-default-400 text-small">Views</p>
                                </div>
                            </div>
                            <Divider />
                        </ModalBody>
                        <ModalFooter className="p-2 gap-3">
                            <ScrollShadow hideScrollBar className="max-h-[200px] flex flex-col gap-4 overflow-auto w-full p-2">
                                {suppliers.map((supplier) => (
                                    <div className="flex flex-row gap-4 items-start">
                                        <Avatar src={supplier.avatarUrl} size="md" />

                                        <Card key={supplier.id} className="flex-1">
                                            <CardHeader className="flex flex-row items-start gap-4 p-2">
                                                <div className="flex flex-col flex-1">
                                                    <h3 className="text-sm font-semibold leading-none text-default-600">{supplier.name}</h3>
                                                    <p className="text-md text-green-600 font-bold">{supplier.biddingPrice}</p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button
                                                        color="success"
                                                        size="sm"
                                                        onPress={() => handleDecision(supplier.id, "Accepted ✅")}
                                                    >
                                                        Accept
                                                    </Button>
                                                    <Button
                                                        color="danger"
                                                        size="sm"
                                                        onPress={() => handleDecision(supplier.id, "Rejected ❌")}
                                                    >
                                                        Reject
                                                    </Button>
                                                </div>
                                            </CardHeader>
                                            <Divider />
                                            <CardBody className="flex flex-col gap-4">
                                                <p className="text-default-600 text-sm">{supplier.serviceRequest}</p>
                                                {bidStatus[supplier.id] && (
                                                    <div className="mt-2 p-2 bg-gray-100 rounded-md text-center text-sm font-semibold">
                                                        {bidStatus[supplier.id]}
                                                    </div>
                                                )}
                                            </CardBody>
                                        </Card>
                                    </div>
                                ))}
                            </ScrollShadow>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}