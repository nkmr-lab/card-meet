import { useState, useEffect, useContext } from "react";
import { API_URL_prefix } from "../utils/api";
import { getDatabase, onValue, ref } from '@firebase/database';
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
    try {
      const db = getDatabase();
      const dbRef = ref(db, `/${channelId}/members`);
      return onValue(dbRef, (snapshot: any) => {
        const memberDatas = snapshot.val();
        if (!memberDatas) {
          return;
        }
        let favSum = 0;
        const membersArray = Object.values(memberDatas) as MemberData[];
        for (let i = 0; i < membersArray.length; i++) {
          favSum += membersArray[i].fav_num;
        }
        setFavSum(favSum);
      });
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.error(e);
      }
    }
  }, [channelId]);


  useEffect(() => {
    const db = getDatabase();
    const dbRef = ref(db, `/${channelId}`);
    const unsubscribe = onValue(dbRef, (snapshot: any) => {
      setMyMemberId(context?.room?.member?.id ?? ""); // デフォルト値を設定
    });

    return () => unsubscribe();
  }, [channelId, context?.room?.member?.id]);

  const handleClick = async () => {
    const newFavNum = favNum + 1;
    setFavNum(newFavNum);

    setShowFavAnim(true);
    setTimeout(() => {
      setShowFavAnim(false);
    }, 1200);

    try {
      const response = await fetch(API_URL_prefix + "/rooms/" + channelId + "/" + myMemberId + "/fav_num", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "fav_num": newFavNum, //連打すると一旦値が不正確になることはあるけど、まぁ許容範囲かな〜それだけのためにリアルタイムにするのも変だし
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
          {/* {favNum} 自分が何回いいねしてるか直接見えない方がデザインとしていいかも？？ 勘だけど */}
          いいね👍
        </button>
      )}
    </div>
  );
}

export default FavButton;
