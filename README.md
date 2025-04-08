# Supabase OneSignal (REST API Implementation) Push Notification Edge Function
This repository contains a [Supabase](https://supabase.com) Edge Function for sending push notifications via [OneSignal](https://onesignal.com).

## Prerequisites

- Supabase project
- OneSignal account with an app set up
- OneSignal API Key
- OneSignal App ID

## Setup

1. Clone this repository
2. Deploy the edge function to your Supabase project:

```bash
supabase functions deploy onesignal-push-notify --project-ref your-project-ref
```

3. Set the required environment variables:

```bash
supabase secrets set ONESIGNAL_API_KEY=your-onesignal-api-key --project-ref your-project-ref
supabase secrets set ONESIGNAL_APP_ID=your-onesignal-app-id --project-ref your-project-ref
```

> **Note:** This edge function uses OneSignal's REST API directly and does not require any OneSignal SDK or additional dependencies to be installed.

## Usage

The edge function accepts POST requests with a JSON body containing a `user_id` parameter.

### Example Request

```javascript
const { data, error } = await supabase.functions.invoke('onesignal-push-notify', {
  body: { 
    user_id: 'user-123',
    title: 'Custom Title',  // Optional - defaults to "Test OneSignal Push"
    message: 'This is a custom message'  // Optional - defaults to a standard message
  },
})
```

Or using fetch:

```javascript
const response = await fetch('https://your-project-ref.supabase.co/functions/v1/onesignal-push-notify', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your-supabase-anon-key',
  },
  body: JSON.stringify({
    user_id: 'user-123',
    title: 'Custom Title',  // Optional
    message: 'This is a custom message'  // Optional
  }),
})
```

### Response

The function returns a JSON response with:
- `success`: boolean indicating if the notification was sent successfully
- `error`: error message if the notification failed

## Important Notes

- The `user_id` parameter must match the external ID of a user in your OneSignal app
- The function automatically converts the user_id to uppercase when sending to OneSignal
- The function accepts optional `title` and `message` parameters to customize notifications
- If not provided, a default title "Test OneSignal Push" and a generic message will be used

## Supabase OneSignal SDK Integration

If you prefer to use the OneSignal SDK instead of the REST API approach outlined in this repository, check out the official Supabase OneSignal integration guide:
[https://supabase.com/partners/integrations/onesignal](https://supabase.com/partners/integrations/onesignal)

## Troubleshooting

If you encounter issues with the function, check the Supabase logs:

```bash
supabase functions logs onesignal-push-notify --project-ref your-project-ref
``` 