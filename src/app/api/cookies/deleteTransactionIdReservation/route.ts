import { NextResponse, NextRequest } from 'next/server'
import { deleteTransactionIdReservation } from '@/actions';

export async function POST(request: Request) { 

    try {
        await deleteTransactionIdReservation();
    } catch (error) {
        return new Response(JSON.stringify({
            message: 'Error al eliminar el transacionId'
          }), { status: 400 } );
    }

  return new Response(JSON.stringify({
    message: 'Hello World'
  }), { status: 200 } );
}