// app/api/bot/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Define interfaces for type safety
interface BotMessageRequest {
  message: string;
  sessionId: string;
  botType: string;
  timestamp: string;
  businessType?: string;
  saludo?: string;
  language?: string;
}

interface WebhookResponse {
  output: string;
}

interface Payload {
  message: string;       // el texto que envías
  sessionId: string;     // el id de la sesión
  botType: string | number; // según qué tipo sea bot.id
  businessType?: string; // tipo de negocio (hotel, restaurante, etc.)
  timestamp: string;     // ISO string de la fecha
  saludo?: string;      // saludo inicial (solo para el primer mensaje)
  language?: string;    // idioma del usuario (es, en)
}

// Map bot types to their webhook URLs
const BOT_WEBHOOKS = {
  hotel: "https://wazilrest-n8n.xwk85y.easypanel.host/webhook/b626141c-cc91-4207-b313-89cc6cbfd36b",
  restaurant: "https://wazilrest-n8n.xwk85y.easypanel.host/webhook/b626141c-cc91-4207-b313-89cc6cbfd36a",
  painting: "https://wazilrest-n8n.xwk85y.easypanel.host/webhook/b626141c-cc91-4207-b313-89cc6cbfd36c",
  flooring: "https://wazilrest-n8n.xwk85y.easypanel.host/webhook/b626141c-cc91-4207-b313-89cc6cbfd36z",
  general: "https://n8n-p2q6.onrender.com/webhook-test/b626141c-cc91-4207-b313-89cc6cbfd36e",
  molokaih: "https://wazilrest-n8n.xwk85y.easypanel.host/webhook/b626141c-cc91-4207-b313-89cc6cbfd36d",
};

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body: BotMessageRequest = await request.json();
    
    // Validate required fields
    if (!body.message || !body.sessionId || !body.botType) {
      return NextResponse.json(
        { error: 'Missing required fields: message, sessionId, or botType' },
        { status: 400 }
      );
    }

    // Validate bot type
    if (!BOT_WEBHOOKS[body.botType as keyof typeof BOT_WEBHOOKS]) {
      return NextResponse.json(
        { error: 'Invalid bot type' },
        { status: 400 }
      );
    }

    // Get the webhook URL for the bot type
    const webhookUrl = BOT_WEBHOOKS[body.botType as keyof typeof BOT_WEBHOOKS];

    // Prepare payload for the webhook
    const payload: Payload = {
      message: body.message,
      sessionId: body.sessionId,
      botType: body.botType,
      businessType: body.businessType, // assuming botType corresponds to businessType
      timestamp: body.timestamp || new Date().toISOString(),
    };

    // Include saludo if provided (for the first message)
    if (body.saludo) {
      payload.saludo = body.saludo;
    }

    // Include language if provided
    if (body.language) {
      payload.language = body.language;
    }

    // Send request to the webhook
    const webhookResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    // Check if the webhook request was successful
    if (!webhookResponse.ok) {
      console.error(`Webhook request failed with status: ${webhookResponse.status}`);
      return NextResponse.json(
        { error: 'Failed to process message with bot service' },
        { status: 500 }
      );
    }

    // Parse the webhook response
    const webhookData: WebhookResponse[] = await webhookResponse.json();

    // Validate webhook response structure
    if (!webhookData || !Array.isArray(webhookData) || !webhookData[0]?.output) {
      console.error('Invalid webhook response structure:', webhookData);
      return NextResponse.json(
        { error: 'Invalid response from bot service' },
        { status: 500 }
      );
    }

    // Return the bot's response
    return NextResponse.json({
      success: true,
      response: webhookData[0].output,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Error in bot API route:', error);
    
    // Return appropriate error response
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle unsupported HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
