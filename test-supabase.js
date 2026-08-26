const { createClient } = require('@supabase/supabase-js');
// Node 20.6+ supports --env-file
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('Testing Supabase Connection');
console.log('URL:', `"${url}"`);
console.log('Key:', `"${key?.substring(0, 20)}..."`);

// Verify realtime configuration
const supabase = createClient(url, key);

console.log('[Presence] Creating channel "online-visitors"');
const roomOne = supabase.channel('online-visitors', {
  config: {
    presence: {
      key: 'test_key',
    },
  },
});

roomOne
  .on('presence', { event: 'sync' }, () => {
    const newState = roomOne.presenceState();
    console.log('[Presence] Presence synced. State:', newState);
  })
  .subscribe(async (status, err) => {
    console.log(`[Presence] Subscribe status: ${status}`, err || '');
    if (status === 'SUBSCRIBED') {
      console.log('[Presence] Successfully subscribed to channel');
      const trackRes = await roomOne.track({
        online_at: new Date().toISOString(),
      });
      console.log('[Presence] Presence tracked response:', trackRes);
      process.exit(0);
    } else if (status === 'TIMED_OUT' || status === 'CHANNEL_ERROR') {
      console.log('[Presence] Failed with status:', status);
      process.exit(1);
    }
  });

setTimeout(() => {
  console.log('[Presence] Forced timeout after 15s');
  process.exit(1);
}, 15000);
