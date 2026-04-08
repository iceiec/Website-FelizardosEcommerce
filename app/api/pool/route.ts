import { TableBody } from "@/components/ui/table";
import { NextRequest, NextResponse } from "next/server";

type PoolEvent = {
    id: string,
    date: string,
    time: string,
    endTime: string,
    client: string,
    status: 'Pending' | 'Confirmed' | 'Cancelled',
    amount: number,
    deposit: number,
    notes: string,
};

let poolEvents: PoolEvent[] = [];

export async function GET (req: NextRequest){
    return NextResponse.json(poolEvents);
}

export async function POST (req: NextRequest){
    const body = await request.json();

    if (!body.client || body.time || body.date){
        return NextResponse.json 
        ( {error: 'Fields are required to be filled up'},
        {status: 400}
        );
    }

    const newEvent: PoolEvent = {
        id: crypto.randomUUID(),
        date: body.date,
        time: body.time,
        endTime: body.endTime,
        client: body.client,
        status: body.status,
        amount: body.amount,
        deposit: body.deposit,
        notes: body.notes,
    };

    poolEvents.push(newEvent);
    return NextResponse.json(newEvent,
        {status: 201}
    );
}

export async function PUT (req: NextRequest){
    const body = await req.json();
    const id = body.id;

    if (!id){
        return NextResponse.json
        ( { error: 'Event ID is required'},
            { status: 400}
        );
    }

    const index = poolEvents.findIndex(event => event.id == id);

    if (index === -1){
        return NextResponse.json
        ( { error: 'Event not found'),
            {status: 404}
        };

        const updatedEvent: PoolEvent = {
        ...poolEvents[index],
        ...body,
        amount: Number(body.amount) ?? poolEvents[index].amount,
        deposit: Number(body.deposit) ?? poolEvents[index].deposit,

        
    }
    }



