import { useCallback } from "react";
import { Observer } from "mobx-react";
import { IconButton } from "../components/icon";
import { exitRoom } from "../effects/exit";

import { StoreContext } from '../conference/contexts';
import { useEffect, useState, useContext } from 'react';
import { getDatabase, ref, onValue } from '@firebase/database';
import { getApp, getApps, initializeApp } from 'firebase/app';

export function ExitOpener({ channelId }: { channelId: string }) {
  const context = useContext(StoreContext);

  const [myMemberId, setMyMemberId] = useState<string>("");

  useEffect(() => {
    if (!getApps().length) initializeApp({ databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL })
    const db = getDatabase(getApp(), process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL!);
    const dbRef = ref(db, `/${channelId}`);
    const unsubscribe = onValue(dbRef, (snapshot:any) => {
      setMyMemberId(context?.room?.member?.id ?? ""); // デフォルト値を設定
    });

    console.log("kokoda firebase fired: " + myMemberId);

    return () => unsubscribe();
  }, [channelId, context?.room?.member?.id]);

  const onClickExitRoom = useCallback(() => {
    if (channelId && myMemberId) {
      exitRoom({ channelId, myMemberId });
    }
  }, [channelId, myMemberId]); //これにより、channel idもmymember idも最新の状態で渡せる

  return (
    <Observer>
      {() => <IconButton name="exit_to_app" onClick={onClickExitRoom} />}
    </Observer>
  );
}
