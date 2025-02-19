import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { ApiResponse, INote, NoteInput } from '@/types';
import Note from '@/models/Note';

const extractId = (request: NextRequest): string => {
  const path = request.nextUrl.pathname;
  const parts = path.split('/');
  return parts[parts.length - 1];
};

export async function GET(
  request: NextRequest
): Promise<NextResponse<ApiResponse<INote>>> {
  try {
    await dbConnect();
    const id = extractId(request);
    const note: INote | null = await Note.findById(id);

    if (!note) {
      return NextResponse.json(
        { success: false, error: 'Note not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: note },
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

export async function PUT(
  request: NextRequest
): Promise<NextResponse<ApiResponse<INote>>> {
  try {
    await dbConnect();
    const id = extractId(request);

    const body: Partial<NoteInput> = await request.json();

    const note: INote | null = await Note.findOneAndUpdate(
      { id: id }, // Changed this line
      body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!note) {
      return NextResponse.json(
        { success: false, error: 'Note not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: note },
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

export async function DELETE(
  request: NextRequest
): Promise<NextResponse<ApiResponse<object>>> {
  try {
    await dbConnect();
    const id = extractId(request);
    const deletedNote = await Note.deleteOne({ id: id });

    if (deletedNote.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Note not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: {} },
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
