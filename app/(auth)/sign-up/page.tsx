// "SignUpForm.tsx"
import { SignUpForm } from "./components/SignUpForm"

// Shadcn/ui Components
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function Page() {
    return (
        <>
            <Card className="w-full max-w-sm">
                <CardHeader className="text-center px-8">
                    <CardTitle className="text-xl">Sign Up</CardTitle>
                    <CardDescription>Enter your information to sign up!</CardDescription>
                </CardHeader>
                <CardContent>
                    <SignUpForm />
                </CardContent>
            </Card>
        </>
    )
}