import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';

import { ApiResponse, INote, NoteInput } from '@/types';
import Note from '@/models/Note';
import { v4 as uuidv4 } from 'uuid';

export async function GET(): Promise<
  NextResponse<ApiResponse<INote[]>>
> {
  try {
    await dbConnect();
    const notes: INote[] = await Note.find({});
    return NextResponse.json(
      { success: true, data: notes },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Unknown error occurred';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 400 }
    );
  }
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse<INote>>> {
  try {
    await dbConnect();
    const body: NoteInput = await request.json();
    const noteData = { ...body, id: uuidv4() };
    const note: INote = await Note.create(noteData);
    return NextResponse.json(
      { success: true, data: note },
      { status: 201 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Unknown error occurred';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 400 }
    );
  }
}
