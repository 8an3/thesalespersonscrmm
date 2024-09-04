import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"

export default function Accessories() {
  return (
    <div>
      <Tabs defaultValue="Dashboard" className="w-full mx-3">
        <TabsList>
          <TabsTrigger value="Dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="To Order">To Order</TabsTrigger>
        </TabsList>
        <TabsContent value="Dashboard">
          <Card className='mx-3 w-full'>
            <CardHeader>
              <CardTitle>Overview of all work being completed today by who, when.</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="To Order">
          <Card className='mx-3'>
            <CardHeader>
              <CardTitle>Go over service numbers like how many w/o done how many open with no appointments etc</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
