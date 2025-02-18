
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, FileText } from "lucide-react";

const Privacy = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">Privacy Policy</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="text-center">
            <Shield className="w-12 h-12 mx-auto mb-2 text-primary" />
            <CardTitle>Data Protection</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We implement robust security measures to protect your personal information and ensure it remains confidential.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <Lock className="w-12 h-12 mx-auto mb-2 text-primary" />
            <CardTitle>Secure Authentication</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Your login credentials are protected using industry-standard encryption and secure authentication protocols.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <FileText className="w-12 h-12 mx-auto mb-2 text-primary" />
            <CardTitle>Data Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We only collect and use data that is necessary for providing our services, with full transparency about how it's used.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Information We Collect</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>We collect the following types of information:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Account information (email, name)</li>
            <li>Authentication data through Google Sign-In</li>
            <li>Profile information you choose to provide</li>
            <li>Usage data to improve our services</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Rights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access your personal data</li>
            <li>Request data deletion</li>
            <li>Opt-out of data collection</li>
            <li>Update your information</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Privacy;
