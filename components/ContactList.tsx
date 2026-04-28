import { getAllContacts, updateContact } from "@/actions";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export default async function ContactList() {
  const contacts: any = await getAllContacts();
  console.log(contacts);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Contact Messages</h2>
        <Badge variant={"secondary"}>{contacts?.length} messages</Badge>
      </div>

      {contacts?.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Mail className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No messages yet</h3>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {contacts?.map((contact: any) => (
            <Card key={contact?._id} className="shadow-md rounded-sm">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">
                      {contact?.subject}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      From: {contact?.name} ({contact?.email})
                    </p>
                  </div>
                  <Badge
                    variant={
                      contact?.status === "new" ? "default" : "secondary"
                    }
                  >
                    {contact?.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {contact?.message}
                </p>
                <div className="flex items-center justify-between pt-4 border-t">
                  <p className="text-xs text-muted-foreground">
                    Created At:{" "}
                    {new Date(contact?.createdAt).toLocaleDateString()}
                  </p>

                  <div className="flex gap-2">
                    {contact?.status === "new" && (
                      <form
                        action={async () => {
                          "use server";
                          await updateContact(contact?._id, "read");
                        }}
                      >
                        <Button variant={"outline"} size={"sm"} type="submit">
                          Mark as read
                        </Button>
                      </form>
                    )}

                    {contact?.status === "read" && (
                      <form
                        action={async () => {
                          "use server";
                          await updateContact(contact?._id, "replied");
                        }}
                      >
                        <Button variant={"outline"} size={"sm"} type="submit">
                          Mark as Replied
                        </Button>
                      </form>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
