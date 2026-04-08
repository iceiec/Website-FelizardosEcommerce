import { NextRequest, NextResponse } from  "next/server";

type PavillionEvent ={
    id: string,
    date: string,
    time: string,
    endTime: string,
    eventName: string,
    client: string,
    status: 'Pending' | 'Confirmed' | 'Cancelled',
    capacity: number,
    amount: number,
    deposit: number,
    notes: string,
};

let pavillionEvents: PavillionEvent[] = [];

export async function GET (request: NextRequest) {
    return NextResponse.json(pavillionEvents);
}

export async function POST (request: NextRequest){
    const body = await request.json();

    if (!body.eventName || !body.client || !body.date) {
        return NextResponse.json ({error: 'Fields are required to be filled up'}, 
        {status: 400}
        );
    }

    const newEvent: PavillionEvent = {
        id: crypto.randomUUID(),
        date: body.date,
        time: body.time,
        endTime: body.endTime,
        eventName: body.eventName,
        client: body.client,
        status: body.status,
        capacity: body.capacity,
        amount: body.amount,
        deposit: body.deposit,
        notes: body.notes,
    };

    pavillionEvents.push(newEvent);
    return NextResponse.json(newEvent, {status: 201});

}

export async function PUT (request: NextRequest){
    const body = await request.json();
    const id = body.id;

    if (!id){
        return NextResponse.json
    ({error: 'Event ID is required'}, { status: 400 } );
    }

    const index = pavillionEvents.findIndex(event => event.id == id);

    if (index === -1){
        return NextResponse.json
        ( {error: 'Event not found'} , {status: 404} );
    }

    const updatedEvent: PavillionEvent = {
        ...pavillionEvents[index],
        ...body,
        capacity: Number(body.capacity) ?? pavillionEvents[index].capacity,
        amount: Number(body.amount) ?? pavillionEvents[index].amount,
        deposit: Number(body.deposit) ?? pavillionEvents[index].deposit,
    };

    pavillionEvents[index] = updatedEvent;

    return NextResponse.json(updatedEvent);

}

export async function DELETE (req: NextRequest){
    const id = req.nextUrl.searchParams.get('id');

    if (!id){
        return NextResponse.json
        ( {error: 'Event ID is required' } , {status: 400} );
    }

    pavillionEvents = pavillionEvents.filter(event => event.id !== id);
    return NextResponse.json({ message: 'Event deleted successfully' } , 
        { status: 200} );
}