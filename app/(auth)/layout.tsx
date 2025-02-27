// UI Components
import { Container } from "@/components/container";

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Container className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
                { children }
            </Container>
        </>
    );
}