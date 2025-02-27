// "SignInForm.tsx"
import { SignInForm } from "./components/SignInForm"

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
                    <CardTitle className="text-xl">Sign In</CardTitle>
                    <CardDescription>Enter your information to sign in!</CardDescription>
                </CardHeader>
                <CardContent>
                    <SignInForm />
                </CardContent>
            </Card>
        </>
    )
}