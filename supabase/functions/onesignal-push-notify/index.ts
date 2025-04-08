// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"

Deno.serve(async (req) => {

  // Get ONESIGNAL_API_KEY and ONESIGNAL_APP_ID from environment variables
  const oneSignalApiKey = Deno.env.get('ONESIGNAL_API_KEY');
  const oneSignalAppId = Deno.env.get('ONESIGNAL_APP_ID');

  if (!oneSignalApiKey && !oneSignalAppId) {
    throw new Error('ONESIGNAL_API_KEY and ONESIGNAL_APP_ID is not configured')
  }

  const { 
    user_id
  } = await req.json()

  if (!user_id) {
    throw new Error('user_id is required')
  }

  let responseData = { success: false, error: "" };
  try {
    const oneSignalResponse = await fetch('https://api.onesignal.com/notifications?c=push', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${oneSignalApiKey}`,
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({
        app_id: oneSignalAppId,
        include_aliases: {
          external_id: [user_id.toUpperCase()]
        },
        target_channel: "push",
        headings: { 
          en: "Test OneSignal Push"
        },
        contents: { 
          en: `Congrats, you sent a push notification to ${user_id}`
        }
      })
    });

    if (!oneSignalResponse.ok) {
      console.error('Error sending OneSignal notification:', await oneSignalResponse.text());
      responseData = { success: false, error: await oneSignalResponse.text() };
    }
  } catch (error) {
    console.error('OneSignal fetch error:', error);
    responseData = { success: false, error: error.message };
  }
  
  return new Response(
    JSON.stringify(responseData),
    { headers: { "Content-Type": "application/json" } },
  )
})
