"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';

export default function PresenceIndicator() {
  const [visitorCount, setVisitorCount] = useState<number>(1);
  const [isConnected, setIsConnected] = useState(false);
  const [hasKeys, setHasKeys] = useState(true);

  useEffect(() => {
    console.log('[Presence] Component mounted');
    if (!supabase) {
      console.log('[Presence] Supabase client NOT initialized (missing keys)');
      setHasKeys(false);
      return;
    }
    console.log('[Presence] Supabase client initialized');

    console.log('[Presence] Creating channel "online-visitors"');
    const roomOne = supabase.channel('online-visitors', {
      config: {
        presence: {
          key: Math.random().toString(36).substring(7),
        },
      },
    });

    roomOne
      .on('presence', { event: 'sync' }, () => {
        const newState = roomOne.presenceState();
        console.log('[Presence] Presence synced. State:', newState);
        // Count total active unique clients
        let count = 0;
        for (const id in newState) {
          count += newState[id].length;
        }
        // Always show at least 1 (the current user) if connected
        setVisitorCount(Math.max(count, 1));
      })
      .subscribe(async (status, err) => {
        console.log(`[Presence] Subscribe status: ${status}`, err || '');
        if (status === 'SUBSCRIBED') {
          console.log('[Presence] Successfully subscribed to channel');
          setIsConnected(true);
          const trackRes = await roomOne.track({
            online_at: new Date().toISOString(),
          });
          console.log('[Presence] Presence tracked response:', trackRes);
        }
      });

    return () => {
      console.log('[Presence] Connection closed / Component unmounted');
      supabase?.removeChannel(roomOne);
    };
  }, []);

  if (!hasKeys) {
    return null; // Silently hide if Supabase keys are missing
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 flex items-center gap-3 px-4 py-2 bg-[rgba(10,10,10,0.85)] backdrop-blur-xl border border-white/10 rounded-full shadow-2xl pointer-events-auto mt-4 mb-4"
      role="status"
      aria-label={`${visitorCount} visitors online`}
    >
      <div className="relative flex h-2.5 w-2.5 items-center justify-center">
        {isConnected ? (
          <>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500"></span>
          </>
        ) : (
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-gray-500"></span>
        )}
      </div>
      
      <div className="flex items-center text-[13px] font-[family-name:var(--font-jetbrains-mono)] text-white/80">
        <div className="flex overflow-hidden relative h-[18px] w-auto min-w-[8px] justify-center mr-1.5">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={visitorCount}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="inline-block"
            >
              {visitorCount}
            </motion.span>
          </AnimatePresence>
        </div>
        <span>{visitorCount === 1 ? 'Visitor' : 'Visitors'} Online</span>
      </div>
    </motion.div>
  );
}
