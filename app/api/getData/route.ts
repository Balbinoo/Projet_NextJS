import { NextResponse } from "next/server";
import connect from "../../../lib/mongodb";
import Data from "../../../lib/modals/Data";
import { Types } from "mongoose";

export const GET = async (request: Request) => {
  try {
    await connect();
    
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title");

    if (title) {
      const data = await Data.findOne({ title });

      if (!data) {
        return new NextResponse(
          JSON.stringify({ message: "No data found for the given title" }),
          { status: 404 }
        );
      }

      return new NextResponse(
        JSON.stringify({ message: "Data retrieved", data }),
        { status: 200 }
      );
    }

    // If no title is provided, return all data
    const storedData = await Data.find();
    return new NextResponse(JSON.stringify(storedData), { status: 200 });

  } catch (error: any) {
    return NextResponse.json(
      { message: "Error retrieving data", error },
      { status: 500 }
    );
  }
};


// POST - Create a new entry
export const POST = async (request: Request) => {
  try {
    const { title, body } = await request.json();
    await connect();
    
    const newData = new Data({ title, body });
    await newData.save();

    return new NextResponse(
      JSON.stringify({ message: "Data saved", data: newData }),
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error saving data", error },
      { status: 500 }
    );
  }
};

// PATCH - Update an existing entry
export const PATCH = async (request: Request) => {
  try {
    await connect();
    const { id, title, body } = await request.json();

    if (!id || !Types.ObjectId.isValid(id)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid or missing ID" }),
        { status: 400 }
      );
    }

    const updateFields: any = {};
    if (title) updateFields.title = title;
    if (body) updateFields.body = body;

    const updatedData = await Data.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    if (!updatedData) {
      return new NextResponse(
        JSON.stringify({ message: "Data not found" }),
        { status: 404 }
      );
    }

    return new NextResponse(
      JSON.stringify({ message: "Data updated", data: updatedData }),
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error updating data", error },
      { status: 500 }
    );
  }
};

// DELETE - Remove an entry by ID
export const DELETE = async (request: Request) => {
  try {
    await connect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id || !Types.ObjectId.isValid(id)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid or missing ID" }),
        { status: 400 }
      );
    }

    const deletedData = await Data.findByIdAndDelete(id);

    if (!deletedData) {
      return new NextResponse(
        JSON.stringify({ message: "Data not found" }),
        { status: 404 }
      );
    }

    return new NextResponse(
      JSON.stringify({ message: "Data deleted successfully" }),
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error deleting data", error },
      { status: 500 }
    );
  }
};