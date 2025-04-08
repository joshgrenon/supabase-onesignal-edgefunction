# Supabase OneSignal Push Notification Edge Function

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
  body: { user_id: 'user-123' },
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
- Currently, the function sends a test notification with a fixed title and content
- For production use, consider extending the function to accept custom notification content

## Supabase OneSignal SDK Integration

If you prefer to use the OneSignal SDK instead of the REST API approach outlined in this repository, check out the official Supabase OneSignal integration guide:
[https://supabase.com/partners/integrations/onesignal](https://supabase.com/partners/integrations/onesignal)

## Troubleshooting

If you encounter issues with the function, check the Supabase logs:

```bash
supabase functions logs onesignal-push-notify --project-ref your-project-ref
``` 