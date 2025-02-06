import { NextResponse } from "next/server";
import connect from "../../../lib/mongodb";
import Data from "../../../lib/modals/Data";

export async function GET() {
  try {
    await connect();

    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const apiData = await response.json();

    const savedData = await Data.insertMany(
      apiData.map((item: { title: string; body: string }) => ({
        title: item.title,
        body: item.body,
      }))
    );

    return NextResponse.json({ message: "Data saved", data: savedData });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching data", error }, { status: 500 });
  }
}
