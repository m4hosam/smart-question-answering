import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllUsers } from "@/lib/adminController";
import { User } from "@/types/common.types";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
// const users = [
//   {
//     id: "8442b-849c-4314-849e-af4e69576b67",
//     name: "Admin",
//     email: "admin@gmail.com",
//     password: "123456",
//     role: "admin",
//     createdAt: "2024-03-18T09:42:02.147Z",
//     updatedAt: "2024-03-18T09:42:02.147Z",
//   },
// ];

export default async function Admin() {
  const userSession = await getCurrentUser();
  if (!userSession) {
    redirect("/account/login");
  }
  // console.log("userSession", userSession);
  const usersResponse = await getAllUsers(userSession?.user?.token);
  // console.log(usersResponse?.data);
  if (usersResponse?.status !== 200) {
    return <div>{usersResponse?.data}</div>;
  }
  const users: User[] = usersResponse.data;
  return (
    <main className="m-14">
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>email</TableHead>
            <TableHead>role</TableHead>
            {/* <TableHead className="w-[100px]">token</TableHead> */}
            <TableHead className="text-right">Link</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              {/* <TableCell className="text-right">{user.token}</TableCell> */}
              <TableCell className="text-right">
                <a href={"/admin/" + user.id}>details</a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total Users</TableCell>
            <TableCell className="text-right">{users.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </main>
  );
}
