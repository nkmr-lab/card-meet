import { useState, useEffect, useContext } from "react";
import { API_URL_prefix } from "../utils/api";
import { getDatabase, onValue, ref } from '@firebase/database';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { StoreContext } from '../conference/contexts';
import { FirebaseError } from '@firebase/util';
import FavAnim from "./fav-anim";

interface MemberData {
  fav_num: number;
  name: string;
}

function FavButton({ channelId }: { channelId: string }) {
  const [favNum, setFavNum] = useState(0);
  const [myMemberId, setMyMemberId] = useState<string>("");
  const context = useContext(StoreContext);
  const [favSum, setFavSum] = useState(0);
  const [showFavAnim, setShowFavAnim] = useState(false);

  useEffect(() => {
    let unsubDb: (() => void) | undefined
    try {
      if (!getApps().length) initializeApp({ databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL })
      const db = getDatabase(getApp(), process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL!);
      const dbRef = ref(db, `/${channelId}/members`);
      unsubDb = onValue(dbRef, (snapshot: any) => {
        const memberDatas = snapshot.val();
        if (!memberDatas) return;
        let sum = 0;
        const membersArray = Object.values(memberDatas) as MemberData[];
        for (let i = 0; i < membersArray.length; i++) {
          sum += membersArray[i].fav_num;
        }
        setFavSum(sum);
      }, (error) => {
        console.error('Firebase members error:', error)
      });
    } catch (e) {
      console.error('Firebase setup error:', e)
    }
    return () => { if (unsubDb) unsubDb() }
  }, [channelId]);

  useEffect(() => {
    setMyMemberId(context?.room?.member?.id ?? "");
  }, [context?.room?.member?.id]);

  const handleClick = async () => {
    const newFavNum = favNum + 1;
    setFavNum(newFavNum);

    setShowFavAnim(true);
    setTimeout(() => {
      setShowFavAnim(false);
    }, 1200);

    if (!myMemberId) return;

    try {
      const response = await fetch(API_URL_prefix + "/rooms/" + channelId + "/" + myMemberId + "/fav_num", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "fav_num": newFavNum,
        })
      });
    } catch (error) {
      console.error('Fetch error:');
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center items-center bg-white text-black font-bold py-2 px-4 mt-5">
        みんなのいいね数: {favSum}
      </div>
      {showFavAnim ? (
        <FavAnim />
      ) : (
        <button
          onClick={handleClick}
          className="flex justify-center items-center border-2 border-blue-300 bg-blue-300 text-blue-800 font-bold py-2 px-4 mt-4 rounded hover:border-blue-500 hover:bg-blue-500 hover:text-white"
        >
          いいね👍
        </button>
      )}
    </div>
  );
}

export default FavButton;
